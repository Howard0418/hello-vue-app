<template>
    <button @click="addItem">Add item</button>
</template>

<script>
export default {
    name: 'App',
    data() {
        return {
            items: [],
        };
    },
    methods: {
        addItem() {
            this.items.push('test');
        },
    },
    watch: {
        items: {
            handler(newValue) {
                console.log(newValue);
            },
            deep: true, //要監聽陣列時，要設定才會起作用
        },
    },
};
</script>