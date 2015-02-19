var React = require('react');
var md5 = require('MD5');
var validateEmail = require('./validateEmail');
var warning = require('react/lib/warning');

var GRAVATAR_URL = "http://gravatar.com/avatar";

var USERS = [
  { id: 1, name: 'Ryan Florence', email: 'rpflorence@gmail.com' },
  { id: 2, name: 'Michael Jackson', email: 'mjijackson@gmail.com' }
];

var emailType = function (props, propName, componentName) {
  warning(
    validateEmail(props.email),
    "Invalid prop \"" + propName + "\", can't convert \"" + props[propName] + "\" to number. Check the render method of \"" + componentName + "\"."
  );
};

var sizeType = function (props, propName, componentName) {
  warning(
    !isNaN(parseInt(props[propName])),
    "Invalid prop \"" + propName + "\", can't convert \"" + props[propName] + "\" to number. Check the render method of \"" + componentName + "\"."
  );
};

var Gravatar = React.createClass({
  propTypes: {
    user: React.PropTypes.shape({
      email: emailType,
      name: React.PropTypes.string.isRequired,
      id: React.PropTypes.number.isRequired
    }).isRequired,
    size: sizeType
  },

  getDefaultProps: function () {
    return {
      size: 16
    };
  },

  render: function () {
    var user = this.props.user;
    var size = this.props.size;
    var hash = md5(user.email);
    var url = "" + GRAVATAR_URL + "/" + hash + "?s=" + size * 2;
    return <img src={url} width={size} />;
  }
});

var App = React.createClass({
  render: function () {
    var users = this.props.users.map(function (user) {
      return <li key={user.id}><Gravatar user={user} size={36} /> {user.name}</li>;
    });
    return (
      <div>
        <h1>Users</h1>
        <ul>{users}</ul>
      </div>
    );
  }
});

React.render(<App users={USERS}/>, document.body);