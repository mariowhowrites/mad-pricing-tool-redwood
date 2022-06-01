import { db } from 'src/lib/db'
import type { QueryResolvers } from 'types/graphql'

export const batchPrices: QueryResolvers['batchPrices'] = async ({ input }) => {
  const squareInches = input.height * input.width * input.quantity

  const closestMeasurement = await db.$queryRaw<
    {
      id: number
      distance: number
    }[]
  >`
    SELECT id, ABS(squareInches - ${squareInches}) AS distance
    FROM PriceMeasurement
    WHERE priceSnapshotId = ${input.snapshotID}
    ORDER BY distance ASC
    LIMIT 1
  `

  if (closestMeasurement.length === 0) {
    throw new Error('No prices found')
  }

  const closestMeasurementsByVariant = await db.$queryRaw<
    {
      id: number
      pricePerSquareInch: number
      variant: string
      distance: number
    }[]
  >`
    SELECT id, pricePerSquareInch, variant, ABS(squareInches - ${squareInches}) AS distance
    FROM PriceMeasurement
    WHERE priceSnapshotId = ${input.snapshotID}
    HAVING distance = ${closestMeasurement[0].distance}
    ORDER BY distance ASC
  `

  return closestMeasurementsByVariant.map(
    ({ id, pricePerSquareInch, variant }) => {
      const priceInCents =
        pricePerSquareInch * input.quantity * input.width * input.height
      const priceInDollars = Number((priceInCents / 100).toFixed(2))

      return {
        id,
        variant,
        totalPrice: priceInDollars,
      }
    }
  )
}
