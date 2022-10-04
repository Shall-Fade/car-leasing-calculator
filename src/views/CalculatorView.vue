<template>
  <div>
    <CalculatorViewInput />
    <CalculatorViewResult />
  </div>
</template>

<script>
import CalculatorViewInput from "../components/calculator/CalculatorViewInput.vue";
import CalculatorViewResult from "../components/calculator/CalculatorViewResult.vue";

export default {
  components: {
    CalculatorViewInput,
    CalculatorViewResult,
  },
};
</script>
