<template>
  <p class="error">
    <slot name="error"></slot>
  </p>
</template>

<style lang="scss" scoped>
@import "../../assets/variables";
.error {
  font-family: "nekst";
  font-size: 18px;
  color: $red;
  margin-top: 10px;

  @include breakpoint(md) {
    font-size: 14px;
  }
}
</style>
