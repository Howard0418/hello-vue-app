<template>
  <p v-show="isShow">Hello World</p>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      isShow: true,
    };
  },
};
</script>