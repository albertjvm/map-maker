import React, { Component } from 'react';
import { Button } from '../button';
import TextField from '../textfield/textfield.component';
import { ITEM_TYPES, ROAD_SIZES, ROAD_STYLES, CITY_SIZES } from '../../app.constants';
import { applyStyles } from '../../app.utils';
import { drawCity } from '../canvas/canvas.utils';

class EditItem extends Component {

  handleIncrease() {
    let { item, palette } = this.props;
    switch(item.type) {
      case ITEM_TYPES.ROAD:
        item.size = Math.min(item.size + 1, ROAD_SIZES.STONE_ROAD);
        applyStyles(item.path, ROAD_STYLES[item.size]);
        break;
      case ITEM_TYPES.CITY:
        item.size = Math.min(item.size + 1, CITY_SIZES.CITY);
        let { path, namePath } = drawCity(item.point, item.size, palette, item.name, item.path, item.namePath);
        item.path = path;
        item.namePath = namePath;
        break;
      default:
        break;
    }
  }

  handleDecrease() {
    let { item, palette } = this.props;
    switch(item.type) {
      case ITEM_TYPES.ROAD:
        item.size = Math.max(item.size - 1, 0);
        applyStyles(item.path, ROAD_STYLES[item.size]);
        break;
      case ITEM_TYPES.CITY:
        item.size = Math.max(item.size - 1, 0);
        let { path, namePath } = drawCity(item.point, item.size, palette, item.name, item.path, item.namePath);
        item.path = path;
        item.namePath = namePath;
        break;
      default:
        break;
    }
  }

  handleDelete() {
    let { item, removeItem } = this.props;
    if (item.path) {
      if (item.type === ITEM_TYPES.MOUNTAIN) {
        item.path.forEach(i => i.remove());
      } else {
        item.path.remove();
      }
    }
    if (item.namePath) {
      item.namePath.remove();
    }
    removeItem(item);
  }

  handleRefresh() {
    let { item, palette } = this.props;
    switch(item.type) {
      case ITEM_TYPES.CITY:
        let { path, namePath } = drawCity(item.point, item.size, palette, item.name, item.path, item.namePath);
        item.path = path;
        item.namePath = namePath;
        break;
      default:
        break;
    }
  }

  handleNameChange(name) {
    let { item } = this.props;
    item.name = name;
    if (item.namePath) {
      item.namePath.content = name;
    }
  }

  render() {
    let { item, className } = this.props;
    return (
      <div
        className={className}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gridTemplateRows: 'repeat(auto-fill, 50px)',
          gridGap: '5px',
      }}
      >
        <h2 className="f4 sans-serif white tc" style={{gridColumn: 'span 2'}}>
          {`Edit ${item.type.charAt(0)}${item.type.substr(1).toLowerCase()}`}
        </h2>
        {[ITEM_TYPES.CITY, ITEM_TYPES.ROAD].includes(item.type) &&
          <Button handleClick={() => this.handleIncrease()} className="f2">+</Button>
        }
        {[ITEM_TYPES.CITY, ITEM_TYPES.ROAD].includes(item.type) &&
          <Button handleClick={() => this.handleDecrease()} className="f2">-</Button>
        }
        {[ITEM_TYPES.CITY].includes(item.type) &&
          <Button handleClick={() => this.handleRefresh()} className="f2">↻</Button>
        }
        <Button handleClick={() => this.handleDelete()} className="f2">x</Button>
        {[ITEM_TYPES.CITY].includes(item.type) &&
          <TextField style={{gridColumn: 'span 2'}} onChange={(name) => this.handleNameChange(name)} value={item.name} />
        }
      </div>
    );
  }
}

export default EditItem;
