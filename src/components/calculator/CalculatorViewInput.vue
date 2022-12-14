<template>
  <div class="calculator">
    <h1 class="calculator__title">Рассчитайте стоимость автомобиля в лизинг</h1>
    <div class="calculator-container">
      <!-- Стоимость автомобиля -->
      <div
        class="calculator-block"
        :class="{ 'calculator-block--disabled': isDisabled }"
      >
        <h5 class="calculator-block__title">Стоимость автомобиля</h5>
        <div class="calculator-block__group">
          <input
            class="calculator-block__input"
            :class="{ 'calculator-block__input--disable': isDisabled }"
            v-model="state.carCost"
            type="text"
            :disabled="isDisabled"
            @blur="v$.carCost.$touch()"
          />
          <input
            class="calculator-block__range"
            min="1000000"
            max="6000000"
            v-model="state.carCost"
            type="range"
            :disabled="isDisabled"
          />
          <span class="calculator-block__span currency">₽</span>
        </div>
        <base-error v-if="v$.carCost.$error">
          <template v-slot:error>{{ v$.carCost.$errors[0].$message }}</template>
        </base-error>
      </div>
      <!-- Первоначальный взнос -->
      <div
        class="calculator-block"
        :class="{ 'calculator-block--disabled': isDisabled }"
      >
        <h5 class="calculator-block__title">Первоначальный взнос</h5>
        <div class="calculator-block__group">
          <input
            class="calculator-block__input"
            v-model="state.initialPayment"
            type="text"
            disabled
            @blur="v$.initialPayment.$touch()"
          />
          <input
            class="calculator-block__range"
            min="10"
            max="60"
            v-model="state.initialPaymentPercent"
            type="range"
            :disabled="isDisabled"
          />
          <span class="calculator-block__span calculator-block__span--percent">
            <p>{{ state.initialPaymentPercent }}%</p>
          </span>
        </div>
        <base-error v-if="v$.initialPaymentPercent.$error">
          <template v-slot:error>{{
            v$.initialPaymentPercent.$errors[0].$message
          }}</template>
        </base-error>
      </div>
      <!-- Срок лизинга -->
      <div
        class="calculator-block"
        :class="{ 'calculator-block--disabled': isDisabled }"
      >
        <h5 class="calculator-block__title">Срок лизинга</h5>
        <div class="calculator-block__group">
          <input
            class="calculator-block__input"
            v-model="state.leaseTerm"
            type="text"
            :disabled="isDisabled"
            @blur="v$.leaseTerm.$touch()"
          />
          <input
            class="calculator-block__range"
            min="1"
            max="60"
            v-model="state.leaseTerm"
            type="range"
            :disabled="isDisabled"
          />
          <span class="calculator-block__span currency">мес.</span>
        </div>
        <base-error v-if="v$.leaseTerm.$error">
          <template v-slot:error>{{
            v$.leaseTerm.$errors[0].$message
          }}</template>
        </base-error>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, watch, reactive } from "vue";
import { useStore } from "vuex";
import { useVuelidate } from "@vuelidate/core";
import {
  required,
  numeric,
  minValue,
  maxValue,
  helpers,
} from "@vuelidate/validators";
export default {
  setup() {
    // Переменные
    const store = useStore();
    const isDisabled = computed(() => store.state.isDisabled);

    const state = reactive({
      carCost: 3300000,
      initialPaymentPercent: 13,
      leaseTerm: 60,
      leaseSum: 0,
      initialPayment: 0,
      monthlyPayment: 0,
      interestRate: 0.035,
    });

    // Правила валидации
    const rules = computed(() => {
      return {
        carCost: {
          required: helpers.withMessage("Обязательное поле", required),
          numeric: helpers.withMessage("Только цифры", numeric),
          minValueValue: helpers.withMessage(
            "Минимальная сумма: 1 000 000",
            minValue(1000000)
          ),
          maxValueValue: helpers.withMessage(
            "Максимальная сумма: 6 000 000",
            maxValue(6000000)
          ),
        },
        initialPaymentPercent: {
          required: helpers.withMessage("Обязательное поле", required),
          numeric: helpers.withMessage("Только цифры", numeric),
          minValueValue: helpers.withMessage(
            "Минимальный процент: 10%",
            minValue(10)
          ),
          maxValueValue: helpers.withMessage(
            "Максимальный процент: 60%",
            maxValue(60)
          ),
        },
        leaseTerm: {
          required: helpers.withMessage("Обязательное поле", required),
          numeric: helpers.withMessage("Только цифры", numeric),
          minValueValue: helpers.withMessage(
            "Минимальное количество месяцев: 1",
            minValue(1)
          ),
          maxValueValue: helpers.withMessage(
            "Максимальное количество месяцев: 60",
            maxValue(60)
          ),
        },
      };
    });

    const v$ = useVuelidate(rules, state);

    onMounted(() => {
      costCalculation();
    });

    // Наблюдатели
    watch(
      () => state.carCost,
      () => {
        costCalculation();
      }
    );

    watch(
      () => state.initialPaymentPercent,
      () => {
        costCalculation();
      }
    );

    watch(
      () => state.leaseTerm,
      () => {
        costCalculation();
      }
    );

    // Расчет стоимости
    function costCalculation() {
      // Первоначальный взнос
      state.initialPayment = Math.round(
        (state.initialPaymentPercent / 100) * state.carCost
      );
      // Ежемесячный платеж
      state.monthlyPayment = Math.round(
        (state.carCost - state.initialPayment) *
          ((state.interestRate *
            Math.pow(1 + state.interestRate, state.leaseTerm)) /
            (Math.pow(1 + state.interestRate, state.leaseTerm) - 1))
      );
      // Сумма договора лизинга
      state.leaseSum = Math.round(
        state.initialPayment + state.leaseTerm * state.monthlyPayment
      );

      // Отправка данных в хранилище
      store.commit("UPDATE_LEASE_SUM", state.leaseSum);
      store.commit("UPDATE_MONTHLY_PAYMENT", state.monthlyPayment);
      store.commit("SEND_VALIDATOR", v$);
    }

    return {
      v$,
      state,
      isDisabled,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/variables";
.calculator {
  margin-bottom: 50px;
  &__title {
    font-family: "nekst";
    font-weight: 900;
    font-size: 54px;
    line-height: 48.6px;
    max-width: 753px;
    margin-bottom: 32px;
    color: $black;

    @include breakpoint(xxl) {
      margin-bottom: 44px;
    }

    @include breakpoint(md) {
      margin-bottom: 32px;
      font-size: 34px;
      line-height: 31px;
    }
  }
}

.calculator-container {
  display: flex;
  justify-content: space-between;

  @include breakpoint(xxl) {
    flex-direction: column;
  }
}

.calculator-block {
  width: 100%;
  margin-right: 32px;

  &:nth-last-child(1) {
    margin-right: 0;
  }

  @include breakpoint(xxl) {
    margin-bottom: 32px;
    margin-right: 0;

    &:nth-last-child(1) {
      margin-bottom: 0;
    }
  }

  @include breakpoint(md) {
    margin-bottom: 25px;

    &:nth-last-child(1) {
      margin-bottom: 0;
    }
  }

  &--disabled {
    opacity: 0.5;
  }

  &__title {
    line-height: 20px;
    font-size: 16px;
    margin-bottom: 24px;

    @include breakpoint(md) {
      font-size: 14px;
      line-height: 19px;
      margin-bottom: 8px;
    }
  }

  &__group {
    display: flex;
    align-items: center;
    position: relative;
    background-color: $light-grey;
    border-radius: 16px;
  }

  &__input {
    font-family: "nekst";
    font-size: 30px;
    line-height: 36px;
    font-weight: 900;
    padding: 16px 0;
    padding-left: 24px;
    color: $dark-grey;
    border: 2px solid $light-grey;
    border-radius: 16px;
    transition: 0.3s ease;
    width: 100%;

    @include breakpoint(md) {
      color: $black;
      font-size: 22px;
      line-height: 20px;
    }

    &:focus {
      background-color: $white;
    }
  }

  &__range {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    margin: 0 24px;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    z-index: 1000;

    &::-webkit-slider-runnable-track {
      border-radius: 100%;
      height: 2px;
      border: none;
      background-color: $orange;
    }

    &::-webkit-slider-thumb {
      background: $orange;
      border: none;
      border-radius: 100%;
      cursor: pointer;
      width: 20px;
      height: 20px;
      -webkit-appearance: none;
      margin-top: -10px;
    }

    &::-moz-range-track {
      border-radius: 100%;
      border: none;
      height: 2px;
      background-color: $orange;
    }

    &::-moz-range-thumb {
      background: $orange;
      border: none;
      border-radius: 100%;
      cursor: pointer;
    }
  }

  &__span {
    position: absolute;
    right: 0;
    padding: 16px 0;
    padding-right: 24px;

    @include breakpoint(md) {
      color: $black;
    }

    &--percent {
      font-family: "nekst";
      font-weight: 900;
      font-size: 20px;
      line-height: 24px;
      padding: 0;
      margin: 7px 0;
      margin-right: 7px;
      background-color: $medium-grey;
      padding: 15px 17px;
      border-radius: 16px;

      @include breakpoint(md) {
        font-size: 22px;
        line-height: 20px;
      }
    }
  }
}
</style>
