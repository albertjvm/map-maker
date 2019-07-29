import { ITEM_TYPES, ROAD_SIZES } from './app.constants';

export const applyStyles = (item, styles) => {
  Object.keys(styles).forEach(k => {
    item[k] = styles[k];
  });
};

export const createBlobFromDataURL = (dataURL) => {
  const splitIndex = dataURL.indexOf(',');
  if (splitIndex === -1) {
    return new window.Blob();
  }
  const base64 = dataURL.slice(splitIndex + 1);
  const byteString = window.atob(base64);
  const type = dataURL.slice(0, splitIndex);
  const mimeMatch = /data:([^;]+)/.exec(type);
  const mime = (mimeMatch ? mimeMatch[1] : '') || undefined;
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (var i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new window.Blob([ ab ], { type: mime });
};

export const saveBlob = (blob) => {
  const filename = 'map-maker.png';
  let link = document.createElement('a');
  link.style.visibility = 'hidden';
  link.target = '_blank';
  link.download = filename;
  link.href = window.URL.createObjectURL(blob);
  document.body.appendChild(link);
  link.onclick = () => {
    link.onclick = null;
    setTimeout(() => {
      window.URL.revokeObjectURL(blob);
      if (link.parentElement) link.parentElement.removeChild(link);
      link.removeAttribute('href');
    });
  };
  link.click();
};

export const recolour = (items, palette) => {
  items.forEach(item => {
    switch(item.type) {
      case ITEM_TYPES.CITY:
        item.path.fillColor = palette.CITY;
        break;
      case ITEM_TYPES.COAST:
        item.path.fillColor = palette.WATER;
        item.path.strokeColor = palette.WATER;
        break;
      case ITEM_TYPES.MOUNTAIN:
        item.path.forEach(p => {
        p.fillColor = palette.MOUNTAIN_FILL;
        p.strokeColor = palette.MOUNTAIN_STROKE;
        });
        break;
      case ITEM_TYPES.ROAD:
        item.path.strokeColor = item.size === ROAD_SIZES.STONE_ROAD ? palette.ROAD_PAVED : palette.ROAD_DIRT;
        break;
      case ITEM_TYPES.WOODS:
        item.path.fillColor = palette.WOODS;
        break;
      default:
        break;
    }
  });
};
