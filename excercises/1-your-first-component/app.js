////////////////////////////////////////////////////////////////////////////////
// Excercise:
//
// Render `DATA` to the page
// - put the title in an h1
// - only render mexican food (hint: arrays have a "filter" method)
// - sort the items in alphabetical order by name
//   (might want to use `sort-by` https://github.com/staygrimm/sort-by#example)
////////////////////////////////////////////////////////////////////////////////

var React = require('react');
var sortBy = require('sort-by');

var DATA = {
  title: 'Menu',
  items: [
    { id: 1, name: 'tacos', type: 'mexican' },
    { id: 2, name: 'burrito', type: 'mexican' },
    { id: 3, name: 'tostada', type: 'mexican' },
    { id: 4, name: 'hush puppies', type: 'southern' }
  ]
};

var MenuItem = React.createClass({
  render: function () {
    return (
      <li>{this.props.name}</li>
    );
  }
})

var Menu = React.createClass({
  render: function () {
    DATA.items.sort(sortBy('name'));
    var rows = [];
    DATA.items
      .filter(function(i) {
        return i.type === 'mexican';
      })
      .forEach(function(i) {
        rows.push(<MenuItem name={i.name} />);
      });

    return (
      <div class="menu">
        <h1>{this.props.title}</h1>
        <ul>
          {rows}
        </ul>
      </div>
    );
  }
});

React.render(<Menu/>, document.body, () => {
  require('./tests').run();
});


// React.render(<div>hello</div>, document.body);
// React.render(React.DOM.div({}, 'test2'), document.body);

// var App = React.createClass({
//   render: function() {
//     var name = "test2";
//     return (
//       <div className="App">
//         <h1>{this.props.test ? 'yes' : 'no'}</h1>
//         <hr />
//         {this.props.children}
//         <hr />
//         <pre>{JSON.stringify(this.props.children, undefined, 2)}</pre>
//       </div>
//     );
//   }
// });

// var ContentToggle = React.createClass({

//   getInitialState: function() {
//     return {
//       showDetails: true
//     };
//   },

//   handleClick: function(event) {
//     console.log('click', event);
//     this.setState({
//       showDetails: !this.state.showDetails
//     });
//   },

//   render: function() {
//     var details = this.state.showDetails ? this.props.children : null;
//     return (
//       <div class="ContentToggle">
//         <div onClick={this.handleClick}>
//           <h1>{this.props.summary} - {this.state.showDetails}</h1>
//           {details}
//         </div>
//       </div>
//     );
//   }
// });

// React.render(
//   <App test="xasdadasdad">
//     <ContentToggle summary="TOGGLE">
//       INSIDE
//     </ContentToggle>
//   </App>
// , document.body);
