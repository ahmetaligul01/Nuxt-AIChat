<template>
  <div class="sidebar">
    <div class="logo">
      <link rel="icon" type="image/x-icon" href="uiai.ico">
      <title>UI AI</title>
    </div>
    <ul class="menu">
      <li v-for="item in menuItems" :key="item.name" class="menu-item">
        <component :is="item.icon" class="icon" :class="{'dark-mode-icon': $colorMode.value === 'dark'}" />
        <a v-if="item.link" :href="item.link" class="menu-link">{{ item.name }}</a>
        <span v-else class="menu-link" @click="item.action">{{ item.name }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup>
import {ref, computed} from 'vue'
import HomeIcon from '~/assets/icons/Home.svg';
import UserIcon from '~/assets/icons/User.svg';
import SettingsIcon from '~/assets/icons/Settings.svg';
import MoonIcon from '~/assets/icons/moon.svg';
import SunIcon from '~/assets/icons/sun.svg';

const colorMode = useColorMode()

const toggleColorMode = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}

const themeIcon = computed(() => colorMode.value === 'dark' ? SunIcon : MoonIcon)
const themeName = computed(() => colorMode.value === 'dark' ? 'Light Theme' : 'Dark Theme')

const menuItems = ref([
  {name: "Home", link: "/", icon: HomeIcon},
  {name: "Profile", link: "/profile", icon: UserIcon},
  {name: "Settings", link: "/settings", icon: SettingsIcon},
  {
    name: themeName,
    icon: themeIcon,
    action: toggleColorMode
  },
])

</script>

<style scoped>
.sidebar {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 300px;
  background-color: var(--bg-secondary);
  padding: 40px;
  border-right: 1px solid var(--border-color);
  height: 100vh;
}

.logo {
  display: flex;
  justify-content: flex-start;
}

.logo-img {
  max-width: 100%;
  height: auto;
  width: 150px;
}

.menu {
  flex-grow: 1;
  margin-top: 20px;
}

.menu-item {
  display: flex;
  align-items: center;
  margin-bottom: 22px;
  cursor: pointer;
}

.icon {
  width: 34px;
  height: 28px;
  margin-right: 10px;
  fill: var(--text-secondary);
}

.menu-link {
  text-decoration: none;
  color: var(--text-secondary);
  font-size: 16px;
  font-weight: 500;
  transition: color 0.3s ease;
}

.menu-link:hover {
  color: var(--text-primary);
}

.profile {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.profile-pic {
  border-radius: 50%;
  width: 80px;
  height: 80px;
  object-fit: cover;
}

.profile-info {
  text-align: right;
  margin-top: 10px;
}

.profile-name {
  font-size: 18px;
  font-weight: bold;
  color: var(--text-primary);
}

.profile-email {
  font-size: 14px;
  color: var(--text-secondary);
}

.dark-mode .icon {
  fill: var(--text-primary);
}
</style>