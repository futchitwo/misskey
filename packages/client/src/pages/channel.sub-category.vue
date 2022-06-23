<template>
<MkSpacer :content-max="700">
	<div class="_content grwlizim owned">
		<MkButton class="new" @click="create()"><i class="fas fa-plus"></i></MkButton>
		<MkPagination v-slot="{items}" :pagination="pagination">
			<MkChannelPreview v-for="channel in items" :key="channel.id" class="_gap" :channel="channel"/>
		</MkPagination>
	</div>
</MkSpacer>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import MkChannelPreview from '@/components/channel-preview.vue';
import MkPagination from '@/components/ui/pagination.vue';
import MkButton from '@/components/ui/button.vue';
import * as os from '@/os';
import * as symbols from '@/symbols';
import { lang } from '@/config';
import { i18n } from '@/i18n';

export default defineComponent({
	components: {
		MkChannelPreview, MkPagination, MkButton,
	},
	props: {
		subCategoryId: {
			type: String,
			required: true,
		},
	},

	data() {
		return {
			[symbols.PAGE_INFO]: computed(() => ({
				title: this.subCategory ? this.subCategory.name : '',
				icon: 'fas fa-satellite-dish',
				bg: 'var(--bg)',
				actions: [{
					icon: 'fas fa-plus',
					text: this.$ts.create,
					handler: this.create,
				}],
			})),
			pagination: {
				endpoint: 'channels/sub-categories/channels' as const,
				params: {
					subCategoryId: this.subCategoryId,
				},
				limit: 10,
			},
			subCategory: null,
			lang,
		};
	},

	watch: {
		subCategoryId: {
			async handler() {
				this.subCategory = await os.api('channels/sub-categories/show', {
					subCategoryId: this.subCategoryId,
				});
			},
			immediate: true
		}
	},

	methods: {
		async create() {
			this.$router.push(`/channels/new`)
		}
	},
});
</script>
