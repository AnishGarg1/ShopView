const groupDataByInterval = (records, interval) => {
  const groupedData = {};

  records.forEach((order) => {
    const date = new Date(order.created_at);
    let key;

    switch (interval) {
      case "daily":
        key = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
        break;
      case "monthly":
        key = `${date.getFullYear()}-${date.getMonth() + 1}`;
        break;
      case "quarterly":
        const quarter = Math.floor(date.getMonth() / 3) + 1;
        key = `${date.getFullYear()}-Q${quarter}`;
        break;
      case "yearly":
        key = `${date.getFullYear()}`;
        break;
      default:
        key = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    }

    if (!groupedData[key]) groupedData[key] = 0;
    groupedData[key] += parseFloat(order.total_price);
  });

  return groupedData;
};

export default groupDataByInterval;