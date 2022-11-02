import { PlayerRanked, PlayerStats } from './types';

const token = import.meta.env.VITE_BRAWLHALLA_TOKEN;

export default {
  getRanked: async (): Promise<PlayerRanked> => {
    try {
      const res = await fetch(`https://api.brawlhalla.com/player/6086423/ranked?api_key=${token}`);
      const data = res.json();

      return data;
    } catch (err) {
      throw new Error((err as Error).message);
    }
  },
  getStats: async (): Promise<PlayerStats> => {
    try {
      const res = await fetch(`https://api.brawlhalla.com/player/6086423/stats?api_key=${token}`);
      const data = res.json();

      return data;
    } catch (err) {
      throw new Error((err as Error).message);
    }
  },
};
