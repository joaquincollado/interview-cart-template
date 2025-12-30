export const getSelectedProducts = (state) =>
  state.products.filter((p) => state.selectedProducts.includes(p.id));
