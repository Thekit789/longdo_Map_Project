<script setup>
import { ref } from 'vue'
import NavMenu from '@/components/NavMenu.vue'
import DropdownMenu from '@/components/DropdownMenu.vue'
import { RouterView } from 'vue-router'

const isSidebarOpen = ref(true) // เริ่มต้นให้ Sidebar เปิดอยู่

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
}

// ไม่ต้องใช้ containerClasses แล้ว เนื่องจากเราจะจัดการปุ่มแยกต่างหาก
</script>

<template>
  <div class="map-page-container">
    <aside class="map-sidebar" :class="{ closed: !isSidebarOpen }">
      <NavMenu />
      <DropdownMenu />
    </aside>

    <button @click="toggleSidebar" class="toggle-button" :class="{ moved: !isSidebarOpen }">
      <span v-if="isSidebarOpen" class="arrow-icon">&lt;</span>
      <span v-else class="arrow-icon">&gt;</span>
    </button>

    <main class="map-content" :class="{ expanded: !isSidebarOpen }">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.map-page-container {
  display: flex;
  min-height: 100vh;
  width: 100%;
  box-sizing: border-box;
  overflow: hidden; /* ป้องกัน scrollbar ไม่พึงประสงค์จากการ transition */
  position: relative; /* สำคัญ: เพื่อให้ปุ่ม toggle สามารถใช้ absolute positioning ได้ */
}

/* Base styles สำหรับ Sidebar */
.map-sidebar {
  width: 30%; /* ความกว้างเริ่มต้นเมื่อเปิด */
  background-color: #f0f0f0;
  padding: 1rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  transition:
    width 0.3s ease-in-out,
    padding 0.3s ease-in-out; /* เพิ่ม transition */
  overflow: hidden; /* ซ่อนเนื้อหาเมื่อย่อขนาด */
  flex-shrink: 0; /* ป้องกันไม่ให้ sidebar หดตัวเมื่อพื้นที่ไม่พอ */
}

/* Style เมื่อ Sidebar ปิด */
.map-sidebar.closed {
  width: 0; /* Sidebar หดเหลือ 0 */
  padding: 0; /* ลบ padding เมื่อปิด */
  /* อาจจะใช้ transform: translateX(-100%); แทน width: 0; หากต้องการให้มันเลื่อนออกไปจริงๆ */
}

/* Base styles สำหรับ Content */
.map-content {
  width: 70%; /* ความกว้างเริ่มต้นเมื่อ Sidebar เปิด */
  background-color: #e8e8e8;
  box-sizing: border-box;
  transition: width 0.3s ease-in-out; /* เพิ่ม transition */
  flex-grow: 1; /* ให้ content ขยายเต็มพื้นที่ที่เหลือ */
}

/* Style เมื่อ Content ขยายเต็ม */
.map-content.expanded {
  width: 100%; /* ขยายเต็มเมื่อ Sidebar ปิด */
}

/* Style สำหรับปุ่มเปิด/ปิด Sidebar */
.toggle-button {
  position: absolute; /* วางตำแหน่งปุ่มบน container หลัก */
  top: 5%; /* เริ่มต้นที่กลางแนวตั้ง */
  left: 30%; /* อยู่ที่ขอบขวาของ sidebar (30%) */
  transform: translateY(-50%); /* ปรับให้อยู่กึ่งกลางจริงๆ */
  padding: 0.5rem 0.5rem; /* ลดขนาดปุ่ม */
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
  width: 1.5rem; /* กำหนดความกว้างของปุ่มให้เป็นสี่เหลี่ยมจัตุรัสเล็กๆ */
  height: 3rem; /* เพิ่มความสูงเพื่อให้จับง่าย */
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

/* คุณสามารถใช้ SVG หรือ icon font แทนก็ได้ */
/* ตัวอย่างถ้าใช้ FontAwesome */
/*
.arrow-icon::before {
    font-family: "Font Awesome 5 Free";
    font-weight: 900;
    content: "\f053"; // chevron-left
}
.toggle-button.moved .arrow-icon::before {
    content: "\f054"; // chevron-right
}
*/
</style>
