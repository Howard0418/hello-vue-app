import { mount } from '@vue/test-utils'
import AboutPage from '@/views/AboutPage.vue'

describe('AboutPage.vue', () => {
    it('應該顯示關於標題', () => {
        const wrapper = mount(AboutPage)
        expect(wrapper.text()).toContain('看電影')
    })
})