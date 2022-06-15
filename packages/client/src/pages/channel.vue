<template>
<MkSpacer :content-max="700">
	<div v-if="channel && tab ==='timeline'">
		<!--div class="abvloaje">
			<template v-if="!showPostForm">
				<div class="folded" @click="() => showPostForm = true">
					<span>チャンネルに投稿…</span>
				</div>
			</template>
			<template v-else>
				<XPostForm v-if="$i" :channel="channel" class="post-form _panel _gap" fixed/>
			</template>
		</div-->
		<div class="wpgynlbz _panel _gap" :class="{ hide: !showBanner }">
			<XChannelFollowButton :channel="channel" :full="true" class="subscribe"/>
			<button class="_button toggle" @click="() => showBanner = !showBanner">
				<template v-if="showBanner"><i class="fas fa-angle-up"></i></template>
				<template v-else><i class="fas fa-angle-down"></i></template>
			</button>
			<div v-if="!showBanner" class="hideOverlay">
			</div>
			<div :style="{ backgroundImage: channel.bannerUrl ? `url(${channel.bannerUrl})` : null }" class="banner">
				<div class="status">
					<div><i class="fas fa-users fa-fw"></i><I18n :src="$ts._channel.usersCount" tag="span" style="margin-left: 4px;"><template #n><b>{{ channel.usersCount }}</b></template></I18n></div>
					<div><i class="fas fa-pencil-alt fa-fw"></i><I18n :src="$ts._channel.notesCount" tag="span" style="margin-left: 4px;"><template #n><b>{{ channel.notesCount }}</b></template></I18n></div>
				</div>
				<div class="fade"></div>
			</div>
			<div v-if="channel.description" class="description">
				<Mfm :text="channel.description" :is-note="false" :i="$i"/>
			</div>
		</div>

		<template v-if="tab === 'timeline'">
			<XPostForm v-if="$i" :channel="channel" class="post-form _panel _gap" fixed/>

			<XTimeline :key="channelId" class="_gap" src="channel" :channel="channelId" @before="before" @after="after"/>
		</template>
		<template v-else-if="channel && tab === 'pinned'">
			<XNotes :pagination="pinPagenation"/>
		</template>
		<template v-else-if="channel && tab === 'info'">
			<div v-if="leader">
				<span>{{'リーダー'}}</span>
				<div class="users">
					<div class="user _panel">
						<MkAvatar :user="leader" class="avatar" :show-indicator="true"/>
						<div class="body">
							<MkUserName :user="leader" class="name"/>
							<MkAcct :user="leader" class="acct"/>
						</div>
					</div>
				</div>
			</div>
			<div v-if="subLeaders">
				<span>{{'サブリーダー'}}</span>
				<div class="users">
					<div v-for="subleader in subLeaders" :key="user.id" class="user _panel">
						<MkAvatar :user="subleader" class="avatar" :show-indicator="true"/>
						<div class="body">
							<MkUserName :user="subleader" class="name"/>
							<MkAcct :user="subleader" class="acct"/>
						</div>
					</div>
				</div>
			</div>
		</template>
	</div>
</MkSpacer>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import MkContainer from '@/components/ui/container.vue';
import XPostForm from '@/components/post-form.vue';
import XTimeline from '@/components/timeline.vue';
import XNotes from '@/components/notes.vue';
import XChannelFollowButton from '@/components/channel-follow-button.vue';
import * as os from '@/os';
import * as symbols from '@/symbols';
import { isChannelManager } from '@/scripts/is-channel-manager.js'

export default defineComponent({
	components: {
		MkContainer,
		XPostForm,
		XTimeline,
		XChannelFollowButton
	},

	props: {
		channelId: {
			type: String,
			required: true
		}
	},

	data() {
		return {
			[symbols.PAGE_INFO]: computed(() => this.channel ? {
				title: this.channel.name,
				icon: 'fas fa-satellite-dish',
				bg: 'var(--bg)',
				actions: [...(this.$i && isChannelManager(this.$i.id, this.channel) ? [{
					icon: 'fas fa-cog',
					text: this.$ts.edit,
					handler: this.edit,
				}] : [])],
				tabs: [{
					active: this.tab === 'timeline',
					title: this.$ts.timeline,
					icon: 'fas fa-house',
					onClick: () => { this.tab = 'timeline'; },
				}, {
					active: this.tab === 'pinned',
					title: this.$ts.pinned,
					icon: 'fas fa-thumbtack',
					onClick: () => { this.tab = 'pinned'; },
				}, {
					active: this.tab === 'info',
					title: this.$ts.info,
					icon: 'fas fa-circle-info',
					onClick: () => { this.tab = 'info'; },
				},]
			} : null),
			channel: null,
			leader: null,
			subLeaders: [],
			tab: 'timeline',
			showBanner: true,
			//showPostForm: false,
			pagination: {
				endpoint: 'channels/timeline' as const,
				limit: 10,
				params: computed(() => ({
					channelId: this.channelId,
				}))
			},
			pinPagination: {
				endpoint: 'channels/pin-note' as const,
				limit: 10,
				params: computed(() => ({
					channelId: this.channelId,
				}))
			},
		};
	},

	watch: {
		channelId: {
			async handler() {
				this.channel = await os.api('channels/show', {
					channelId: this.channelId,
				});
				const leaders = await Promise.all({
					os.api('users/show', {
						userId: this.channel.userId,
					}),
					...[...new Array(this.channel.subLeaderIds)].map(userId => {
						os.api('users/show', { userId }),
					}),
				});
				this.leader = leaders.slice();
				this.subleaders = leaders;
			},
			immediate: true
		}
	},

	methods: {
		edit() {
			this.$router.push(`/channels/${this.channel.id}/edit`);
		}
	},
});
</script>

<style lang="scss" scoped>
.wpgynlbz {
	position: relative;

	> .subscribe {
		position: absolute;
		z-index: 1;
		top: 16px;
		left: 16px;
	}

	> .toggle {
		position: absolute;
		z-index: 2;
    top: 8px;
		right: 8px;
		font-size: 1.2em;
		width: 48px;
		height: 48px;
		color: #fff;
		background: rgba(0, 0, 0, 0.5);
		border-radius: 100%;
		
		> i {
			vertical-align: middle;
		}
	}
	
	> .banner {
		position: relative;
		height: 200px;
		background-position: center;
		background-size: cover;

		> .fade {
			position: absolute;
			bottom: 0;
			left: 0;
			width: 100%;
			height: 64px;
			background: linear-gradient(0deg, var(--panel), var(--X15));
		}

		> .status {
			position: absolute;
			z-index: 1;
			bottom: 16px;
			right: 16px;
			padding: 8px 12px;
			font-size: 80%;
			background: rgba(0, 0, 0, 0.7);
			border-radius: 6px;
			color: #fff;
		}
	}

	> .description {
		padding: 16px;
	}

	> .hideOverlay {
		position: absolute;
		z-index: 1;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		-webkit-backdrop-filter: var(--blur, blur(16px));
		backdrop-filter: var(--blur, blur(16px));
		background: rgba(0, 0, 0, 0.3);
	}

	&.hide {
		> .subscribe {
			display: none;
		}

		> .toggle {
			top: 0;
			right: 0;
			height: 100%;
			background: transparent;
		}

		> .banner {
			height: 42px;
			filter: blur(8px);

			> * {
				display: none;
			}
		}

		> .description {
			display: none;
		}
	}
}

.abvloaje {
  position: relative;
  bottom: 0px;

  > .folded {
		padding: 16px;
		background: var(--panel);
		border-radius: 16px 16px 0px 0px;
	}
}
</style>
