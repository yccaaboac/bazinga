<template>
    <svg>
        <use :href="iconName" />
    </svg>
</template>

<script>
export default {
  name: 'SvgIcon',
  props: {
    iconClass: {
      type: String,
      required: true
    }
  },
  computed: {
    iconName() {
      return `#icon-${this.iconClass}`//#icon-message
    },
  }
}
</script>

<style scoped>

</style>
