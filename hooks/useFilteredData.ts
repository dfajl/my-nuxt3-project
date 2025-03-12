export function useFilteredData<DataItemType>(
	data: Ref<DataItemType[] | null>,
	inputValue: Ref<string | number> | undefined,
	paramOfSorting: keyof DataItemType,
) {
	return computed(() => {
		if (!data.value) return [];
		const search = String(inputValue?.value || '').toLowerCase();
		return data.value.filter((item: DataItemType) => {
			const fieldValue = String(item[paramOfSorting] ?? '');
			return fieldValue.toLowerCase().includes(search);
		});
	});
}
