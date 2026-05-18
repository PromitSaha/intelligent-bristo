export const calculateKitchenTime = (
  cartItems
) => {
  const chefLoads = [0, 0];
  const jobs = [];

  cartItems.forEach((cartItem) => {
    const prepTime =
      parseInt(
        cartItem.item.preparationTime
      );

    for (
      let i = 0;
      i < cartItem.quantity;
      i++
    ) {
      jobs.push(prepTime);
    }
  });

  jobs.sort((a, b) => b - a);
  jobs.forEach((job) => {
    const leastBusyChef =
      chefLoads[0] <= chefLoads[1]
        ? 0
        : 1;
    chefLoads[leastBusyChef] += job;
  });

  return Math.max(...chefLoads);
};