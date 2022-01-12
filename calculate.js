const discountFunction = (newPrice, oldPrice) => {
  const discount =
    ((parseFloat(newPrice) - parseFloat(oldPrice)) * 100) / newPrice;
  return discount.toFixed(2) + "%";
};

export { discountFunction };
