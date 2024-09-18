const { createSlice } = require("@reduxjs/toolkit");

// Helper function to safely get from localStorage
const getFromLocalStorage = (key, defaultValue) => {
  if (typeof window !== 'undefined' && window.localStorage) {
    const storedValue = localStorage.getItem(key);
    if (storedValue !== null) {
      return JSON.parse(storedValue);
    }
  }
  return defaultValue;
};

// Helper function to safely set to localStorage
const setToLocalStorage = (key, value) => {
  if (typeof window !== 'undefined' && window.localStorage) {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

// Get initial state from local storage if available
const initialState = getFromLocalStorage('cart', []);
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { id, title, salePrice, imageUrl, userId: vendorId } = action.payload;

      // Check if the item already exists in the cart
      const existingItem = state.find((item) => item.id === id);

      if (existingItem) {
        // If the item exists, update the quantity
        existingItem.qty += 1;
      } else {
        // If item does not exists, add it to the cart
        const newItem = { id, title, salePrice, qty: 1, imageUrl, vendorId };
        state.push(newItem);
      }
      setToLocalStorage('cart', state);
    },

    removeFromCart: (state, action) => {
      const cartId = action.payload;
      const newState = state.filter((item) => item.id !== cartId);

      // Update local storage with new state
      setToLocalStorage('cart', newState);
      return newState;
    },

    incrementQty: (state, action) => {
      const cartId = action.payload;
      const cartItem = state.find((item) => item.id === cartId);
      if (cartItem) {
        cartItem.qty += 1;
        // Update the local storage with new state
        setToLocalStorage('cart', state);
      }
    },

    decrementQty: (state, action) => {
      const cartId = action.payload;
      const cartItem = state.find((item) => item.id === cartId);
      if (cartItem && cartItem.qty > 1) {
        cartItem.qty -= 1;
        // Update the local storage with new state
        setToLocalStorage('cart', state);
      }
    },

    clearCart: (state) => {
      const newState = [];
      setToLocalStorage('cart', newState);
      return newState;
    },
  }
});

// Export the reducer and reducers
export const { addToCart, removeFromCart, incrementQty, decrementQty, clearCart} = cartSlice.actions;
export default cartSlice.reducer;
