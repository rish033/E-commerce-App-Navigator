import create from 'zustand';

const DukanCart = create(set => ({
  ProdsinCart: [],
  quantity: 0,
  addToCart: product => {
    set(state => {
      const alreadyPresent = state.ProdsinCart.find(
        item => item.name === product.name,
      );
      if (alreadyPresent !== undefined) {
        alreadyPresent.quantity++;
        return {ProdsinCart: state.ProdsinCart, quantity: state.quantity + 1};
      } else {
        product.quantity = 1;
        return {
          ProdsinCart: [...state.ProdsinCart, product],
          quantity: state.quantity + 1,
        };
      }
    });
  },
}));
export default DukanCart;
