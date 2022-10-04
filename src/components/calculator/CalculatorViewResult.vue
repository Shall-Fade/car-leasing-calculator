<template>
  <div class="calculator-result">
    <!-- Сумма договора лизинга -->
    <div class="calculator-result-block">
      <h5 class="calculator-result-block__title">Сумма договора лизинга</h5>
      <p class="calculator-result-block__text">{{ fixedLeaseSum }}</p>
    </div>
    <!-- Ежемесячный платеж от -->
    <div class="calculator-result-block">
      <h5 class="calculator-result-block__title">Ежемесячный платеж от</h5>
      <p class="calculator-result-block__text">{{ fixedMonthlyPayment }}</p>
    </div>
    <button
      :disabled="isDisabled"
      @click="sendRequest"
      class="calculator-result__btn"
    >
      <!-- Прелоадер -->
      <img
        v-if="isDisabled"
        :class="{ 'calculator-result__btn--preloader': isDisabled }"
        src="../../assets/images/preloader.png"
        alt="Preloader"
      />
      <p v-else>Оставить заявку</p>
    </button>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { ref, computed, onMounted, watch } from "vue";

export default {
  setup() {
    // Переменные
    const store = useStore();
    const isDisabled = ref(false);
    const leaseSum = computed(() => store.state.leaseSum);
    const monthlyPayment = computed(() => store.state.monthlyPayment);
    // Исправленные числа (добавлены пробелы между тысячными)
    const fixedLeaseSum = ref();
    const fixedMonthlyPayment = ref();

    onMounted(() => {
      fixNumbers();
    });

    // Наблюдатели
    watch(
      () => leaseSum.value,
      () => {
        fixNumbers();
      }
    );

    watch(
      () => monthlyPayment.value,
      () => {
        fixNumbers();
      }
    );

    // Добавление пробелов между тысячными
    function fixNumbers() {
      fixedLeaseSum.value = leaseSum.value.toLocaleString("ru-RU");
      fixedMonthlyPayment.value = monthlyPayment.value.toLocaleString("ru-RU");
    }

    // Отправка запроса на сервер
    function sendRequest() {
      // Отключение инпутов и кнопки
      isDisabled.value = true;
      store.commit("TOGGLE_BUTTON", isDisabled);

      setTimeout(() => {
        var xhr = new XMLHttpRequest();

        xhr.open("POST", "https://hookb.in/eK160jgYJ6UlaRPldJ1P", false);

        xhr.send([
          {
            total_sum: leaseSum.value,
            monthly_payment_from: monthlyPayment.value,
          },
        ]);

        if (xhr.status != 200) {
          alert(xhr.status + ": " + xhr.statusText);
        } else {
          alert(xhr.responseText);

          isDisabled.value = false;
          store.commit("TOGGLE_BUTTON", isDisabled);
        }
      }, 2000);
    }

    return {
      leaseSum,
      monthlyPayment,
      fixedLeaseSum,
      fixedMonthlyPayment,
      isDisabled,
      sendRequest,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/variables";
.calculator-result {
  display: flex;
  justify-content: space-between;

  @include breakpoint(xxl) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }

  @include breakpoint(md) {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
  }

  &__btn {
    color: $white;
    font-family: "nekst";
    font-weight: 900;
    font-size: 30px;
    line-height: 36px;
    padding: 16px 92px;
    background-color: $orange;
    border-radius: 40px;
    transition: 0.3s ease;

    @include breakpoint(xxl) {
      padding: 16px 48px;
      margin-top: 44px;
    }

    @include breakpoint(md) {
      margin-top: 0;
      font-size: 22px;
      line-height: 20px;
    }

    &--preloader {
      animation: 1s linear rot infinite;
    }

    @keyframes rot {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }

    &:disabled {
      background-color: $orange;
      opacity: 0.5;
    }

    &:active {
      background-color: $dark-grey;
    }

    &:hover {
      color: $white;
      background-color: $black;
    }
  }
}
.calculator-result-block {
  @include breakpoint(md) {
    margin-bottom: 30px;
  }

  &__title {
    line-height: 20px;
    font-size: 16px;
    margin-bottom: 8px;

    @include breakpoint(xxl) {
      color: $black;
    }

    @include breakpoint(md) {
      font-size: 14px;
      line-height: 19px;
      margin-bottom: 2px;
    }
  }

  &__text {
    color: $dark-grey;
    font-family: "nekst";
    font-weight: 900;
    font-size: 54px;
    line-height: 48px;

    @include breakpoint(xxl) {
      color: $black;
    }

    @include breakpoint(md) {
      font-size: 22px;
      line-height: 20px;
    }
  }
}
</style>
