import config from 'config'
import { AppConfig } from './config'
import { ApplicationRunner } from './lib/runner/application-runner/application-runner'
import { loggerAcquirer } from './utils/logger-acquirer/logger-acquirer'

const environment = config.get<AppConfig['env']>('env')

const logger = loggerAcquirer.acquire()

async function startFunction (): Promise<void> {
  logger.info(`Starting app with environment: ${environment}`)
  logger.info('✓ App started')
}

try {
  new ApplicationRunner().run(startFunction)
} catch (error: any) {
  logger.error(error.message)
  process.exit(1)
}
