import type { APIGatewayEvent, Context } from 'aws-lambda'
import { logger } from 'src/lib/logger'

/**
 * The handler function is your code that processes http request events.
 * You can use return and throw to send a response or error, respectively.
 *
 * Important: When deployed, a custom serverless function is an open API endpoint and
 * is your responsibility to secure appropriately.
 *
 * @see {@link https://redwoodjs.com/docs/serverless-functions#security-considerations|Serverless Function Considerations}
 * in the RedwoodJS documentation for more information.
 *
 * @typedef { import('aws-lambda').APIGatewayEvent } APIGatewayEvent
 * @typedef { import('aws-lambda').Context } Context
 * @param { APIGatewayEvent } event - an object which contains information from the invoker.
 * @param { Context } context - contains information about the invocation,
 * function, and execution environment.
 */

let priceMap = {}

export const handler = async (event: APIGatewayEvent, context: Context) => {
  logger.info('Invoked calculatePrice function')

  console.debug(event, context)

  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
    }
  }

  ;['something'].forEach((key) => {
    if (Object.keys(event.queryStringParameters).includes(key)) {
      if (Object.keys(priceMap).includes(key)) {
        console.debug('fetching from cache')
      } else {
        console.debug('adding to cache')
        priceMap[key] = event.queryStringParameters[key]
      }
    }
  })

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      data: priceMap['something'],
    }),
  }
}
