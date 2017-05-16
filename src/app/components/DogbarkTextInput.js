import React, {Component, PropTypes} from 'react';
import classnames from 'classnames';

class DogbarkTextInput extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      text: this.props.text || ''
    };
    this.handleBlur = this.handleBlur.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    const text = e.target.value.trim();
    if (e.which === 13) {
      this.props.onSave(text);
      if (this.props.newDogbark) {
        this.setState({text: ''});
      }
    }
  }

  handleChange(e) {
    this.setState({text: e.target.value});
  }

  handleBlur(e) {
    if (!this.props.newDogbark) {
      this.props.onSave(e.target.value);
    }
  }

  render() {
    return (
      <input
        className={
          classnames({
            edit: this.props.editing,
            'new-dogbark': this.props.newDogbark
          })}
        type="text"
        placeholder={this.props.placeholder}
        autoFocus="true"
        value={this.state.text}
        onBlur={this.handleBlur}
        onChange={this.handleChange}
        onKeyDown={this.handleSubmit}
        />
    );
  }
}

DogbarkTextInput.propTypes = {
  onSave: PropTypes.func.isRequired,
  text: PropTypes.string,
  placeholder: PropTypes.string,
  editing: PropTypes.bool,
  newDogbark: PropTypes.bool
};

export default DogbarkTextInput;
