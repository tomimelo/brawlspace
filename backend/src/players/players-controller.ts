import { Request, Response } from 'express'
import { BaseController } from '../lib/base-controller/base-controller'
import { PlayersService } from './players-service'

export class PlayersController extends BaseController {
  public constructor(private readonly playersService: PlayersService) {
    super()
  }

  public async searchPlayers(req: Request, res: Response): Promise<void> {
    const { q, page = 1 } = req.query as any
    if (!q) {
      const error = new Error("Query param 'q' is required")
      this.handleError(error)
    }
    const results = await this.playersService.searchPlayers(q, { page })
    res.json({
      ok: true,
      ...results,
    })
  }

  public async getPlayer(req: Request, res: Response): Promise<void> {
    const { steamId } = req.params
    const player = await this.playersService.getPlayer(steamId)
    res.json({
      ok: true,
      player,
    })
  }

  public handleError(error: any): void {
    console.log(error)
  }
}
