/**
 * Get the latest products
 * by update date
 */

const LatestProducts = `
  query(
    $limit: Int!
  ) {
    products(
      sort: "createdAt:desc",
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
  LatestProducts
}