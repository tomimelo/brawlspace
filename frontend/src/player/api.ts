import { PlayerRanked, PlayerStats } from './types';

const token = import.meta.env.VITE_BRAWLHALLA_TOKEN;

export default {
  getRanked: async (): Promise<PlayerRanked> => {
    const res = await fetch(`https://api.brawlhalla.com/player/6086423/ranked?api_key=${token}`);
    const data = await res.json();

    if (!res.ok) {
      throw new Error('no se pudo realizar el método de getRanked');
    }

    return data;
  },
  getStats: async (): Promise<PlayerStats> => {
    const res = await fetch(`https://api.brawlhalla.com/player/6086423/stats?api_key=${token}`);
    const data = await res.json();

    if (!res.ok) {
      throw new Error('no se pudo realizar el método de getStats');
    }

    return data;
  },
};
