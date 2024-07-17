<template>
  <form class="relative" @submit.prevent="$emit('submit')">
    <div
        class="overflow-hidden h-24 rounded-lg shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600"
    >
      <label for="comment" class="sr-only">Message AI..</label>
      <textarea
          id="comment"
          class="block w-full h-full resize-none border-0 bg-transparent p-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
          placeholder="Message AI.."
          v-model="modelValue"
      />
    </div>

    <div class="absolute bottom-2 right-2">
      <button
          type="submit"
          class="flex items-center gap-x-2 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        <PaperAirplaneIcon class="h-5 w-5" />
        Send
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { PaperAirplaneIcon } from "@heroicons/vue/24/solid";

const modelValue = defineModel();

defineEmits(["submit"]);
</script>

<style scoped>
.sidebar {
  width: 200px;
  background-color: #f8f9fa;
  padding: 30px;
}

.sidebar ul {
  list-style: none;
  padding: 0;
}

.menu-item {
  display: flex;
  align-items: center;
  margin-bottom: 22px;
  cursor: pointer;
}

.icon {
  width: 24px;
  height: 24px;
  margin-right: 10px;
}

.menu-link {
  text-decoration: none;
  color: #333;
  font-size: 16px;
  font-weight: 500;
}

.menu-link:hover {
  color: #555;
}

form {
  margin-bottom: 0;
}
</style>
