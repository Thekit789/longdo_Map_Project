<script setup>
import { ref, watchEffect } from 'vue'
import provinceCode from '../data/map_coordinates.js'

const props = defineProps({
  province: {
    type: String,
    default: '',
  },
})

const map = ref(null)
const longdo = ref(null)

const specificMarkerLocations = ref([
  // ... (โค้ดหมุดของคุณ)
])

const onMapLoaded = (loadedMapObject) => {
  if (loadedMapObject && window.longdo) {
    map.value = loadedMapObject
    longdo.value = window.longdo
    console.log('Longdo Map and API are ready!')

    if (map.value && map.value.Ui) {
      map.value.Ui.Scale.visible(true)
      map.value.Ui.Toolbar.visible(false)
    }

    // เพิ่ม Marker เมื่อ Map โหลดเสร็จครั้งแรก
    specificMarkerLocations.value.forEach((data, index) => {
      let markerOptions = {
        title: data.title || `หมุด ${index + 1}`,
        detail: data.detail || `พิกัด: ${data.lat.toFixed(4)}, ${data.lon.toFixed(4)}`,
        visibleRange: { min: 10, max: 20 },
      }

      try {
        let marker = new longdo.value.Marker({ lon: data.lon, lat: data.lat }, markerOptions)
        map.value.Overlays.add(marker)
      } catch (error) {
        console.error(`Error creating marker ${index + 1}:`, error)
      }
    })
  } else {
    console.error(
      'Failed to initialize map instance. loadedMapObject or window.longdo is missing.',
      loadedMapObject,
      window.longdo,
    )
  }
}

// --- ฟังก์ชันสำหรับจัดการการโหลด Overlay จังหวัด ---
const loadProvinceOverlay = (provinceName) => {
  if (!map.value || !longdo.value) {
    console.log('Map or Longdo API not ready for overlay loading.')
    return
  }

  // --- ขั้นตอนสำคัญ: ลบ Overlay 'IG' ทั้งหมดที่มีอยู่ก่อน ---
  const allOverlays = map.value.Overlays.list() // ดึง Overlay ทั้งหมดบนแผนที่
  const igOverlaysToRemove = allOverlays.filter((overlay) => overlay.type === 'IG') // กรองเฉพาะ Overlay ที่มี type เป็น 'IG'

  igOverlaysToRemove.forEach((overlay) => {
    map.value.Overlays.remove(overlay)
    console.log('Removed an existing IG overlay:', overlay)
  })
  // --------------------------------------------------------

  if (provinceName) {
    const provinceId = provinceCode.find((province) => province.name === provinceName)

    if (provinceId) {
      // ใช้โค้ดที่คุณยืนยันว่าทำงานได้
      const object4 = new longdo.value.Overlays.Object(provinceId.code, 'IG', {
        combine: true,
        simplify: 0.00005,
        ignorefragment: false,
        lineColor: '#ff0202',
        fillColor: 'rgba(255, 0, 0, 0.1)',
        lineWidth: 2,
      })

      if (object4) {
        // ตรวจสอบอีกครั้งว่า object4 ไม่ใช่ null
        map.value.Overlays.load(object4)
        map.value.bound({
          minLat: provinceId.minLat,
          minLon: provinceId.minLon,
          maxLat: provinceId.maxLat,
          maxLon: provinceId.maxLon,
        })
        map.value.zoom(provinceId.zoom, true)
      } else {
        console.warn(
          `longdo.value.Overlays.Object returned null/undefined for province ID: ${provinceId}. This is unexpected.`,
        )
      }
    } else {
      console.warn(`No province ID found for: ${provinceName}. Please check map_coordinates.js.`)
    }
  } else {
    console.log('No province selected, no overlay to load.')
  }
}

// --- Watcher สำหรับ props.province ---
watchEffect(() => {
  const currentProvince = props.province
  const mapInstance = map.value
  const longdoApi = longdo.value

  // เงื่อนไขหลัก: ต้องมี province, map และ longdo API พร้อม
  if (currentProvince && mapInstance && longdoApi) {
    loadProvinceOverlay(currentProvince) // เรียกใช้ฟังก์ชันที่จัดการการลบและเพิ่ม Overlay
  } else {
    console.log('watchEffect: Waiting for province, map, or Longdo API to be ready.')

    if (mapInstance && longdoApi) {
      const allOverlays = mapInstance.Overlays.list()
      const igOverlaysToRemove = allOverlays.filter((overlay) => overlay.type === 'IG')
      igOverlaysToRemove.forEach((overlay) => {
        mapInstance.Overlays.remove(overlay)
        console.log('Removed an existing IG overlay during watchEffect wait.')
      })
    }
  }
})
</script>

<template>
  <div class="map-wrapper-with-marker">
    <p>Demo Longdo Map with Pin Map</p>
    <longdo-map class="map-container-marker" @load="onMapLoaded" />
  </div>
</template>

<style scoped>
p {
  /* color: var(--color-text); */
  color: rgb(92, 83, 83);
  font-weight: 700;
  font-size: 2em;
  margin-bottom: 1rem;
  text-align: center;
}

.map-wrapper-with-marker {
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.map-container-marker {
  width: 100%;
  max-width: 1000px;
  height: 85vh;
  min-height: 450px;
  border: 2px solid #e0e0e0;
  background-color: #e0e0e0;
  margin-bottom: 15px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

:global(.ldmap_popup.ldmap_selectable) {
  color: #6b6a69;
  font-weight: 900;
}

:global(.ldmap_popup_title) {
  color: #6b6a69;
  font-weight: 900;
}

:global(.ldmap_popup_detail) {
  color: #6b6a69;
  font-weight: 900;
}

:global(.ldmap_tooltip) {
  color: #6b6a69;
  font-weight: 900;
}

:global(.ldmap_item.ldmap_button) {
  color: #6b6a69;
  font-weight: 900;
}

:global(.ldmap_dropdown_head span) {
  color: #6b6a69;
  font-weight: 900 !important;
}

:global(.ldmap_dropdown_body) {
  color: #6b6a69;
  font-weight: 900 !important;
}
</style>
