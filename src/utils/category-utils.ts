export function getBreadcrumbListFromCategory(category) {
  const yoast = category?.yoast_head_json || null;
  if (!yoast) return null;

  const yoastSchema = yoast?.schema || null;
  if (!yoastSchema) return null

  const schemaGraph: any[] = yoastSchema['@graph'];

  const list = schemaGraph.find(type => type['@type'] === 'BreadcrumbList')?.itemListElement || null;
  if (!list) return;

  const listWithSlugs = list.map(list => {
    const filteredSlug = list?.item?.split("/")?.[3];
    const currCategorySlug = !list.item ? category.slug : null
    return { ...list, slug: currCategorySlug || filteredSlug }
  })

  return listWithSlugs
}