var React = require('react'),
    ShoppingCartList = require('./ShoppingCartList');

var Root = React.createClass({
  render: function () {
    var initialProps = {
      __html: safeStringify(this.props)
    };

    return (
      <html>
        <head>
          <title>{this.props.title}</title>
        </head>
        <body>
          <ShoppingCartList />
          <script
            id="initial-props"
            type="application/json"
            dangerouslySetInnerHTML={initialProps} />
          <script src='bundle.js' />
        </body>
      </html>
    );
  }
});

function safeStringify(obj) {
  // Copy props without webpackStats, which causes circular JSON error
  var objWithoutStats = {};
  for (var key in obj) {
    if (key !== "webpackStats") {
      objWithoutStats[key] = obj[key];
    }
  }
  return JSON.stringify(objWithoutStats).replace(/<\/script/g, '<\\/script').replace(/<!--/g, '<\\!--');
}

module.exports = Root;
