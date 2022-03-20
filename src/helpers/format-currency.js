export const formatCurrency = (num = 0, cur) => {
  if (!cur) {
    return new Intl.NumberFormat('en-US').format(+num);
  } else {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: cur
    }).format(+num);
  }
};
