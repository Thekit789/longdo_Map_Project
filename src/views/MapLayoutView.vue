<script setup>
import { ref } from 'vue'
import NavMenu from '@/components/NavMenu.vue'
import DropdownMenu from '@/components/DropdownMenu.vue'
import { RouterView } from 'vue-router'
import { PanelLeftClose } from 'lucide-vue-next'
import { PanelRightClose } from 'lucide-vue-next'

const isSidebarOpen = ref(true) // เริ่มต้นให้ Sidebar เปิดอยู่

const selectedProvinceForMap = ref('') // ref ใหม่สำหรับเก็บค่าจังหวัดที่เลือกจาก DropdownMenu

// ฟังก์ชันสำหรับรับข้อมูลจาก DropdownMenu
const handleDropdownSelection = (selection) => {
  // เราสนใจแค่ province ตอนนี้
  selectedProvinceForMap.value = selection.province
}

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
}
</script>

<template>
  <div class="map-page-container">
    <aside class="map-sidebar" :class="{ closed: !isSidebarOpen }">
      <NavMenu />
      <DropdownMenu @update:province="handleDropdownSelection" />
    </aside>

    <button @click="toggleSidebar" class="toggle-button" :class="{ moved: !isSidebarOpen }">
      <span v-if="isSidebarOpen" class="arrow-icon"><PanelLeftClose /></span>
      <span v-else class="arrow-icon"><PanelRightClose /></span>
    </button>

    <main class="map-content" :class="{ expanded: !isSidebarOpen }">
      <RouterView :province="selectedProvinceForMap" />
    </main>
  </div>
</template>

<style scoped>
.map-page-container {
  display: flex;
  min-height: 100vh;
  width: 100%;
  box-sizing: border-box;
  overflow: hidden; /* ป้องกัน scrollbar จากการ transition */
  position: relative; /* ให้ปุ่ม toggle สามารถใช้ absolute positioning ได้ */
}

/* Base styles Sidebar */
.map-sidebar {
  width: 25%;
  background-color: #f0f0f0;
  padding: 1rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  transition:
    width 0.3s ease-in-out,
    padding 0.3s ease-in-out;
  overflow: hidden; /* ซ่อนเนื้อหาเมื่อย่อขนาด */
  flex-shrink: 0;
}

/* Style เมื่อ Sidebar ปิด */
.map-sidebar.closed {
  width: 0;
  padding: 0;
}

/* Base styles Content */
.map-content {
  width: 75%;
  background-color: #e8e8e8;
  box-sizing: border-box;
  transition: width 0.3s ease-in-out;
  flex-grow: 1;
}

/* Style เมื่อ Content ขยายเต็ม */
.map-content.expanded {
  width: 100%; /* ขยายเต็มเมื่อ Sidebar ปิด */
}

/* Style สำหรับปุ่มเปิด/ปิด Sidebar */
.toggle-button {
  position: absolute; /* ตำแหน่งปุ่มบน container หลัก */
  top: 5%;
  left: 25%;
  transform: translateY(-50%);
  padding: 0.4rem 0.3rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 0 5px 5px 0; /* ทำให้ขอบด้านซ้ายตรง และด้านขวามน */
  cursor: pointer;
  font-size: 1.2rem; /* ขนาด icon */
  transition:
    left 0.3s ease-in-out,
    background-color 0.2s ease-in-out,
    border-radius 0.3s ease-in-out;
  z-index: 100; /* ให้ปุ่มอยู่ด้านบนสุด */
  display: flex; /* เพื่อจัด icon ให้อยู่ตรงกลาง */
  align-items: center;
  justify-content: center;
  /* width: 1.5rem;
  height: 1.5rem; */
}

.toggle-button:hover {
  background-color: #0056b3;
}

/* Style เมื่อปุ่มถูกย้าย (Sidebar ปิด) */
.toggle-button.moved {
  left: 0; /* ย้ายไปติดขอบจอทางซ้ายสุด */
  border-radius: 0 5px 5px 0; /* ขอบยังคงมนด้านขวา */
}

/* Style สำหรับ icon (ลูกศร) */
.arrow-icon {
  display: inline-block;
  vertical-align: middle;
  line-height: 1; /* จัดให้ icon อยู่กลาง */
}
</style>
