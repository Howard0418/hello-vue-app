<template>
    {{ name }}
    {{ count }}
    <button @click="myFunction(), changeName()">button</button>
</template>

<script>
export default {
    name: 'App',
    data() {
        return {
            count: 0,
            name: 'Jake',
        };
    },
    methods: {
        myFunction() {
            this.count += 1;
        },
        changeName() {
            this.name = 'Allan';
        },
    },
};
</script>