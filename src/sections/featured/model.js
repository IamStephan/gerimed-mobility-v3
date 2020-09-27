/**
 * Get the latest products
 * by update date
 */

const FeaturedProducts = `
  query(
    $limit: Int!
  ) {
    products(
      sort: "updatedAt:desc",
      limit: $limit,
      start: 0
    ) {
      id
      name
      price
      categories {
        id
        name
      }
      showcase(
        limit: 1,
        start: 0
      ) {
        url
        formats
      }
    }
  }
`

export {
  FeaturedProducts
}