<template>
    <input type="text" v-model="formData.name" />
    <br />

    <textarea v-model="formData.text" />
    <br />

    <select v-model="formData.selectValue">
        <option value="">select</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
    </select>
    <br />

    <input type="checkbox" v-model="formData.isCheck" /> is check
    <br />

    <input type="checkbox" value="0" v-model="formData.checkbox" /> 0
    <input type="checkbox" value="1" v-model="formData.checkbox" /> 1
    <input type="checkbox" value="2" v-model="formData.checkbox" /> 2
    <input type="checkbox" value="3" v-model="formData.checkbox" /> 3
    <br />

    <input type="radio" value="0" v-model="formData.radio" /> 0
    <input type="radio" value="1" v-model="formData.radio" /> 1
    <input type="radio" value="2" v-model="formData.radio" /> 2
    <input type="radio" value="3" v-model="formData.radio" /> 3

    <br />
    {{ count }}
    <button @click="addCount">Add Count</button>
    <br />
    <button @click="submit">送出</button>
    <hr />

    {{ formData }}
</template>

<script>
export default {
    name: 'App',
    data() {
        return {
            formData: {
                name: '',
                text: '',
                selectValue: '',
                isCheck: false,
                checkbox: [],
                radio: '',
            },
            count: 0,
        };
    },
    methods: {
        submit() {
            console.log(this.formData);
        },
        addCount() {
            this.count += 1;
            console.log(this.count);
        },
    },
};
</script>