export type SortParam =
	| 'name'
	| 'username'
	| 'email'
	| ''
	| 'title'
	| 'url'
	| 'body';
export function useSortedFilteredData<
	DataItemType extends Record<string, string | number | object>,
>(
	data: Ref<DataItemType[] | null>,
	inputValue: Ref<string | number>,
	filterParam: keyof DataItemType,
	sortParam: Ref<SortParam>,
) {
	return computed(() => {
		if (!data.value) return [];

		const dataCopy: DataItemType[] = structuredClone(toRaw(data.value));

		const search = String(inputValue?.value || '').toLowerCase();

		dataCopy.sort((item1, item2) => {
			console.log('sorting');
			const a = String(item1[sortParam!.value] ?? '');
			const b = String(item2[sortParam!.value] ?? '');
			return a.localeCompare(b);
		});

		return dataCopy.filter((item: DataItemType) => {
			console.log('filtering');
			const fieldValue = String(item[filterParam] ?? '');
			return fieldValue.toLowerCase().includes(search);
		});
	});
}
