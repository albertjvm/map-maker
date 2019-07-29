import { CompoundPath, Point, Path, PointText } from 'paper';
import { ITEM_TYPES, CITY_CONFIG } from '../../app.constants';
import { random, randomInt, randomPointWithinRadius } from '../../utils';

export const createCityItem = (path, size, point, name, namePath) => ({
  type: ITEM_TYPES.CITY,
  id: path.id,
  size,
  point,
  path,
  name,
  namePath,
});

export const createCoastItem = (path) => ({
  type: ITEM_TYPES.COAST,
  id: path.id,
  path,
});

export const createMountainItem = (path, boundingPath) => ({
  type: ITEM_TYPES.MOUNTAIN,
  id: path.id,
  path,
  boundingPath,
});

export const createRoadItem = (path, size) => {
  return {
    type: ITEM_TYPES.ROAD,
    id: path.id,
    size,
    path,
  };
};

export const createWoodsItem = (path, boundingPath, density = 1) => ({
  type: ITEM_TYPES.WOODS,
  id: path.id,
  path,
  boundingPath,
  density,
});

export const drawCity = (point, size, palette, name = "City Name", path = null, namePath = null) => {
  if (!path) {
    path = new CompoundPath({fillColor: palette.CITY});
  } else {
    path.removeChildren();
  }

  const CONFIG = CITY_CONFIG[size];
  let w;
  let n = randomInt(CONFIG.MIN_N, CONFIG.MAX_N);
  for(let i = 0; i < n; i++) {
    w = randomInt(CONFIG.MIN_W, CONFIG.MAX_W);
    let newPath = new Path.Rectangle({
      point: randomPointWithinRadius(point.x, point.y, CONFIG.R),
      size: [w, 2 * (CONFIG.MAX_W - CONFIG.MIN_W) - w],
    });
    newPath.rotate(randomInt(0, 180));

    while(path.getIntersections(newPath).length > 0) {
      newPath.remove();
      newPath = new Path.Rectangle({
      point: randomPointWithinRadius(point.x, point.y, CONFIG.R),
      size: [w, 2 * (CONFIG.MAX_W - CONFIG.MIN_W) - w],
      });
      newPath.rotate(randomInt(0, 180));
    }

    path.addChild(newPath);
  }

  if (!namePath) {
    namePath = new PointText({
      point: [point.x, point.y + CONFIG.R + 18],
      content: name,
      fillColor: 'black',
      fontFamily: 'Courier New',
      fontWeight: 'bold',
      fontSize: 18,
      shadowColor: 'white',
      shadowBlur: 5,
    });
  } else {
    namePath.point = [point.x, point.y + CONFIG.R + 25];
  }

  return {
    path,
    namePath,
  };
};

export const drawMountain = (boundingPath, palette, paths = null) => {
  if (!paths || !paths.length) {
    paths = [];
  } else {
    paths.forEach(p => p.remove());
  }
  let { point, size } = boundingPath.bounds;
  let x = Math.floor(point.x);
  let y = Math.floor(point.y);
  let { width, height } = size;
  let p;

  for (let j = y; j < y + height; j+=20) {
    for (let i = x; i < x + width; i+=30) {
      p = new Point(i + ((j/20) % 2) * 20, j);
      if (boundingPath.contains(p)) {
        let mw = randomInt(20, 50);
        let mh = randomInt(45, 60);
        paths.push(new Path({
          segments: [[p.x - mw/2, p.y], [p.x, p.y - mh], [p.x + mw/2, p.y]],
          fillColor: palette.MOUNTAIN_FILL, strokeColor: palette.MOUNTAIN_STROKE,
        }));
      }
    }
  }

  boundingPath.remove();
  return paths;
}

export const drawWoods = (boundingPath, palette, density = 1, path = null) => {
  if (!path) {
    path = new CompoundPath({fillColor: palette.WOODS});
  } else {
    path.removeChildren();
  }
  let { point, size } = boundingPath.bounds;
  let x = Math.floor(point.x);
  let y = Math.floor(point.y);
  let { width, height } = size;
  let p, d;
  for (let j = y; j < y + height; j+=3) {
    for (let i = x; i < x + width; i+=3) {
      p = new Point(i, j);
      d = p.getDistance(boundingPath.getNearestPoint(p));
      d /= Math.sqrt(Math.pow(width/3, 2) + Math.pow(height/3, 2));
      if (boundingPath.contains(p) && random() < Math.sin(d)/10) {
        path.addChild(new Path.Circle({
          center: [i, j],
          radius: randomInt(5, 10),
        }));
      }
    }
  }

  boundingPath.remove();
    
  return path;
};

const min = (arr) => {
  let m = Infinity;
  let mi;

  arr.forEach((v, i) => {
    if (v < m) {
      m = v;
      mi = i;
    }
  });

  return {
    m: m,
    i: mi,
  };
};

export const drawCoast = (path, canvas) => {
    const { width, height } = canvas;

    let { x, y } = path.firstSegment.point;
    let side1 = min([y, width - x, height - y, x]).i;

    switch(side1) {
      case 0:
        path.insert(0, new Point(x, 0));
        break;
      case 1:
        path.insert(0, new Point(width, y));
        break;
      case 2:
        path.insert(0, new Point(x, height));
        break;
      case 3:
        path.insert(0, new Point(0, y));
        break;
      default:
        break;
    }

    x = path.lastSegment.point.x;
    y = path.lastSegment.point.y;
    let side2 = min([y, width - x, height - y, x]).i;

    switch(side2) {
      case 0:
        path.add(new Point(x, 0));
        break;
      case 1:
        path.add(new Point(width, y));
        break;
      case 2:
        path.add(new Point(x, height));
        break;
      case 3:
        path.add(new Point(0, y));
        break;
      default:
        break;
    }

    path.simplify(10);
    path.smooth({type: 'geometric'});

    let corners = [[0, 0], [width, 0], [width, height], [0, height]];
    corners = [...corners, ...corners];
    if (side1 < side2) {
      side1 += 4;
    }

    let newPoints = corners.slice(side2 + 1, side1 + 1);
    newPoints.forEach(([cx, cy]) => {
      path.add(new Point(cx, cy));
    });
};
