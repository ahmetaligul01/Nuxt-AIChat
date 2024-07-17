<template>
  <div class="app-container bg-custom-primary flex h-screen">
    <Sidebar />
    <div class="main-content flex flex-col flex-grow p-5">
      <div class="box bg-custom flex justify-between p-3 rounded-lg shadow-md">
        <button
            @click="resetAll"
            class="flex items-center bg-button text-custom-primary border border-custom text-sm rounded-md p-2 hover:border-custom-hover shadow-sm"
            >
          New chat <PencilSquareIcon class="w-4 h-8 ml-4" />
        </button>

        <ModelSelector v-model="selectedModel" />
      </div>
      <div class="grow overflow-y-auto mt-5 p-3 bg-custom rounded-lg shadow-md" id="chat-box">
        <div
            v-if="chatContext.length == 0"
            class="flex flex-col justify-center items-center min-h-full text-center"
        >
          <h1 class="font-bold text-2xl help-text mb-5">
            How can I help you today?
          </h1>
          <div class="grid grid-cols-3 gap-5">
            <div
                class="suggestion-box p-5 rounded-lg cursor-pointer hover:border-gray-600"
                v-for="item in helpTextList"
                @click="handleQuickPrompt(item)"
            >
              {{ item }}
            </div>
          </div>
        </div>
        <ul class="space-y-2" v-else>
          <li class="box" v-for="chat in chatContext" :key="chat.id">
            <div v-if="chat.role === 'user'" class="flex items-start space-x-3">
              <h1 class="font-bold relative">You</h1>
              <p class="bg-gray-100 p-2 rounded-lg shadow-md">{{ chat.content }}</p>
            </div>
            <div v-else>
              <h1 class="font-bold">AI</h1>
              <MarkdownRender :content="aiAnswer" />
              <div v-for="(block, index) in parseContent(chat.content)" :key="index">
                <CodeBlock v-if="block.type === 'code'" :code="block.content" />
                <p v-else>{{ block.content }}</p>
              </div>
            </div>
          </li>
          <li class="box" v-if="loadingAnswer || aiAnswer">
            <div v-if="loadingAnswer">
              <div class="flex">
                <h1 class="font-black">AI</h1>
                <span>
                  <svg
                      aria-hidden="true"
                      class="w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600 ml-2 mt-1"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                    />
                    <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                    />
                  </svg>
                </span>
              </div>
            </div>
            <div v-else v-if="aiAnswer">
              <h1 class="font-bold">AI</h1>
              <MarkdownRender :content="aiAnswer" />
            </div>
          </li>
        </ul>
      </div>
      <div class="p-5 bg-custom-secondary">
        <prompter v-model="prompt" @submit="handleSend" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useChatContext } from "./composables/useChatPrompt";
import type IChatContext from "./models/IChatContext";
import { PencilSquareIcon } from "@heroicons/vue/24/solid";
import Sidebar from '~/components/Sidebar.vue';
import MarkdownRender from '~/components/MarkdownRender.vue';
import CodeBlock from '~/components/CodeBlock.vue';

const colorMode = useColorMode();
const {
  chatContext,
  addChatContextItem,
  prompt,
  getContextToString,
  resetPrompt,
  aiAnswer,
  loadingAnswer,
  toggleLoading,
  resetAll,
  selectedModel,
} = useChatContext<IChatContext>();

const helpTextList = reactive([
  "implement http server with golang",
  "generate red button with tailwind css",
  "implement http request with javascript",
]);

const parseContent = (content) => {
  const blocks = [];
  const codeRegex = /```[\s\S]*?```/g;
  let lastIndex = 0;
  let match;

  while ((match = codeRegex.exec(content)) !== null) {
    if (match.index > lastIndex) {
      blocks.push({ type: 'text', content: content.slice(lastIndex, match.index) });
    }
    blocks.push({ type: 'code', content: match[0].replace(/```/g, '').trim() });
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < content.length) {
    blocks.push({ type: 'text', content: content.slice(lastIndex) });
  }

  return blocks;
};


const handleSend = () => {
  if (loadingAnswer.value) return;

  toggleLoading();

  addChatContextItem({
    role: "user",
    content: prompt.value,
  });

  fetch(`/api/chat?model=${selectedModel.value}`, {
    method: "post",
    body: getContextToString(),
  }).then((response) => {
    toggleLoading();
    resetPrompt();
    const reader = response.body?.getReader();

    return reader?.read().then(function read(result): any {
      if (result.done) {
        addChatContextItem({
          role: "assistant",
          content: aiAnswer.value,
        });

        return;
      }

      aiAnswer.value += new TextDecoder().decode(result.value);
      chatBoxScrollBottom();

      return reader.read().then(read);
    });
  });
};

const chatBoxScrollBottom = () => {
  const chatBox = document.getElementById("chat-box");
  if (chatBox) {
    chatBox.scrollTop = chatBox.scrollHeight;
  }
};

const handleQuickPrompt = (qprompt: string) => {
  prompt.value = qprompt;
  handleSend();
};
</script>

<style>
:root {
  --bg-primary: #ffffff;
  --bg-secondary: #f8f9fa;
  --text-primary: rgba(0,0,0,0.8);
  --text-secondary: #333333;
  --border-color: #e2e8f0;
  --button-bg: #f1f5f9;
  --button-hover: #e2e8f0;
}

:root.dark-mode {
  --bg-primary: #1a1b26;
  --bg-secondary: #24283b;
  --text-primary: #a9b1d6;
  --text-secondary: #9aa5ce;
  --border-color: #3b4261;
  --button-bg: #414868;
  --button-hover: #506186;
}

.text-custom-primary {
  color: var(--text-primary);
}

.text-custom-secondary {
  color: var(--text-secondary);
}

.bg-custom-primary {
  background-color: var(--bg-primary);
}

.bg-custom-secondary {
  background-color: var(--bg-secondary);
}

.help-text {
  color: #7aa2f7;
}

.suggestion-box {
  background-color: var(--bg-secondary);
  color: var(--text-primary);
  border: 1px solid var(--border-color);
}

body {
  background-color: var(--bg-primary);
  color: var(--text-primary);
  transition: background-color 0.3s ease, color 0.3s ease;
}

.app-container {
  display: flex;
  min-height: 100vh;
}

.main-content {
  background-color: var(--bg-primary);
}

.bg-custom {
  background-color: var(--bg-secondary);
}

.text-custom {
  color: var(--text-primary);
}

.border-custom {
  border-color: var(--border-color);
}

.bg-button {
  background-color: var(--button-bg);
}

.hover\:border-custom-hover:hover {
  border-color: var(--button-hover);
}

.code-box {
  background-color: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 0.375rem;
  padding: 1rem;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
  overflow-x: auto;
}

pre {
  margin: 0;
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-family: Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
  white-space: pre-wrap;
}

code {
  display: block;
  color: var(--text-primary);
}
</style>
