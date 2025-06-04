<script setup>
import { ref, watchEffect } from 'vue'
import provinceCode from '@/data/Map_Coordinates.js'
import branchDatail from '@/data/Map_Branch_Detail.js'

const props = defineProps({
  province: {
    type: String,
    default: '',
  },
  branch: {
    type: String,
    default: '',
  },
})

const map = ref(null)
const longdo = ref(null)

// Ref สำหรับเก็บ Marker ที่เพิ่มเข้ามา (ถ้าจะเพิ่ม Marker)
const branchMarker = ref(null)

const onMapLoaded = (loadedMapObject) => {
  if (loadedMapObject && window.longdo) {
    map.value = loadedMapObject
    longdo.value = window.longdo
    console.log('Longdo Map and API are ready!')

    if (map.value && map.value.Ui) {
      map.value.Ui.Scale.visible(true)
      map.value.Ui.Toolbar.visible(false)
    }

    // เมื่อ Map โหลดเสร็จครั้งแรก ให้เรียก watchEffect เพื่อโหลด Overlay/ปรับแผนที่
    // (watchEffect จะถูกเรียกเมื่อ dependencies เปลี่ยนแปลง หรือเมื่อ component ถูก mount ครั้งแรก)
    // ดังนั้นไม่จำเป็นต้องเรียก loadProvinceOverlay ตรงๆ ที่นี่อีก
  } else {
    console.error(
      'Failed to initialize map instance. loadedMapObject or window.longdo is missing.',
      loadedMapObject,
      window.longdo,
    )
  }
}

// --- ฟังก์ชันสำหรับจัดการการโหลด Overlay จังหวัดและโฟกัสสาขา ---
// **สำคัญ: เพิ่ม currentBranch เป็น parameter**
const loadProvinceOverlay = (provinceName, branchName) => {
  if (!map.value || !longdo.value) {
    console.log('Map or Longdo API not ready for overlay loading.')
    return
  }

  // --- ลบ Overlay 'IG' ทั้งหมดที่มีอยู่ก่อน ---
  map.value.Overlays.list().forEach((overlay) => {
    if (overlay.type === 'IG') {
      map.value.Overlays.remove(overlay)
      console.log('Removed an existing IG overlay:', overlay)
    }
  })
  // --- ลบ Marker สาขาเก่าออก หากมี ---
  if (branchMarker.value) {
    map.value.Overlays.remove(branchMarker.value)
    branchMarker.value = null // รีเซ็ต ref
    console.log('Removed existing branch marker.')
  }

  // --------------------------------------------------------

  if (provinceName) {
    const foundProvinceData = provinceCode.find((province) => province.name === provinceName)

    if (foundProvinceData) {
      // 1. โหลด Overlay ของจังหวัด
      const provinceOverlay = new longdo.value.Overlays.Object(foundProvinceData.code, 'IG', {
        combine: true,
        simplify: 0.00005,
        ignorefragment: false,
        lineColor: '#ff0202',
        fillColor: 'rgba(255, 0, 0, 0.1)',
        lineWidth: 2,
      })

      if (provinceOverlay) {
        map.value.Overlays.load(provinceOverlay)
        console.log(`Loaded province overlay for: ${provinceName}`)
      } else {
        console.warn(
          `longdo.value.Overlays.Object returned null/undefined for province ID: ${foundProvinceData.code}. This is unexpected.`,
        )
      }

      // 2. ตรวจสอบว่ามีการเลือกสาขาหรือไม่ และโฟกัสแผนที่
      if (branchName && foundProvinceData.branch && foundProvinceData.branch.length > 0) {
        const foundBranchData = foundProvinceData.branch.find((b) => b.branchName === branchName)
        const details = branchDatail.find((b) => b.name === branchName) || {}
        if (foundBranchData) {
          // โฟกัสไปที่สาขาที่เลือก
          map.value.bound({
            minLat: foundBranchData.minLat,
            minLon: foundBranchData.minLon,
            maxLat: foundBranchData.maxLat,
            maxLon: foundBranchData.maxLon,
          })
          map.value.zoom(foundBranchData.zoom, true)

          // สร้างและเพิ่ม Marker สำหรับสาขา (ถ้าต้องการ)
          // สามารถกำหนด icon หรือ detail เพิ่มเติมได้
          const markerOptions = {
            title: foundBranchData.branchName,
            detail: details.branchDetail
              ? details.branchDetail
              : `Lat: ${foundBranchData.lat.toFixed(4)}, Lon: ${foundBranchData.lon.toFixed(4)}`,
          }
          const marker = new longdo.value.Marker(
            { lon: foundBranchData.lon, lat: foundBranchData.lat },
            markerOptions,
          )
          map.value.Overlays.add(marker)
          branchMarker.value = marker // เก็บ reference ไว้เพื่อลบทีหลัง

          console.log(`Focused on branch: ${foundBranchData.branchName} in ${provinceName}`)
        } else {
          console.warn(
            `No branch data found for: ${branchName} in ${provinceName}. Falling back to province view.`,
          )
          // ถ้าไม่พบสาขาที่ระบุ ให้โฟกัสไปที่จังหวัดแทน
          map.value.bound({
            minLat: foundProvinceData.minLat,
            minLon: foundProvinceData.minLon,
            maxLat: foundProvinceData.maxLat,
            maxLon: foundProvinceData.maxLon,
          })
          map.value.zoom(foundProvinceData.zoom, true)
        }
      } else {
        // ไม่มีสาขาที่ถูกเลือก หรือจังหวัดไม่มีข้อมูลสาขาเลย
        // โฟกัสไปที่จังหวัด
        map.value.bound({
          minLat: foundProvinceData.minLat,
          minLon: foundProvinceData.minLon,
          maxLat: foundProvinceData.maxLat,
          maxLon: foundProvinceData.maxLon,
        })
        map.value.zoom(foundProvinceData.zoom, true)
        console.log(`Focused on province: ${provinceName} (no specific branch selected).`)
      }
    } else {
      console.warn(`No province data found for: ${provinceName}. Please check map_coordinates.js.`)
      // ถ้าไม่พบข้อมูลจังหวัดเลย อาจจะซูมไปที่ Default view
      // map.value.zoom(6, true);
    }
  } else {
    console.log('No province selected, no overlay to load.')
    // เมื่อไม่มีจังหวัดถูกเลือก อาจจะลบ Overlay ทั้งหมดและซูมกลับไปที่ Default view
    // map.value.Overlays.clear(); // ลบ Overlay ทั้งหมด
    // map.value.zoom(6, true); // ซูมกลับไปที่ระดับประเทศ
  }
}

// --- Watcher สำหรับ props.province และ props.branch ---
watchEffect(() => {
  const currentProvince = props.province
  const currentBranch = props.branch
  const mapInstance = map.value
  const longdoApi = longdo.value

  // เงื่อนไข: ต้องมี mapInstance และ longdoApi พร้อมก่อน
  // และต้องมีการเลือก province หรือ branch ถึงจะทำการโหลด/อัปเดตแผนที่
  if (mapInstance && longdoApi) {
    if (currentProvince || currentBranch) {
      loadProvinceOverlay(currentProvince, currentBranch) // เรียกใช้ฟังก์ชันที่จัดการการลบและเพิ่ม Overlay
    } else {
      // กรณีที่ไม่มีทั้ง province และ branch เลือก (อาจจะเป็นค่าเริ่มต้น)
      console.log('watchEffect: No province or branch selected. Clearing overlays if any.')
      // ลบ Overlay 'IG' ทั้งหมดเมื่อไม่มีการเลือกจังหวัด/สาขา
      mapInstance.Overlays.list().forEach((overlay) => {
        if (overlay.type === 'IG') {
          mapInstance.Overlays.remove(overlay)
          console.log('Removed an existing IG overlay due to no selection:', overlay)
        }
      })
      // ลบ Marker สาขาเก่าออก
      if (branchMarker.value) {
        mapInstance.Overlays.remove(branchMarker.value)
        branchMarker.value = null
        console.log('Removed existing branch marker due to no selection.')
      }
      // ซูมกลับไปที่มุมมองเริ่มต้น เช่น ทั่วประเทศ
      mapInstance.zoom(6, true) // หรือค่า zoom เริ่มต้นที่เหมาะสม
    }
  } else {
    console.log('watchEffect: Waiting for map instance and Longdo API to be ready.')
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
