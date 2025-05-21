<script setup>
import { ref } from 'vue'
// LongdoMap component is globally registered via app.use() in main.js

// Reference to the map instance
const map = ref(null)
// Reference to the Longdo API global object
const longdo = ref(null)

// --- กำหนดพิกัดสำหรับหมุด ---
const specificMarkerLocations = ref([
  {
    lon: 100.30303,
    lat: 14.926872,
    title: 'จังหวัดสิงห์บุรี',
    detail: 'สถานที่ท่องเที่ยวทางประวัติศาสตร์',
  },
  {
    lon: 100.695791,
    lat: 14.807413,
    title: 'จังหวัดลพบุรี',
    detail: 'สถานที่ท่องเที่ยวทางธรรมชาติ',
  },
  {
    lon: 99.999189,
    lat: 14.590229,
    title: 'จังหวัดสุพรรณบุรี',
    detail: 'สถานที่ท่องเที่ยวทางวัฒนธรรม',
  },
])

// Function to be called when the map is loaded
const onMapLoaded = (loadedMapObject) => {
  // ตรวจสอบว่า loadedMapObject (ตัวแผนที่) และ window.longdo (API หลัก) พร้อมใช้งานหรือไม่
  if (loadedMapObject && window.longdo) {
    map.value = loadedMapObject // กำหนด map.value ด้วย loadedMapObject โดยตรง
    longdo.value = window.longdo // ดึง Longdo API object จาก global scope (window)

    // Add the specific markers
    addSpecificMarkers()

    if (map.value && map.value.Ui) {
      map.value.Ui.Scale.visible(true)
      map.value.Ui.Toolbar.visible(false)
    }

    if (specificMarkerLocations.value.length > 0) {
      map.value.location(
        { lon: specificMarkerLocations.value[0].lon, lat: specificMarkerLocations.value[0].lat },
        true,
      )
      map.value.zoom(9, true) // ปรับ zoom level ให้เห็นภาพรวมของจังหวัดใกล้เคียง
    } else {
      map.value.location({ lon: 100.5, lat: 13.75 }, true)
      map.value.zoom(10, true)
    }
  } else {
    console.error(
      'Failed to initialize map instance. loadedMapObject or window.longdo is missing.',
      loadedMapObject,
      window.longdo,
    )
  }
}

// Function to add the predefined specific markers
const addSpecificMarkers = () => {
  console.log('Attempting to add specific markers with default Longdo Map icons...')
  if (!map.value || !longdo.value) {
    console.error(
      'Map or Longdo API not ready to add specific markers. map.value:',
      map.value,
      'longdo.value:',
      longdo.value,
    )
    return
  }

  console.log(`Number of specific locations: ${specificMarkerLocations.value.length}`)

  specificMarkerLocations.value.forEach((loc, index) => {
    console.log(`Processing marker ${index + 1}:`, loc)

    let markerOptions = {
      title: loc.title || `หมุด ${index + 1}`,
      detail: loc.detail || `พิกัด: ${loc.lat.toFixed(4)}, ${loc.lon.toFixed(4)}`,
      visibleRange: { min: 1, max: 20 },
    }

    try {
      let marker = new longdo.value.Marker(
        { lon: loc.lon, lat: loc.lat },
        markerOptions, // ใช้ options ที่ไม่มีการกำหนด icon
      )
      map.value.Overlays.add(marker)
    } catch (error) {
      console.error(
        `ERROR creating or adding marker ${index + 1} (${loc.title}):`,
        error,
        'Location:',
        loc,
      )
    }
  })
  console.log(
    `Finished attempting to add ${specificMarkerLocations.value.length} specific markers to the map.`,
  )
}
</script>

<template>
  <div class="map-wrapper-with-marker">
    <p style="text-align: center; font-size: 0.9em; margin-bottom: 10px">
      Demo Longdo Map with Pin Map
    </p>
    <longdo-map
      class="map-container-marker"
      :apiKey="'b3be4e0b99f8806a4f60860e2cac50c0'"
      @load="onMapLoaded"
    />
  </div>
</template>

<style scoped>
.map-wrapper-with-marker {
  width: 900px;
  padding: 10px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 2rem;
  font-weight: 900;
  color: #e9e8e6;
}

.map-container-marker {
  width: 100%;
  max-width: 900px; /* Limit map width for better layout */
  height: 80vh; /* Adjust height as needed, e.g., 500px or 70vh */
  min-height: 450px;
  border: 2px solid mediumseagreen; /* Changed border color */
  background-color: #e0e0e0; /* Placeholder color */
  margin-bottom: 15px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Added a subtle shadow */
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
</style>
