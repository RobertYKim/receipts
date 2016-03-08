var React = require('react');

var Receipt = React.createClass({
  createReceipt: function () {
    var lineItems = [];
    var salesTax = 0;
    var total = 0;
    var idx = 0;

    this.props.cart.items.forEach ( function (item) {
      var splitLine = item.split(" at ");
      var itemDetails = splitLine[0];
      var itemCost = splitLine[1];
      var itemTax = this.calculateTax(itemDetails, itemCost);
      var itemTotal = (parseFloat(itemCost) + parseFloat(itemTax)).toFixed(2);

      var receiptLine = itemDetails + ": " + itemTotal;
      lineItems.push(<li key={idx}>{receiptLine}</li>);

      salesTax += parseFloat(itemTax);
      total += parseFloat(itemTotal);
      idx++;
    }.bind(this));

    lineItems.push(<li key={idx}>Sales Taxes: {salesTax.toFixed(2)}</li>);
    idx++;
    lineItems.push(<li key={idx}>Total: {total.toFixed(2)}</li>);

    return lineItems;
  },

  calculateTax: function (itemDetails, itemCost) {
    var exempt = /(book|chocolate|pills)/;
    var imported = /imported/;
    var salesTax = exempt.test(itemDetails) ? 0 : 0.1;
    var duty = imported.test(itemDetails) ? 0.05 : 0;
    var taxRate = salesTax + duty;

    var tax = (parseFloat(itemCost) * taxRate).toFixed(2);
    return this.roundUp(tax);
  },

  roundUp: function (string) {
    var tax = string;
    var nextNickel = /[1-4]/;
    var nextDime = /[6-9]/;
    var lastDigitIdx = tax.length - 1;
    var lastDigit = parseInt(tax[lastDigitIdx]);
    if (nextNickel.test(lastDigit)) {
      tax = string.slice(0, -1) + "5";
    } else if (nextDime.test(lastDigit)) {
      tax = string.slice(0, -1) + "0";
      tax = (parseFloat(tax) + 0.1).toFixed(2);
    }
    return tax;
  },

  render: function () {
    var receipt = this.createReceipt();

    return (
      <ul className="receipt">
        {receipt}
      </ul>
    );
  }
});

module.exports = Receipt;
