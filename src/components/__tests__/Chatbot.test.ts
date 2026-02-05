import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import Chatbot from '../Chatbot.vue'
import { useChatbot } from '../../composables/useChatbot'

vi.mock('../../composables/useChatbot', () => ({
  useChatbot: vi.fn(() => ({
    chatMessages: [],
    isTyping: false,
    isOpen: false,
    error: null,
    toggleChatbot: vi.fn(),
    sendMessage: vi.fn(),
  })),
}))

describe('Chatbot.vue', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders minimized chatbot when closed', () => {
    const wrapper = mount(Chatbot)
    expect(wrapper.find('#chatbot_minimize').exists()).toBe(true)
    expect(wrapper.find('#chatbot_minimize').text()).toContain('CHATTA CON PRIMOBOT')
  })

  it('renders chatbot when open', () => {
    const mockUseChatbot = useChatbot as ReturnType<typeof vi.fn>
    mockUseChatbot.mockReturnValue({
      chatMessages: [],
      isTyping: false,
      isOpen: true,
      error: null,
      toggleChatbot: vi.fn(),
      sendMessage: vi.fn(),
    })

    const wrapper = mount(Chatbot)
    expect(wrapper.find('#chatbot').exists()).toBe(true)
    expect(wrapper.find('#chatbot_header').text()).toContain('PrimoBot')
  })
})
