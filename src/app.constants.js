export const BW_PALETTE = {
  BACKGROUND: 'white', //'forestgreen',
  WATER: 'black', //'lightblue',
  PATH_INPROGRESS: 'black',
  CITY: 'black',
  MOUNTAIN_FILL: 'white', //'slategray',
  MOUNTAIN_STROKE: 'black',
  WOODS: 'black', //'darkgreen',
  ROAD_DIRT: 'black', //'sienna',
  ROAD_PAVED: 'black', //'slategray',
};

export const COLOR_PALETTE = {
  BACKGROUND: 'forestgreen',
  WATER: 'lightblue',
  PATH_INPROGRESS: 'black',
  CITY: 'black',
  MOUNTAIN_FILL: 'slategray',
  MOUNTAIN_STROKE: 'black',
  WOODS: 'darkgreen',
  ROAD_DIRT: 'sienna',
  ROAD_PAVED: 'slategray',
};

export const CANVAS_MODES = {
  SELECT: 'SELECT',
  ROAD: 'ROAD',
  CITY: 'CITY',
  COAST: 'COAST',
  WOODS: 'WOODS',
  MOUNTAIN: 'MOUNTAIN',
};

export const ITEM_TYPES = {
  ROAD: 'ROAD',
  CITY: 'CITY',
  COAST: 'COAST',
  WOODS: 'WOODS',
  MOUNTAIN: 'MOUNTAIN',
};

export const CITY_SIZES = {
  HOUSE: 0,
  HAMLET: 1,
  VILLAGE: 2,
  TOWN: 3,
  CITY: 4,
};

export const ROAD_SIZES = {
  DISUSED_PATH: 0,
  PATH: 1,
  DIRT_ROAD: 2,
  STONE_ROAD: 3
};

export const CITY_CONFIG = {
  [CITY_SIZES.HOUSE]: {
    MIN_N: 1,
    MAX_N: 1,
    MIN_W: 5,
    MAX_W: 15,
    R: 1,
  },
  [CITY_SIZES.HAMLET]: {
    MIN_N: 2,
    MAX_N: 5,
    MIN_W: 5,
    MAX_W: 15,
    R: 30,
  },
  [CITY_SIZES.VILLAGE]: {
    MIN_N: 4,
    MAX_N: 9,
    MIN_W: 5,
    MAX_W: 15,
    R: 40,
  },
  [CITY_SIZES.TOWN]: {
    MIN_N: 10,
    MAX_N: 20,
    MIN_W: 5,
    MAX_W: 15,
    R: 50,
  },
  [CITY_SIZES.CITY]: {
    MIN_N: 30,
    MAX_N: 50,
    MIN_W: 5,
    MAX_W: 15,
    R: 65,
  },
};

export const ROAD_STYLES = {
  [ROAD_SIZES.DISUSED_PATH]: {
    strokeWidth: 2,
    dashArray: [10, 12],
  },
  [ROAD_SIZES.PATH]: {
    strokeWidth: 2,
    dashArray: null,
  },
  [ROAD_SIZES.DIRT_ROAD]: {
    strokeWidth: 4,
    dashArray: null,
  },
  [ROAD_SIZES.STONE_ROAD]: {
    strokeWidth: 5,
    dashArray: null,
  },
};
