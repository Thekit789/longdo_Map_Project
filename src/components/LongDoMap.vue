<script setup></script>

<template>
  <div class="map-wrapper">
    <p style="text-align: center; color: white">LongDoMap Component...</p>
    <LongdoMap class="map-container" @load="onMapLoaded" />
  </div>
</template>

<style scoped>
.map-wrapper {
  width: 900px;
  padding: 10px;
  box-sizing: border-box;
}

.map-container {
  width: 100%;
  height: 600px;
  border: 10px solid rgb(246, 250, 246);
  background-color: #f0f0f0;
}
</style>
