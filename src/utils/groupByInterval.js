import moment from 'moment';

const groupDataByInterval = (orders, interval) => {
  const groupedData = {};

  orders.forEach((order) => {
    const date = moment(order.created_at);
    const totalPrice = parseFloat(order.total_price_set.shop_money.amount);

    let key;
    switch (interval) {
      case 'daily':
        key = date.format('YYYY-MM-DD');
        break;
      case 'monthly':
        key = date.format('YYYY-MM');
        break;
      case 'quarterly':
        key = `${date.year()}-Q${date.quarter()}`;
        break;
      case 'yearly':
        key = date.format('YYYY');
        break;
      default:
        key = date.format('YYYY-MM-DD');
        break;
    }

    if (!groupedData[key]) {
      groupedData[key] = 0;
    }
    groupedData[key] += totalPrice;
  });

  return groupedData;
};

export default groupDataByInterval;
