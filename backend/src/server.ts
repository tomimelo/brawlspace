import config from 'config'
import { MadServerConfig } from 'mad-server'
import { normalizePort } from './utils/normalizer'
import { AppConfig } from './config'
import { loggerAcquirer } from './utils/logger-acquirer/logger-acquirer'
import { apiRouter } from './api/routes/api.routes'

const appConfig = config.get<AppConfig['api']>('api')

const port = normalizePort(process.env.PORT, appConfig.port)
const logger = loggerAcquirer.acquire().child('HttpServer')

export const serverConfig: MadServerConfig = {
  port,
  logger,
  router: apiRouter,
  routePrinter: (routes) => {
    console.log('Available endpoints ==>', { endpoints: routes })
  }
}
