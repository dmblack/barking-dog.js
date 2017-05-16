import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Header from '../components/Header';
import MainSection from '../components/MainSection';
import * as DogbarkActions from '../actions/index';

class App extends Component {
  render() {
    const {dogbarks, actions} = this.props;
    return (
      <div>
        <Header
          addDogbark={actions.addDogbark}
          />
        <MainSection
          dogbarks={dogbarks}
          actions={actions}
          />
      </div>
    );
  }
}

App.propTypes = {
  dogbarks: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    dogbarks: state.dogbarks
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(DogbarkActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
