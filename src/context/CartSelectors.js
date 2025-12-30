export const getSelectedProducts = (state) => {
  const selectedIds = Object.keys(state.selectedProducts);
  return state.products
    .filter((p) => selectedIds.includes(p.id))
    .map((p) => ({
      ...p,
      quantity: state.selectedProducts[p.id],
    }));
};

export const getTotalItems = (state) => {
  return Object.values(state.selectedProducts).reduce(
    (sum, qty) => sum + qty,
    0
  );
};
