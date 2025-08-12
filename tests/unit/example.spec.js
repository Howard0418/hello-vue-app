import { shallowMount } from '@vue/test-utils'
import HelloWorld from '@/views/HelloWorldPage.vue'

describe('HelloWorldPage.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'Hello World'
    const wrapper = shallowMount(HelloWorld, {
      props: { msg }
    })
    expect(wrapper.text()).toMatch(msg)
  })
})
