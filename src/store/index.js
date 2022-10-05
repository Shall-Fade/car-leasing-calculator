import { createStore } from "vuex";

const store = createStore({
  state: {
    leaseSum: null,
    monthlyPayment: null,
    isDisabled: false,
    v$: null,
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
    SEND_VALIDATOR(state, v$) {
      state.v$ = v$;
    },
  },
});

export default store;
