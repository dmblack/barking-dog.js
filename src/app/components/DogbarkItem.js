import React, {Component, PropTypes} from 'react';
import Moment from 'react-moment';
import classnames from 'classnames';
import DogbarkTextInput from './DogbarkTextInput';

class DogbarkItem extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      editing: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleDoubleClick = this.handleDoubleClick.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  handleChange() {
    this.props.completeDogbark(this.props.dogbark.id);
  }

  handleClick() {
    this.props.deleteDogbark(this.props.dogbark.id);
  }

  handleDoubleClick() {
    this.setState({editing: true});
  }

  handleSave(text) {
    if (text.length === 0) {
      this.props.deleteDogbark(this.props.dogbark.id);
    } else {
      this.props.editDogbark(this.props.dogbark.id, text);
    }
    this.setState({editing: false});
  }

  render() {
    const {dogbark} = this.props;

    let element;
    if (this.state.editing) {
      element = (
        <DogbarkTextInput
          text={dogbark.text}
          editing={this.state.editing}
          onSave={this.handleSave}
          />
      );
    } else {
      element = (
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            checked={dogbark.completed}
            onChange={this.handleChange}
            />
          <label
            onDoubleClick={this.handleDoubleClick}
            >
            {dogbark.text}
          </label>
          <button
            className="destroy"
            onClick={this.handleClick}
            />
          <Moment
            date={dogbark.date}
            />
        </div>
      );
    }

    return (
      <li
        className={classnames({
          completed: dogbark.completed,
          editing: this.state.editing
        })}
        >
        {element}
      </li>
    );
  }
}

DogbarkItem.propTypes = {
  dogbark: PropTypes.object.isRequired,
  editDogbark: PropTypes.func.isRequired,
  deleteDogbark: PropTypes.func.isRequired,
  completeDogbark: PropTypes.func.isRequired
};

export default DogbarkItem;
