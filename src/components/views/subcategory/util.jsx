/**
 *
 * @param {*} filterOptions filterOptions contains all the selected filter values for in a subcategory
 * @param {*} posts posts contains all the posts in the subcategory
 * @returns returns all the posts that match all values in the filterOptions
 */
export function FilterPostsHandler(filterOptions, posts) {
  return posts.filter((post) => {
    const { ProductSpecification, Category, Subcategory } = post;
    const parsedCategory = Category.replaceAll(" ", "_");
    const parsedSubcategory = Subcategory.replaceAll(" ", "_");
    for (const [filterName, filterValue] of Object.entries(filterOptions)) {
      if (
        ProductSpecification[parsedCategory][parsedSubcategory]?.[
          filterName
        ] !== filterValue
      ) {
        return false;
      }
    }
    return true;
  });
}
