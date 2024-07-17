<!--  SettingsModal.vue şuan kullanılmıyor, gerek kalmadı  -->
<template>
  <div class="modal-overlay" @click.self="closeModal">
    <div class="modal-content">
      <h2 class="modal-title">Theme</h2>
      <button class="close-button" @click="closeModal">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
          <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 1 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
        </svg>
      </button>

      <div class="container">
        <h3>Color mode: {{ colorMode.preference }}</h3>
        <div class="select-container">
          <div
              class="option"
              v-for="option in options"
              :key="option.value"
              @click="changeColorMode(option.value)"
              :class="{ active: colorMode.preference === option.value }"
          >
            <component :is="option.icon" class="icon" />
            <span>{{ option.label }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useColorMode } from '@vueuse/core';
import { defineEmits } from 'vue';
import MonitorIcon from '~/assets/icons/monitor.svg';
import SunIcon from '~/assets/icons/sun.svg';
import MoonIcon from '~/assets/icons/moon.svg';
import CoffeeIcon from '~/assets/icons/coffee.svg';

const colorMode = useColorMode();

const emit = defineEmits(['close']);

const closeModal = () => {
  emit('close');
};

const options = [
  { value: 'system', label: 'System', icon: MonitorIcon },
  { value: 'light', label: 'Light', icon: SunIcon },
  { value: 'dark', label: 'Dark', icon: MoonIcon },
  { value: 'sepia', label: 'Sepia', icon: CoffeeIcon }
];

const changeColorMode = (mode) => {
  // useColorMode().value ile temayı değiştiriyoruz
  colorMode.preference = mode;
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  width: 600px;
  max-width: 90%;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  position: relative;
}

.modal-title {
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
}

.close-button {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  cursor: pointer;
}

.container {
  text-align: left;
}

.color-mode-title {
  font-size: 1.2rem;
  margin-bottom: 1rem;
}

.select-container {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.option {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 8px;
  transition: background-color 0.3s ease;
}

.option:hover {
  background-color: #f0f0f0;
}

.icon {
  width: 24px;
  height: 24px;
}

.option.active {
  background-color: #e0e0e0;
}

.dark-mode-icon {
  filter: invert(1);
}
</style>
