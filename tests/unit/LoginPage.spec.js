import { mount } from '@vue/test-utils'
import LoginPage from '../../src/views/LoginPage.vue'

describe('LoginPage.vue', () => {
    it('應該顯示登入標題', () => {
        const wrapper = mount(LoginPage)
        expect(wrapper.text()).toContain('登入')
    })