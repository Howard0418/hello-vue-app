<template>
    {{ myFunction(100) }}
</template>

<script>
export default {
    name: 'App',
    data() {
        return {
            x: 100,
            y: 2,
        };
    },
    methods: {
        myFunction: function (value) {
            return this.x * this.y + value;
        },
    },
};
</script>