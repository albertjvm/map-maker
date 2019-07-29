import React from 'react';
import cx from 'classnames';

export const Button = ({ icon, active, handleClick, className, style, children }) => (
  <button
    className={
      cx(className, "ba bw2 br2 pa1 sans-serif b", {
        "bg-black": !active,
        "b--white": !active,
        "white": !active,
        "bg-white": active,
        "b--black": active,
        "black": active,
      })
    }
    onClick={handleClick}
    style={{
      outlineColor: 'white',
      outlineWidth: '2px',
      outlineStyle: active ? 'solid' : 'none',
      userSelect: 'none',
      ...style,
    }}
  >
    {icon && <img alt={icon} src={require(`../../assets/icons/${icon}.png`)} style={{height: '30px', width: '30px'}} /> }
    {children}
  </button>
);