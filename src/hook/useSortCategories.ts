const useSortCategories = (categories: any[]) => {
  if (categories.length === 0) return [];

  const sortedMenuItems = categories.sort((a, b) => a.menu_order - b.menu_order);
  return sortedMenuItems;
}

export default useSortCategories
