import React, {PropTypes, Component} from 'react';
import DogbarkTextInput from './DogbarkTextInput';

class Header extends Component {
  constructor(props) {
    super(props);
    this.handleSave = this.handleSave.bind(this);
  }

  handleSave(text) {
    if (text.length !== 0) {
      this.props.addDogbark(text);
    }
  }

  render() {
    return (
      <header className="header">
        <h1>dogbarks</h1>
        <DogbarkTextInput
          newDogbark
          onSave={this.handleSave}
          placeholder="What needs to be done?"
          />
      </header>
    );
  }
}

Header.propTypes = {
  addDogbark: PropTypes.func.isRequired
};

export default Header;
