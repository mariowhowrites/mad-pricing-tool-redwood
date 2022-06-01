import type {
  FindBatchPriceQuery,
  FindBatchPriceQueryVariables,
} from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

let cachedBatchPrices = []

export const QUERY = gql`
  query FindBatchPriceQuery($input: GetSquareFootageInput!) {
    batchPrices: batchPrices(input: $input) {
      id
      totalPrice
      variant
    }
  }
`

export const Failure = ({
  error,
}: CellFailureProps<FindBatchPriceQueryVariables>) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({
  batchPrices,
}: CellSuccessProps<FindBatchPriceQuery, FindBatchPriceQueryVariables>) => {
  return (
    <ul>
      {batchPrices.map((variantPrice) => (
        <li key={variantPrice.id}>
          {variantPrice.variant}: ${variantPrice.totalPrice}
        </li>
      ))}
    </ul>
  )
}

// export const Loading = () => <span>{cachedBatchPrices}</span>

export const afterQuery = (data: { batchPrice: number }) => {
  cachedBatchPrices = data.batchPrices

  return { ...data }
}
