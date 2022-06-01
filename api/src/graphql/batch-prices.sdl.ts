export const schema = gql`
  input GetSquareFootageInput {
    width: Float!
    height: Float!
    quantity: Int!
    snapshotID: Int!
  }

  type BatchPrice {
    id: Int!
    variant: String!
    totalPrice: Float!
  }

  type Query {
    batchPrices(input: GetSquareFootageInput!): [BatchPrice!]! @skipAuth
  }
`
