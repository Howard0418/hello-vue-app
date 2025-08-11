<template>
    <p v-for="(user, index) in users2" :key="user.email">
        {{ index }} {{ user.name }} {{ user.email }}
    </p>
</template>

<script>
export default {
    name: 'App',
    data() {
        return {
            users2: [
                { name: 'Jake', email: 'jake@gmail.com' },
                { name: 'Allan', email: 'allan@gmail.com' },
                { name: 'Eason', email: 'eason@gmail.com' },
            ],
        };
    },
};
</script>