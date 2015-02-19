////////////////////////////////////////////////////////////////////////////////
// Excercise:
// - make these tabs work when you click them
////////////////////////////////////////////////////////////////////////////////
var React = require('react');
var assign = require('react/lib/Object.assign');

var DATA = [
  { name: 'USA', description: 'Land of the Free, Home of the brave' },
  { name: 'China', description: 'Lots of concrete' },
  { name: 'Russia', description: 'World Cup 2018!' },
];

var App = React.createClass({

  getInitialState: function () {
    return {
      activeTabIndex: 0
    };
  },

  handleTabClick: function (activeTabIndex) {
    this.setState({ activeTabIndex: activeTabIndex });
  },

  renderTabs: function () {
    var that = this;
    return this.props.countries.map(function (country, index) {
      var style = that.state.activeTabIndex === index ?
        styles.activeTab : styles.tab;
      var clickHandler = that.handleTabClick.bind(that, index);
      return (
        <div key={country.name} style={style} onClick={clickHandler}>
          {country.name}
        </div>
      );
    });
  },

  renderPanel: function () {
    var country = this.props.countries[this.state.activeTabIndex];
    return (
      <div>
        <p>{country.description}</p>
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

var styles = {};

styles.tab = {
  display: 'inline-block',
  padding: 10,
  margin: 10,
  borderBottom: '4px solid',
  borderBottomColor: '#ccc',
  cursor: 'pointer'
};

styles.activeTab = assign({}, styles.tab, {
  borderBottomColor: '#000'
});

styles.tabPanels = {
  padding: 10
};

React.render(<App countries={DATA}/>, document.body);
