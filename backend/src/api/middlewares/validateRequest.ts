import { NextFunction, Request, Response } from 'express'
import { validationResult } from 'express-validator'
import { BadRequestError } from 'mad-error';

export default function (req: Request, res: Response, next: NextFunction): void {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    const errorMsg = errors.array().map(err => err.msg).join('. ')
    throw new BadRequestError(errorMsg)
  }

  next()
}
