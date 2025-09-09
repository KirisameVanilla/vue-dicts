<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="modalState.isVisible"
        class="z-50 fixed inset-0 flex justify-center items-center bg-transparent bg-opacity-50"
        @click="handleBackdropClick"
      >
        <div
          class="bg-white shadow-xl mx-4 rounded-lg w-full max-w-md transition-all transform"
          @click.stop
        >
          <!-- Header -->
          <div class="flex justify-between items-center p-6 border-gray-200 border-b">
            <h3 class="font-semibold text-gray-900 text-lg">
              {{ modalState.title || getDefaultTitle() }}
            </h3>
            <button
              v-if="modalState.showCloseButton"
              @click="closeModal"
              class="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- Body -->
          <div class="p-6">
            <div class="flex items-start space-x-3">
              <!-- Icon -->
              <div class="flex-shrink-0">
                <div
                  :class="[
                    'w-8 h-8 rounded-full flex items-center justify-center',
                    {
                      'bg-green-100 text-green-600': modalState.type === 'success',
                      'bg-red-100 text-red-600': modalState.type === 'error',
                      'bg-yellow-100 text-yellow-600': modalState.type === 'warning',
                      'bg-blue-100 text-blue-600': modalState.type === 'info'
                    }
                  ]"
                >
                  <!-- Success Icon -->
                  <svg
                    v-if="modalState.type === 'success'"
                    class="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  
                  <!-- Error Icon -->
                  <svg
                    v-else-if="modalState.type === 'error'"
                    class="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  
                  <!-- Warning Icon -->
                  <svg
                    v-else-if="modalState.type === 'warning'"
                    class="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.664-.833-2.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                  
                  <!-- Info Icon -->
                  <svg
                    v-else
                    class="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>

              <!-- Message -->
              <div class="flex-1 min-w-0">
                <p class="text-gray-600 text-sm">
                  {{ modalState.message }}
                </p>
              </div>
            </div>
          </div>

          <!-- Footer -->
          <div class="flex justify-end bg-gray-50 px-6 py-3 rounded-b-lg">
            <button
              @click="closeModal"
              class="bg-white hover:bg-gray-50 shadow-sm px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-medium text-gray-700 text-sm"
            >
              确定
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { useModal } from '../composables/useModal'

const { modalState, closeModal } = useModal()

const getDefaultTitle = () => {
  switch (modalState.type) {
    case 'success':
      return '成功'
    case 'error':
      return '错误'
    case 'warning':
      return '警告'
    case 'info':
    default:
      return '提示'
  }
}

const handleBackdropClick = () => {
  if (modalState.showCloseButton) {
    closeModal()
  }
}
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .bg-white,
.modal-leave-active .bg-white {
  transition: all 0.3s ease;
}

.modal-enter-from .bg-white,
.modal-leave-to .bg-white {
  transform: scale(0.9) translateY(-10px);
}
</style>
