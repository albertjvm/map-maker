import React, { Component } from 'react';
import cx from 'classnames';

class TextField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
    };
  }

  handleChange(e) {
    this.setState({
      value: e.target.value,
    }, () => {
      this.props.onChange(this.state.value);
    });
  }

  render() {
    let { className, style } = this.props;
    let { value } = this.state;
    return (
      <div className={cx(className)} style={style}>
        <input
          type="text"
          className="w-100 bw2 bt-0 br-0 bl-0 b--white white bg-black f3 sans-serif"
          placeholder="City Name"
          style={{
            height: '3rem',
            outline: 'none',
          }}
          onChange={(e) => this.handleChange(e)}
          value={value}
        />
      </div>
    );
  }
}

export default TextField;
