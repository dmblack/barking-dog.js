import React, {Component, PropTypes} from 'react';
import DogbarkItem from './DogbarkItem';
import Footer from './Footer';
import {SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE} from '../constants/DogbarkFilters';

const DOGBARK_FILTERS = {
  [SHOW_ALL]: () => true,
  [SHOW_ACTIVE]: dogbark => !dogbark.completed,
  [SHOW_COMPLETED]: dogbark => dogbark.completed
};

class MainSection extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {filter: SHOW_ALL};
    this.handleClearCompleted = this.handleClearCompleted.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleCompleteAll = this.handleCompleteAll.bind(this);
  }

  handleClearCompleted() {
    this.props.actions.clearCompleted();
  }

  handleCompleteAll() {
    this.props.actions.completeAll();
  }

  handleShow(filter) {
    this.setState({filter});
  }

  renderToggleAll(completedCount) {
    const {dogbarks} = this.props;
    if (dogbarks.length > 0) {
      return (
        <input
          className="toggle-all"
          type="checkbox"
          checked={completedCount === dogbarks.length}
          onChange={this.handleCompleteAll}
          />
      );
    }
  }

  renderFooter(completedCount) {
    const {dogbarks} = this.props;
    const {filter} = this.state;
    const activeCount = dogbarks.length - completedCount;

    if (dogbarks.length) {
      return (
        <Footer
          completedCount={completedCount}
          activeCount={activeCount}
          filter={filter}
          onClearCompleted={this.handleClearCompleted}
          onShow={this.handleShow}
          />
      );
    }
  }

  render() {
    const {dogbarks, actions} = this.props;
    const {filter} = this.state;

    const filteredDogbarks = dogbarks.filter(DOGBARK_FILTERS[filter]);
    const completedCount = dogbarks.reduce((count, dogbark) =>
      dogbark.completed ? count + 1 : count,
      0
    );

    return (
      <section className="main">
        {this.renderToggleAll(completedCount)}
        <ul className="dogbark-list">
          {filteredDogbarks.map(dogbark =>
            <DogbarkItem
              key={dogbark.id}
              dogbark={dogbark}
              {...actions}
              />
          )}
        </ul>
        {this.renderFooter(completedCount)}
      </section>
    );
  }
}

MainSection.propTypes = {
  dogbarks: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

export default MainSection;
