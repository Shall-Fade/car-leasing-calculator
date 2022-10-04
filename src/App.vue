<template>
  <main class="wrapper">
    <div class="calculator-wrapper">
      <CalculatorView />
    </div>
  </main>
</template>

<script>
import CalculatorView from "./views/CalculatorView.vue";
export default {
  components: { CalculatorView },
};
</script>
