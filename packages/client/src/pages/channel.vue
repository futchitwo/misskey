<template>
<MkSpacer :content-max="700">
	<div v-if="channel">
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
		<template v-else-if="tab === 'pinned'">
			<XNotes :pagination="pinPagination"/>
		</template>
		<template v-else-if="tab === 'info'">
			<div v-if="leader" class="sivpwjiw">
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
			<div v-if="subLeaders" class="sivpwjiw">
				<span>{{'サブリーダー'}}</span>
				<div class="users">
					<div v-for="subleader in subLeaders" :key="subleader.id" class="user _panel">
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

<script lang="ts" setup>
import { computed, inject, watch } from 'vue';
import MkContainer from '@/components/ui/container.vue';
import XPostForm from '@/components/post-form.vue';
import XTimeline from '@/components/timeline.vue';
import XNotes from '@/components/notes.vue';
import XChannelFollowButton from '@/components/channel-follow-button.vue';
import * as os from '@/os';
import * as symbols from '@/symbols';
import { $i } from '@/account';
import { i18n } from '@/i18n';
import { isChannelManager } from '@/scripts/is-channel-manager.js';

const props = defineProps<{
	channelId: string;
}>();

let channel = $ref(null);
let leader = $ref(null);
let subLeaders = $ref([]);
let tab = ('timeline')
let showBanner = $ref(true);
const pagination = {
	endpoint: 'channels/timeline' as const,
	limit: 10,
	params: computed(() => ({
		channelId: props.channelId,
	})),
};
const pinPagination = {
	endpoint: 'channels/show-pinned' as const,
	limit: 10,
	params: computed(() => ({
		channelId: props.channelId,
	})),
};

watch(() => props.channelId, async () => {
	channel = await os.api('channels/show', {
		channelId: props.channelId,
	});

	const leaders = await Promise.all([
		os.api('users/show', {
			userId: channel?.userId,
		}),
		...channel?.subLeaderIds.map(userId => os.api('users/show', { userId })),
	]);
	leader = leaders.shift();
	subLeaders = leaders;
}, { immediate: true });

function edit() {
	router.push(`/channels/${channel.id}/edit`);
}

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
			
		};
	},
const headerActions = $computed(() => channel && $i && isChannelManager($i.id, channel) ? [{
	icon: 'fas fa-cog',
	text: i18n.ts.edit,
	handler: edit,
}] : null);
const headerTabs = $computed(() => [{
		active: tab === 'timeline',
		title: i18n.ts.timeline,
		icon: 'fas fa-house',
		onClick: () => { tab = 'timeline'; },
	}, {
		active: tab === 'pinned',
		title: i18n.ts.pinned,
		icon: 'fas fa-thumbtack',
		onClick: () => { tab = 'pinned'; },
	}, {
		active: tab === 'info',
		title: i18n.ts.info,
		icon: 'fas fa-circle-info',
		onClick: () => { tab = 'info'; },
	},
]);
defineExpose({
	[symbols.PAGE_INFO]: 
//definePageMetadata(
	computed(() => channel ? {
	title: channel.name,
	icon: 'fas fa-satellite-dish',
	bg: 'var(--bg)',
	//old router start
	actions: headerActions,
	tabs: headerTabs,
	//old router end
} : null));
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

.sivpwjiw {
	> .users {
		> .user {
			display: flex;
			align-items: center;
			padding: 16px;

			> .avatar {
				width: 50px;
				height: 50px;
			}

			> .body {
				flex: 1;
				padding: 8px;

				> .name {
					display: block;
					font-weight: bold;
				}

				> .acct {
					opacity: 0.5;
				}
			}
		}
	}
}
</style>
