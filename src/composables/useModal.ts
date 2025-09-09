import { reactive } from 'vue'

interface ModalConfig {
  title?: string
  message: string
  type?: 'success' | 'error' | 'warning' | 'info'
  duration?: number
  showCloseButton?: boolean
}

const modalState = reactive({
  isVisible: false,
  title: '',
  message: '',
  type: 'info' as 'success' | 'error' | 'warning' | 'info',
  showCloseButton: true
})

let closeTimer: number | null = null

export const useModal = () => {
  const showModal = (config: ModalConfig) => {
    // 清除之前的定时器
    if (closeTimer) {
      clearTimeout(closeTimer)
      closeTimer = null
    }

    modalState.isVisible = true
    modalState.title = config.title || ''
    modalState.message = config.message
    modalState.type = config.type || 'info'
    modalState.showCloseButton = config.showCloseButton !== false

    // 如果设置了持续时间，自动关闭
    if (config.duration && config.duration > 0) {
      closeTimer = setTimeout(() => {
        closeModal()
      }, config.duration)
    }
  }

  const closeModal = () => {
    modalState.isVisible = false
    if (closeTimer) {
      clearTimeout(closeTimer)
      closeTimer = null
    }
  }

  const showSuccess = (message: string, duration?: number) => {
    showModal({
      type: 'success',
      message,
      duration
    })
  }

  const showError = (message: string, duration?: number) => {
    showModal({
      type: 'error',
      message,
      duration
    })
  }

  const showWarning = (message: string, duration?: number) => {
    showModal({
      type: 'warning',
      message,
      duration
    })
  }

  const showInfo = (message: string, duration?: number) => {
    showModal({
      type: 'info',
      message,
      duration
    })
  }

  return {
    modalState,
    showModal,
    closeModal,
    showSuccess,
    showError,
    showWarning,
    showInfo
  }
}
