<script setup>
import { ref } from 'vue'
// import myMarkerIcon from '../assets/map-pin.svg'

// Reference to the map instance
const map = ref(null)
// Reference to the Longdo API global object
const longdo = ref(null)

// --- กำหนดพิกัดสำหรับหมุด ---
const specificMarkerLocations = ref([
  {
    lon: 100.342469,
    lat: 14.868726,
    title: 'ตำบลสิงห์',
    detail: 'หมู่ที่ 1<br>ประชากร 1,200 คน<br>จำนวนลูกค้า 300 คน',
  },
  {
    lon: 100.326221,
    lat: 14.876731,
    title: 'ตำบลสิงห์',
    detail: 'หมู่ที่ 2',
  },
  {
    lon: 100.318586,
    lat: 14.889851,
    title: 'ตำบลสิงห์',
    detail: 'หมู่ที่ 3',
  },
  {
    lon: 100.316957,
    lat: 14.891523,
    title: 'ตำบลสิงห์',
    detail: 'หมู่ที่ 4',
  },
  {
    lon: 100.312948,
    lat: 14.893606,
    title: 'ตำบลสิงห์',
    detail: 'หมู่ที่ 5',
  },
  {
    lon: 100.3094432,
    lat: 14.89888741,
    title: 'ตำบลสิงห์',
    detail: 'หมู่ที่ 6',
  },
  {
    lon: 100.3367025,
    lat: 14.91033872,
    title: 'ตำบลสิงห์',
    detail: 'หมู่ที่ 7',
  },
  {
    lon: 100.3669725,
    lat: 14.87092789,
    title: 'ตำบลสิงห์',
    detail: 'หมู่ที่ 8',
  },
  {
    lon: 100.337745116793,
    lat: 14.8998167262144,
    title: 'ตำบลสิงห์',
    detail: 'หมู่ที่ 9',
  },
])

// Function to be called when the map is loaded
const onMapLoaded = (loadedMapObject) => {
  if (loadedMapObject && window.longdo) {
    map.value = loadedMapObject // กำหนด map.value ด้วย loadedMapObject โดยตรง
    longdo.value = window.longdo // ดึง Longdo API object จาก global scope (window)

    // addCustomOverlay()
    const object4 = new longdo.value.Overlays.Object('170201;170206', 'IG', {
      combine: true,
      simplify: 0.00005,
      ignorefragment: false,
      lineColor: '#ff0202', //สีของเส้น
      fillColor: null, //สีพื้นหลัง
    })
    map.value.Overlays.load(object4)

    if (map.value && map.value.Ui) {
      map.value.Ui.Scale.visible(true)
      map.value.Ui.Toolbar.visible(false)
    }

    // const marker = new longdo.value.Marker({ lon: 100.56, lat: 13.74 })
    // map.value.Overlays.add(marker)

    specificMarkerLocations.value.forEach((data, index) => {
      let markerOptions = {
        title: data.title || `หมุด ${index + 1}`,
        detail: data.detail || `พิกัด: ${data.lat.toFixed(4)}, ${data.lon.toFixed(4)}`,
        visibleRange: { min: 10, max: 20 },
        // icon: { // ใช้ icon ที่กำหนดไว้ใน assets
        //   url: myMarkerIcon,
        //   Size: { width: 32, height: 32 },
        //   offset: { x: 16, y: 32 },
        // },
      }

      try {
        let marker = new longdo.value.Marker(
          { lon: data.lon, lat: data.lat },
          markerOptions, // ใช้ options ที่ไม่มีการกำหนด icon
        )
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
