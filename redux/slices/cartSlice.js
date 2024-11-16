const { createSlice } = require("@reduxjs/toolkit");

// Helper function to safely get from localStorage
const getFromLocalStorage = (key, defaultValue) => {
  if (typeof window !== "undefined" && window.localStorage) {
    try {
      const storedValue = localStorage.getItem(key);
      if (storedValue !== null) {
        return JSON.parse(storedValue);
      }
    } catch (error) {
      console.error("Failed to parse localStorage item:", error);
    }
  }
  return defaultValue;
};

// Helper function to safely set to localStorage
const setToLocalStorage = (key, value) => {
  if (typeof window !== "undefined" && window.localStorage) {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

// Get initial state from local storage if available, or use an empty array as fallback
const initialState = getFromLocalStorage("cart", []);

const cartSlice = createSlice({
  name: "cart",
  initialState: initialState || [], // Ensure initialState is never undefined
  reducers: {
    addToCart: (state, action) => {
      const {
        id,
        title,
        salePrice,
        imageUrl,
        userId: vendorId,
      } = action.payload;
      const existingItem = state.find((item) => item.id === id);
      if (existingItem) {
        existingItem.qty += 1;
      } else {
        const newItem = { id, title, salePrice, qty: 1, imageUrl, vendorId };
        state.push(newItem);
      }
      setToLocalStorage("cart", state);
    },
    removeFromCart: (state, action) => {
      const cartId = action.payload;
      const newState = state.filter((item) => item.id !== cartId);
      setToLocalStorage("cart", newState);
      return newState; // Return the new state
    },
    incrementQty: (state, action) => {
      const cartId = action.payload;
      const cartItem = state.find((item) => item.id === cartId);
      if (cartItem) {
        cartItem.qty += 1;
        setToLocalStorage("cart", state);
      }
    },
    decrementQty: (state, action) => {
      const cartId = action.payload;
      const cartItem = state.find((item) => item.id === cartId);
      if (cartItem && cartItem.qty > 1) {
        cartItem.qty -= 1;
        setToLocalStorage("cart", state);
      }
    },
    clearCart: (state) => {
      const newState = [];
      setToLocalStorage("cart", newState);
      return newState; // Return the cleared state
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  incrementQty,
  decrementQty,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;
