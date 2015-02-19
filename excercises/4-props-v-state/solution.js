////////////////////////////////////////////////////////////////////////////////
// Excercise:
//
// make tabs a "pure component" by not managing any of its own state, instead
// add a property to tell it which tab to show, and then have it communicate
// with its owner to get rerendered with a new active tab.
////////////////////////////////////////////////////////////////////////////////
var React = require('react');
var styles = require('./styles');
var data = require('./data');

var Tabs = React.createClass({

  propTypes: {
    data: React.PropTypes.array.isRequired,
    activeTabIndex: React.PropTypes.number.isRequired,
    onActivateTab: React.PropTypes.func.isRequired,
  },

  handleTabClick: function (activeTabIndex) {
    this.props.onActivateTab(activeTabIndex);
  },

  renderTabs: function () {
    var that = this;
    return this.props.data.map(function (tab, index) {
      var style = that.props.activeTabIndex === index ?
        styles.activeTab : styles.tab;
      var clickHandler = that.handleTabClick.bind(that, index);
      return (
        <div key={tab.name} style={style} onClick={clickHandler}>
          {tab.name}
        </div>
      );
    });
  },

  renderPanel: function () {
    var tab = this.props.data[this.props.activeTabIndex];
    return (
      <div>
        <p>{tab.description}</p>
      </div>
    );
  },

  render: function () {
    return (
      <div style={styles.app}>
        <div style={styles.tabs}>
          {this.renderTabs()}
        </div>
        <div style={styles.tabPanels}>
          {this.renderPanel()}
        </div>
      </div>
    );
  }
});

var App = React.createClass({
  getInitialState: function () {
    return {
      activeTabIndex: 0
    };
  },

  handleActivateTab: function (activeTabIndex) {
    this.setState({ activeTabIndex });
  },

  render: function () {
    return (
      <div>
        <h1>Props v. State</h1>
        <Tabs
          data={this.props.tabs}
          activeTabIndex={this.state.activeTabIndex}
          onActivateTab={this.handleActivateTab}
        />
      </div>
    );
  }
});

React.render(<App tabs={data}/>, document.body);

