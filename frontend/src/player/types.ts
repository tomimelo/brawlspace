export interface PlayerRanked {
  name: string;
  brawlhalla_id: number;
  rating: number;
  peak_rating: number;
  tier: string;
  wins: number;
  games: number;
  region: string;
  global_rank: number;
  region_rank: number;
  legends: LegendRanked[];
}

export interface LegendRanked {
  legend_id: number;
  legend_name_key: string;
  rating: number;
  peak_rating: number;
  tier: string;
  wins: number;
  games: number;
}

export interface PlayerStats {
  brawlhalla_id: number;
  name: string;
  xp: number;
  level: number;
  xp_percentage: number;
  games: number;
  wins: number;
  damagebomb: string;
  damagemine: string;
  damagespikeball: string;
  damagesidekick: string;
  hitsnowball: number;
  kobomb: number;
  komine: number;
  kospikeball: number;
  kosidekick: number;
  kosnowball: number;
  legends: LegendStats[];
}

export interface LegendStats {
  legend_id: number;
  legend_name_key: string;
  damagedealt: string;
  damagetaken: string;
  kos: number;
  falls: number;
  suicides: number;
  teamkos: number;
  matchtime: number;
  games: number;
  wins: number;
  damageunarmed: string;
  damagethrownitem: string;
  damageweaponone: string;
  damageweapontwo: string;
  damagegadgets: string;
  kounarmed: number;
  kothrownitem: number;
  koweaponone: number;
  koweapontwo: number;
  kogadgets: number;
  timeheldweaponone: number;
  timeheldweapontwo: number;
  xp: number;
  level: number;
  xp_percentage: number;
}
