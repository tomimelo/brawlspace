import { PlayerRanked, PlayerStats } from './types';

const token = import.meta.env.VITE_BRAWLHALLA_TOKEN;

export default {
  getRanked: async (id: string): Promise<PlayerRanked> => {
    const res = await fetch(`https://api.brawlhalla.com/player/${id}/ranked?api_key=${token}`);
    const data = await res.json();

    //Brawlhalla api does not check if ID does not exist, that's why we check if data is not empty.
    if (!res.ok || Object.keys(data).length === 0) {
      throw new Error('no se pudo realizar el método de getRanked');
    }

    return data;
  },
  getStats: async (id: string): Promise<PlayerStats> => {
    const res = await fetch(`https://api.brawlhalla.com/player/${id}/stats?api_key=${token}`);
    const data = await res.json();

    if (!res.ok || Object.keys(data).length === 0) {
      throw new Error('no se pudo realizar el método de getStats');
    }

    return data;
  },
};
