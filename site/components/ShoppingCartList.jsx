var React = require('react'),
    ShoppingCart = require('./ShoppingCart'),
    data = require('../../assets/shoppingCarts.json');

var ShoppingCartList = React.createClass({
  createCarts: function () {
    var result = [];
    var idx = 1;
    data.shoppingCarts.forEach( function (cart) {
      result.push(
        <ShoppingCart cart={cart} key={idx} id={idx}/>
      );
      idx++;
    });

    return result;
  },

  render: function () {
    var carts = this.createCarts();
    return (
      <div>
        {carts}
      </div>
    );
  }
});

module.exports = ShoppingCartList;
