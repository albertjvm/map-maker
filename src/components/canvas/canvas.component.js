import React, { Component } from 'react';
import paper, { Path, Shape, Tool } from 'paper';
import cx from 'classnames';

import { applyStyles } from '../../app.utils';

import {
  ITEM_TYPES,
  CANVAS_MODES,
  CITY_SIZES,
  ROAD_SIZES,
  ROAD_STYLES,
} from '../../app.constants';

import {
  createCityItem,
  createCoastItem,
  createMountainItem,
  createRoadItem,
  createWoodsItem,
  drawCity,
  drawCoast,
  drawMountain,
  drawWoods,
} from './canvas.utils';

class Canvas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      canvas: null,
      path: null,
      tool: null,
    };
  }

  componentDidMount() {
    let { palette, setBackground } = this.props;
    let canvas = document.getElementById('canvas');
    const w = canvas.scrollWidth;
    const h = canvas.scrollHeight;
    paper.setup(canvas);
    canvas.width = w;
    canvas.height = h;
    this.setState({
      ...this.state,
      canvas,
      tool: this.createTool(),
    });

    let bg = new Shape.Rectangle({
      point: [0, 0],
      size: [w, h],
      fillColor: palette.BACKGROUND,
    });
    setBackground(bg);
  }

  componentDidUpdate() {

  }

  createTool() {
    const tool = new Tool();

    tool.onMouseMove = (e) => {
      let { canvasMode } = this.props;
      if (canvasMode === CANVAS_MODES.SELECT) {
        paper.project.activeLayer.selected = false;
        if (e.item) {
          e.item.selected = true;
        }
      }
    };

    tool.onMouseDown = (e) => {
      let { canvasMode } = this.props;
      if ([
        CANVAS_MODES.ROAD,
        CANVAS_MODES.COAST,
        CANVAS_MODES.WOODS,
        CANVAS_MODES.MOUNTAIN,
      ].includes(canvasMode)) {
        this.startPath(e);
      }
    };

    tool.onMouseDrag = (e) => {
      let { canvasMode } = this.props;
      if ([
        CANVAS_MODES.ROAD,
        CANVAS_MODES.COAST,
        CANVAS_MODES.WOODS,
        CANVAS_MODES.MOUNTAIN,
      ].includes(canvasMode)) {
        this.state.path.add(e.point);
      }
    };

    tool.onMouseUp = (e) => {
      let { canvasMode, items, selectItem } = this.props;
      switch(canvasMode) {
        case CANVAS_MODES.ROAD:
          this.finishRoad(e);
          break;
        case CANVAS_MODES.COAST:
          this.finishCoast(e);
          break;
        case CANVAS_MODES.CITY:
          this.finishCity(e);
          break;
        case CANVAS_MODES.WOODS:
          this.finishWoods(e);
          break;
        case CANVAS_MODES.MOUNTAIN:
          this.finishMountain(e);
          break;
        case CANVAS_MODES.SELECT:
          if (e.item) {
            let item = items.find(o => {
              if (o.type === ITEM_TYPES.MOUNTAIN) {
                return o.path.find(p => p.id === e.item.id);
              } else {
                return o.id === e.item.id;
              }
            });
            selectItem(item);
          }
          break;
        default:
          break;
      }
    };

    return tool;
  }

  finishCity(e) {
    const { addItem, palette } = this.props;
    let { path, namePath } = drawCity(e.point, CITY_SIZES.HAMLET, palette, "City Name");
    addItem(createCityItem(path, CITY_SIZES.HAMLET, e.point, "City Name", namePath));
  }

  finishCoast(e) {
    const { canvas, path } = this.state;
    const { addItem, palette } = this.props;

    drawCoast(path, canvas);

    path.strokeColor = palette.WATER;
    path.fillColor = palette.WATER;

    addItem(createCoastItem(path));
  }

  finishMountain(e) {
    let { path } = this.state;
    const { addItem, palette } = this.props;

    path.closed = true;
    path.simplify(10);
    path.smooth({type: 'catmull-rom'});
    let bPath = path.clone();
    path = drawMountain(path, palette);
    bPath.remove();

    addItem(createMountainItem(path, bPath));
  }

  finishRoad(e) {
    let { path } = this.state;
    const { addItem, palette } = this.props;

    path.simplify(10);
    path.smooth({type: 'continuous'});
    path.fullySelected = false;
    applyStyles(path, ROAD_STYLES[ROAD_SIZES.PATH]);
    path.strokeColor = palette.ROAD_DIRT;

    addItem(createRoadItem(path, ROAD_SIZES.PATH));
  }

  finishWoods(e) {
    let { path } = this.state;
    const { addItem, palette } = this.props;

    path.closed = true;
    path.simplify(10);
    path.smooth({type: 'catmull-rom'});
    path = drawWoods(path, palette);
    let bPath = path.clone();
    bPath.remove();

    addItem(createWoodsItem(path, bPath, 1));
  }

  startPath(e) {
    const { path } = this.state;
    const { palette } = this.props;

    if (path) {
      path.selected = false;
    }

    this.setState({
      ...this.state,
      path: new Path({
        segments: [e.point],
        strokeColor: palette.PATH_INPROGRESS,
        strokeWidth: 1,
        fullySelected: false,
      }),
    });
  }

  render () {
    let { className, canvasMode } = this.props;
    return (
      <canvas 
        id="canvas"
        resize="true"
        className={cx(
          className,
          {pointer: canvasMode === CANVAS_MODES.ROAD }
        )}
      ></canvas>
    );
  }
}

export default Canvas;
