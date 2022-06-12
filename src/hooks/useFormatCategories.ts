const useFormatCategories = (categories) => {
  const parentCategories = categories.filter(category => category.parent === 0);

  const formatedCategories = parentCategories.map(category => {
    return { 
      id: category.id,
      title: category.name,  
      icon: "FruitsVegetable",
      slug: decodeURI(category.slug),
      children: categories.filter(cat => cat.parent === category.id).map(category => {
        return {
          id: category.id,
          title: category.name,  
          icon: "FruitsVegetable",
          slug: decodeURI(category.slug),
        }
      })
    }
  })

  return formatedCategories;
}

export default useFormatCategories
