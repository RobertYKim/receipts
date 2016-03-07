var React = require('react'),
    Receipt = require('./Receipt.jsx');

var ShoppingCart = React.createClass({
  toggleReceipt: function () {
    var showReceipt = !this.state.showReceipt;
    this.setState({ showReceipt: showReceipt });
  },

  getInitialState: function () {
    return { showReceipt: false };
  },

  render: function () {
    var receipt;
    if (this.state.showReceipt) {
      receipt = <Receipt cart={this.props.cart} />;
    }

    return (
      <div>
        <h1 onClick={this.toggleReceipt}>
          Cart {this.props.id}: {this.props.cart.items.length} items
        </h1>
        {receipt}
      </div>
    );
  }
});

module.exports = ShoppingCart;
