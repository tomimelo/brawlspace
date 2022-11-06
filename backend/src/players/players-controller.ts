import { NextFunction, Request, Response } from 'express'
import { BaseController } from '../lib/base-controller/base-controller'
import { PlayersService } from './players-service'

export class PlayersController extends BaseController {
  public constructor(private readonly playersService: PlayersService) {
    super()
  }

  public async searchPlayer(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { q } = req.query
      const player = await this.playersService.searchPlayer(q as string)

      res.json({
        ok: true,
        player,
      })
    } catch (error) {
      this.handleError(error, next)
    }
  }

  public async getPlayer(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { steamId } = req.params
      const player = await this.playersService.getPlayer(steamId)
      res.json({
        ok: true,
        player,
      })
    } catch (error) {
      this.handleError(error, next)
    }
  }

  public handleError(error: any, next: NextFunction): void {
    next(error)
  }
}
