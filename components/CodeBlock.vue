<template>
  <div class="code-block bg-custom-secondary rounded-lg p-4 my-4 relative">
    <div v-html="parsedContent"></div>
    <button @click="copyCode" class="copy-button absolute bottom-2 right-2 bg-button text-custom-primary p-2 rounded">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
        <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
import { Marked } from "marked";
import { markedHighlight } from "marked-highlight";
import hljs from "highlight.js";
import "highlight.js/styles/monokai-sublime.min.css";

const marked = new Marked(
    markedHighlight({
      langPrefix: "hljs language-",
      highlight(code: string) {
        return hljs.highlightAuto(code).value;
      },
    })
);

const props = defineProps({
  code: {
    type: String,
    required: true,
  },
});

const parsedContent = computed(() => {
  return marked.parse("```" + props.code + "```");
});

const copyCode = () => {
  navigator.clipboard.writeText(props.code).then(() => {
    alert('Kod panoya kopyalandı!');
  });
};
</script>

<style module scoped>
.code-block {
  overflow-x: auto;
}

.copy-button {
  opacity: 0.7;
  transition: opacity 0.3s;
}

.copy-button:hover {
  opacity: 1;
}

code {
  @apply rounded-lg my-2;
}
</style>