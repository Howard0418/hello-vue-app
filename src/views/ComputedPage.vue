<template>
    <div v-for="data in checkDatas" :key="data.id">
        {{ data.id }} {{ data.name }}
    </div>
</template>

<script>
export default {
    name: 'App',
    data() {
        return {
            datas: [
                { id: 1, name: 'Jake' },
                { id: 2, name: 'Allan' },
                { id: 1, name: 'Eason' },
            ],
        };
    },
    computed: {
        checkDatas() {
            return this.datas.filter((data) => data.id === 1);
        },
    },
};
</script>