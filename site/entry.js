var React = require('react'),
    ReactDOM = require('react-dom'),
    ReactDOMServer = require('react-dom/server'),
    Root = require('./components/Root');

// Server-side creation of the initial static HTML page
module.exports = function render(locals, callback) {
  var html = ReactDOMServer.renderToString(React.createElement(Root, locals));
  callback(null, '<!DOCTYPE html>' + html);
};

// Client-side JS
if (typeof document !== 'undefined') {
  var initialProps = JSON.parse(document.getElementById('initial-props').innerHTML);
  ReactDOM.render(React.createElement(Root, initialProps), document);
}
