import { Request, Response, NextFunction } from 'express'
import { MadError } from 'mad-error'
import { loggerAcquirer } from '../../utils/logger-acquirer/logger-acquirer'

const logger = loggerAcquirer.acquire().child('ExceptionHandler')

export default {
  notFound: (req: Request, res: Response, _next: NextFunction): void => {
    logger.error(`${req.originalUrl} not found`)
    res.status(404).json({
      ok: false,
      error: {
        status: 404,
        message: `${req.originalUrl} not found`,
      },
    })
  },
  internal: (err: any, req: Request, res: Response, _next: NextFunction): void => {
    const error = err instanceof MadError ? err.toJSON() : err
    logger.error(`${error.message} - ${error.stack ? '\n' + error.stack : ''}`)
    res.status(error.status || 500)
    res.json({
      ok: false,
      error: {
        status: error.status || 500,
        ...(error.code !== undefined && {code: error.code}),
        message: error.message || 'Internal server error'
      }
    })
  },
}
