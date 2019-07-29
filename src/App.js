import React, { Component } from 'react';
import { SideBar } from './components';
import Canvas from './components/canvas/canvas.component';
import { CANVAS_MODES, COLOR_PALETTE, BW_PALETTE } from './app.constants';
import {
  createBlobFromDataURL,
  saveBlob,
  recolour,
} from './app.utils';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      background: null,
      palette: BW_PALETTE,
      canvasMode: CANVAS_MODES.SELECT,
      selectedItem: null,
      items: [],
    };
  }

  switchPalette = () => {
    const { background, items, palette } = this.state;
    let newPalette = palette === BW_PALETTE ? COLOR_PALETTE : BW_PALETTE;
    this.setState({
      ...this.state,
      palette: newPalette,
    });
    background.fillColor = newPalette.BACKGROUND;
    recolour(items, newPalette);
  };

  setCanvasMode = (mode) => {
    this.setState({
      ...this.state,
      selectedItem: null,
      canvasMode: mode,
    });
  };

  addItem = (item) => {
    this.setState({
      ...this.state,
      items: [...this.state.items, item],
    });
  }

  removeItem = (item) => {
    this.setState({
      ...this.state,
      selectedItem: null,
    });
  }

  selectItem = (item) => {
    this.setState({
      ...this.state,
      selectedItem: item,
    });
  }

  setBackground = (path) => {
    this.setState({
      ...this.state,
      background: path,
    });
  }

  exportCanvas = () => {
    let canvas = document.getElementById('canvas');
    let dataUrl = canvas.toDataURL("image/png");
    let blob = createBlobFromDataURL(dataUrl);
    saveBlob(blob);
  }

  render() {
    const { canvasMode, items, selectedItem, palette } = this.state;
    return (
      <div className="w-100 h-100 flex flex-row">
        <Canvas 
          className="flex-grow-1"
          canvasMode={canvasMode}
          items={items}
          addItem={this.addItem}
          selectItem={this.selectItem}
          selectedItem={this.selectedItem}
          palette={palette}
          setBackground={this.setBackground}
        />
        <SideBar 
          canvasMode={canvasMode}
          selectedItem={selectedItem}
          setCanvasMode={this.setCanvasMode}
          handleExport={() => this.exportCanvas()}
          removeItem={this.removeItem}
          palette={palette}
          handleSwitchPalette={() => this.switchPalette()}
        />
      </div>
    );
  }
}

export default App;
