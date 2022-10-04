import { createStore } from "vuex";

const store = createStore({
  state: {
    leaseSum: null,
    monthlyPayment: null,
    isDisabled: false,
  },
  mutations: {
    UPDATE_LEASE_SUM(state, leaseSum) {
      state.leaseSum = leaseSum;
    },
    UPDATE_MONTHLY_PAYMENT(state, monthlyPayment) {
      state.monthlyPayment = monthlyPayment;
    },
    TOGGLE_BUTTON(state, isDisabled) {
      state.isDisabled = isDisabled;
    },
  },
});

export default store;
