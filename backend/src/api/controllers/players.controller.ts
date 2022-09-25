import { Request, Response } from 'express'
import { BaseController } from '../../lib/base-controller/base-controller'

export class PlayersController extends BaseController {
  public constructor() {
    super()
  }

  public searchPlayer(req: Request, res: Response) {
    const { steamId } = req.query
    res.json({
      ok: true,
      player: steamId
    })
  }

  public handleError(error: any) {
    console.log(error)
  }

}