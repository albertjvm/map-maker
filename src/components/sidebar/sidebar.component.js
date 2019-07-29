import React from 'react';

import { CANVAS_MODES, BW_PALETTE } from '../../app.constants';
import { Button } from '../button';
import EditItem from '../editItem/editItem.component';

export const SideBar = ({ 
  setCanvasMode,
  handleExport,
  canvasMode,
  selectedItem,
  removeItem,
  palette,
  handleSwitchPalette,
}) => {
  return (
  <section
    className="flex flex-column h-100 bg-black pa2"
    style={{width: '170px'}}
  >
    <div 
      className="flex-grow-1"
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gridTemplateRows: 'repeat(auto-fill, 50px)',
        gridGap: '5px',
      }}
    >
      <Button
        active={canvasMode === CANVAS_MODES.SELECT}
        handleClick={() => setCanvasMode(CANVAS_MODES.SELECT)}
      >Se</Button>
      <Button
        active={palette === BW_PALETTE}
        handleClick={handleSwitchPalette}
      >B/W</Button>
      <Button
        active={canvasMode === CANVAS_MODES.ROAD}
        handleClick={() => setCanvasMode(CANVAS_MODES.ROAD)}
      >Ro</Button>
      <Button
        active={canvasMode === CANVAS_MODES.CITY}
        handleClick={() => setCanvasMode(CANVAS_MODES.CITY)}
      >Ci</Button>
      <Button
        active={canvasMode === CANVAS_MODES.COAST}
        handleClick={() => setCanvasMode(CANVAS_MODES.COAST)}
      >Co</Button>
      <Button
        active={canvasMode === CANVAS_MODES.WOODS}
        handleClick={() => setCanvasMode(CANVAS_MODES.WOODS)}
      >Wo</Button>
      <Button
        active={canvasMode === CANVAS_MODES.MOUNTAIN}
        handleClick={() => setCanvasMode(CANVAS_MODES.MOUNTAIN)}
      >Mo</Button>
    </div>
    {selectedItem && 
      <EditItem
        item={selectedItem}
        className="flex-grow-1"
        removeItem={removeItem}
        palette={palette}
      />
    }
    <Button
      handleClick={handleExport}
    >Export as .png</Button>
  </section>
)};