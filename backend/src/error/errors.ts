import { MadError } from 'mad-error'

export class NotFoundError extends MadError {
  public constructor(message: string) {
    super(message)
    this.name = 'NotFoundError'
    this.code('NOT_FOUND')
    this.status(404)
  }
}
