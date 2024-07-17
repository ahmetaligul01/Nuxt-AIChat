<template>
  <div class="sidebar">
    <ul>
      <li v-for="item in menuItems" :key="item.name" class="menu-item">
        <img :src="item.icon" alt="" class="icon"/>
        <a :href="item.link" class="menu-link">{{ item.name }}</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Sidebar",
  data() {
    return {
      menuItems: [
        {name: "Home", link: "/", icon: "/icons/Home.svg"},
        {name: "Profile", link: "/profile", icon: "/icons/User.svg"},
        {name: "Settings", link: "/settings", icon: "/icons/Settings.svg"},
      ],
    };
  },
};
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
  margin-bottom: 22px; /* Alt boşluk ekledik */
}

.icon {
  width: 24px;
  height: 24px;
  margin-right: 10px; /* İkon ile metin arasına boşluk ekledik */
}

.menu-link {
  text-decoration: none;
  color: #333;
  font-size: 16px; /* Font boyutunu artırdık */
  font-weight: 500;
}

.menu-link:hover {
  color: #555;
}
</style>
