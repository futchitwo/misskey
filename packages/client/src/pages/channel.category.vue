<template>
<MkSpacer :content-max="700">
	<div class="_content odegchni">
		<MkButton v-if="category.isGame || $i.isAdmin || $i.isModerator" class="new" @click="create()"><i class="fas fa-plus"></i></MkButton>
		<MkPagination v-slot="{items}" :pagination="pagination">
			<MkA v-for="subCategory in items" :key="subCategory.id" class="_gap" :to="`/channels/sub-category/${subCategory.id}`" >
				<div class="sub-category">{{subCategory.name}}</div>
			</MkA>
		</MkPagination>
	</div>
</MkSpacer>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import MkPagination from '@/components/ui/pagination.vue';
import MkButton from '@/components/ui/button.vue';
import * as os from '@/os';
import * as symbols from '@/symbols';
import { CHANNEL_CATEGORIES } from '@/const.js';
import { lang } from '@/config';
import { i18n } from '@/i18n';
import { MisskeyNavigator } from '@/scripts/navigate';

export default defineComponent({
	components: {
		MkPagination, MkButton,
	},
	props: {
		categoryName: {
			type: String,
			required: true,
		},
	},

	data() {
		return {
			category: CHANNEL_CATEGORIES.find(cat => cat.category === this.categoryName),
			[symbols.PAGE_INFO]: computed(() => ({
				title: this.category ? this.category[lang || ''] || this.categoryName : '',
				icon: 'fas fa-satellite-dish',
				bg: 'var(--bg)',
				actions: (this.category.isGame || this.$i.isAdmin || this.$i.isModerator) ? [{
					icon: 'fas fa-plus',
					text: this.$ts.create,
					handler: this.create,
				}] : [],
			})),
			pagination: {
				endpoint: 'channels/sub-categories/list' as const,
				params: {
					category: this.categoryName,
				},
				limit: 10,
			},
			lang,
		};
	},
	methods: {
		async create() {
			const { canceled, result } = await os.form(i18n.ts.createNewCategory, {
				name: {
					type: 'string',
					label: i18n.ts.name,
				},
				description: {
					type: 'string',
					required: false,
					multiline: true,
					label: i18n.ts.description,
				},
				...( this.category?.isGame ? { 
					appStoreId: {
						type: 'string',
						required: false,
					},
					googlePlayId: {
						type: 'string',
						required: false,
					},
					steamId: {
						type: 'string',
						required: false,
					},
					epicStoreId: {
						type: 'string',
						required: false,
					},
					siteUrl: {
						type: 'string',
						required: false,
					},
					iconUrl: {
						type: 'string',
						required: false,
					},
				} : {} ),
			});
			if (canceled) return;

			console.log("resu",result)

			const endpoint = this.category?.isGame ? 'channels/sub-categories/create-game' : 'channels/sub-categories/create';

			const newSubCat = await os.apiWithDialog(endpoint, {
				...result,
				category: this.categoryName,
			});
			
			//pagingComponent.reload();
			new MisskeyNavigator().push('/channels/sub-category/' + newSubCat.id);
		},
	},
});
</script>

<style lang="scss" scoped>
.odegchni {
	.sub-category {
		background-color: var(--panel);
		margin-bottom: var(--margin);
		padding: 10px;
		border-radius: var(--radius);
	}
}
</style>
