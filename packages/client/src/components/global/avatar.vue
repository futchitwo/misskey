<template>
<span v-if="disableLink" v-user-preview="disablePreview ? undefined : user.id" class="eiwwqkts _noSelect" :class="{ cat, square: $store.state.squareAvatars }" :title="acct(user)" @click="onClick">
	<svg v-if="birthday" class="crown" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36">
		<path fill="#ffcc4d" d="M 24,15 C 20,8 20,8 18,4 l -6,11 c -1,1 0.831563,0.370231 0.147987,-0.02962 C 8.9310345,13.08867 4,8 4,8 4,8 6,15.75 6,28 h 24 c 0,-12.25 2,-20 2,-20 0,0 -5,5 -8,7 z"></path><circle fill="#5c913b" cx="22" cy="18" r="1.8"></circle><circle fill="#dd2e44" cx="30" cy="20" r="1.8"></circle><circle fill="#981ceb" cx="14" cy="18" r="1.8"></circle><circle fill="#dd2e44" cx="6" cy="20" r="1.8"></circle><circle fill="#ffbb4d" cx="4" cy="8" r="1.407"></circle><circle fill="#ffbb4d" cx="18" cy="4" r="1.784"></circle><circle fill="#ffbb4d" cx="32" cy="8" r="1.407"></circle>
	</svg>
	<img class="inner" :src="url" decoding="async"/>
	<MkUserOnlineIndicator v-if="showIndicator" class="indicator" :user="user"/>
</span>
<MkA v-else v-user-preview="disablePreview ? undefined : user.id" class="eiwwqkts _noSelect" :class="{ cat, square: $store.state.squareAvatars }" :to="userPage(user)" :title="acct(user)" :target="target">
	<img class="inner" :src="url" decoding="async"/>
	<MkUserOnlineIndicator v-if="showIndicator" class="indicator" :user="user"/>
</MkA>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { getStaticImageUrl } from '@/scripts/get-static-image-url';
import { extractAvgColorFromBlurhash } from '@/scripts/extract-avg-color-from-blurhash';
import { acct, userPage } from '@/filters/user';
import MkUserOnlineIndicator from '@/components/user-online-indicator.vue';

export default defineComponent({
	components: {
		MkUserOnlineIndicator
	},
	props: {
		user: {
			type: Object,
			required: true
		},
		target: {
			required: false,
			default: null
		},
		disableLink: {
			required: false,
			default: false
		},
		disablePreview: {
			required: false,
			default: false
		},
		showIndicator: {
			required: false,
			default: false
		}
	},
	emits: ['click'],
	computed: {
		cat(): boolean {
			return this.user.isCat;
		},
		birthday(): boolean {
			if (this.user.birthday == null) return;
			const birthDate = new Date(this.user.birthday+"T00:00:00"); // local time zone
			const today = new Date();
			return (birthDate.getDate() === today.getDate()) && (birthDate.getMonth() === today.getMonth());
		},
		url(): string {
			return this.$store.state.disableShowingAnimatedImages
				? getStaticImageUrl(this.user.avatarUrl)
				: this.user.avatarUrl;
		},
	},
	watch: {
		'user.avatarBlurhash'() {
			if (this.$el == null) return;
			this.$el.style.color = extractAvgColorFromBlurhash(this.user.avatarBlurhash);
		}
	},
	mounted() {
		this.$el.style.color = extractAvgColorFromBlurhash(this.user.avatarBlurhash);
	},
	methods: {
		onClick(e) {
			this.$emit('click', e);
		},
		acct,
		userPage
	}
});
</script>

<style lang="scss" scoped>
@keyframes earwiggleleft {
	from { transform: rotate(37.6deg) skew(30deg); }
	25% { transform: rotate(10deg) skew(30deg); }
	50% { transform: rotate(20deg) skew(30deg); }
	75% { transform: rotate(0deg) skew(30deg); }
	to { transform: rotate(37.6deg) skew(30deg); }
}

@keyframes earwiggleright {
	from { transform: rotate(-37.6deg) skew(-30deg); }
	30% { transform: rotate(-10deg) skew(-30deg); }
	55% { transform: rotate(-20deg) skew(-30deg); }
	75% { transform: rotate(0deg) skew(-30deg); }
	to { transform: rotate(-37.6deg) skew(-30deg); }
}

.eiwwqkts {
	position: relative;
	display: inline-block;
	vertical-align: bottom;
	flex-shrink: 0;
	border-radius: 100%;
	line-height: 16px;

	> .crown {
		position: absolute;
		width: 65%;
		top: -35%;
		left: -5%;
		transform: rotate(339deg);
	}

	> .inner {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		top: 0;
		border-radius: 100%;
		z-index: 1;
		overflow: hidden;
		object-fit: cover;
		width: 100%;
		height: 100%;
	}

	> .indicator {
		position: absolute;
		z-index: 1;
		bottom: 0;
		left: 0;
		width: 20%;
		height: 20%;
	}

	&.square {
		border-radius: 20%;

		> .inner {
			border-radius: 20%;
		}
	}

	&.cat {
		> .crown {
			transform: none;
			margin-left: 30%;
			width: 50%;
		}

		&:before, &:after {
			background: #df548f;
			border: solid 4px currentColor;
			box-sizing: border-box;
			content: '';
			display: inline-block;
			height: 50%;
			width: 50%;
		}

		&:before {
			border-radius: 0 75% 75%;
			transform: rotate(37.5deg) skew(30deg);
		}

		&:after {
			border-radius: 75% 0 75% 75%;
			transform: rotate(-37.5deg) skew(-30deg);
		}

		&:hover {
			&:before {
				animation: earwiggleleft 1s infinite;
			}

			&:after {
				animation: earwiggleright 1s infinite;
			}
		}
	}
}
</style>
