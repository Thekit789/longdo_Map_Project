<script setup>
import { ref, watch, computed } from 'vue'

// กำหนด emits สำหรับคอมโพเนนต์นี้ เพื่อให้คอมโพเนนต์แม่สามารถรับข้อมูลได้
const emits = defineEmits(['update:province'])

const ProvinceDropdown = [
  'ลพบุรี',
  'สระบุรี',
  'สิงห์บุรี',
  'อ่างทอง',
  'ชัยนาท',
  'ชัยภูมิ',
  'สุพรรณบุรี',
  'นครราชสีมา',
]

const BranchDropdown = {
  ลพบุรี: [
    'สาขา สำนักงานใหญ่ (ท่าโพธิ์)',
    'สาขา ลำนารายณ์',
    'สาขา ลำนารายณ์ 2',
    'สาขา โคกสำโรง',
    'สาขา หนองม่วง',
    'สาขา บ้านหมี่',
    'สาขา เสาธง',
    'สาขา ท่าศาลา',
    'สาขา สะพาน 7',
    'สาขา ท่าวุ้ง',
    'สาขา วนเวียนสระแก้ว',
    'สาขา สระโบสถ์',
    'สาขา ท่าหลวง',
    'สาขา โคกเจริญ',
  ],
  สระบุรี: [
    'สาขา สระบุรี',
    'สาขา หน้าพระลาน',
    'สาขา บ้านหมอ',
    'สาขา แก่งคอย',
    'สาขา วิหารแดง',
    'สาขา พระพุทธบาท',
    'สาขา มวกเหล็ก',
    'สาขา หนองแค',
  ],
  สิงห์บุรี: ['สาขา สิงห์บุรี', 'สาขา อินทร์บุรี', 'สาขา บางระจัน'],
  ชัยนาท: ['สาขา สรรคบุรี', 'สาขา วัดสิงห์'],
  อ่างทอง: ['สาขา อ่างทอง', 'สาขา โพธิ์ทอง', 'สาขา วิเศษชัยชาญ', 'สาขา ป่าโมก'],
  นครราชสีมา: [
    'สาขา ปากช่อง',
    'สาขา ด่านขุนทด',
    'สาขา ปักธงชัย',
    'สาขา ขามทะเลสอ',
    'สาขา สี่คิ้ว',
    'สาขา สูงเนิน',
  ],
  ชัยภูมิ: ['สาขา วะตะแบก', 'สาขา คำปิง'],
  สุพรรณบุรี: ['สาขา สุพรรณบุรี', 'สาขา เดิมบางนางบวช'],
}

const selectedProvince = ref('')
const selectedBranch = ref('')

// ใช้ watch เพื่อตรวจสอบการเปลี่ยนแปลงของ selectedProvince
watch([selectedProvince, selectedBranch], ([newProvince, newBranch], [oldProvince, oldBranch]) => {
  // เมื่อจังหวัดเปลี่ยน ให้รีเซ็ตสาขา
  if (newProvince !== oldProvince) {
    selectedBranch.value = '' // ล้างสาขาที่เลือกเมื่อจังหวัดเปลี่ยน
  }

  if (newBranch !== oldBranch) {
    console.log('Branch changed:', newBranch)
  } else {
    console.log('No change in branch selection')
  }
  // เมื่อจังหวัดหรือสาขาเปลี่ยน ให้ emit event พร้อมข้อมูลที่เลือก
  emits('update:province', {
    province: newProvince,
    branch: newBranch,
  })
  console.log('Emitting province:', newProvince)
  console.log('Emitting branch:', selectedBranch.value)
})

// ใช้ computed property เพื่อกรองสาขาที่จะแสดงใน dropdown
const filteredBranches = computed(() => {
  return selectedProvince.value ? BranchDropdown[selectedProvince.value] || [] : []
})
</script>

<template>
  <div class="dropdown-container">
    <label for="input-select-province" class="dropdown-label">เลือกจังหวัด</label>
    <select name="province" id="input-select-province" v-model="selectedProvince">
      <option value="" disabled selected hidden>เลือกจังหวัด...</option>
      <option v-for="provinceName in ProvinceDropdown" :key="provinceName" :value="provinceName">
        {{ provinceName }}
      </option>
    </select>
  </div>

  <div class="dropdown-container">
    <label for="input-select-branch" class="dropdown-label">เลือกสาขา</label>
    <select
      name="branch"
      id="input-select-branch"
      v-model="selectedBranch"
      :disabled="!selectedProvince"
    >
      <option value="" disabled selected hidden>เลือกสาขา...</option>
      <option v-for="branchName in filteredBranches" :key="branchName" :value="branchName">
        {{ branchName }}
      </option>
    </select>
  </div>
</template>

<style scoped>
/* Container สำหรับแต่ละ Dropdown เพื่อจัดกลุ่ม Label และ Select */
.dropdown-container {
  margin-bottom: 1.5rem;
  width: 100%;
}

/* Style สำหรับ Label */
.dropdown-label {
  display: block;
  margin-bottom: 0.5rem;
  font-size: 1rem;
  color: #555;
  font-weight: bold;
}

/* Style  select  */
select {
  width: 100%; /* ความกว้าง parent */
  height: 2.5rem;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  line-height: 1.5;

  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #fff;
  color: #333;
  appearance: none; /* ลบ default style ของ browser */
  -webkit-appearance: none;
  -moz-appearance: none;

  /* Custom arrow (ลูกศร SVG) */
  background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%204%205%22%3E%3Cpath%20fill%3D%22%23666%22%20d%3D%22M2%200L0%202h4L2%200zM2%205L0%203h4L2%205z%22%2F%3E%3C%2Fsvg%3E');
  background-repeat: no-repeat;
  background-position: right 1rem center;
  background-size: 0.6em auto;

  transition:
    border-color 0.2s ease-in-out,
    box-shadow 0.2s ease-in-out;
  cursor: pointer;
}

select:hover {
  border-color: #007bff;
}

select:focus {
  border-color: #007bff;
  outline: none;
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}

/* placeholder option */
select option[disabled]:first-of-type {
  color: #888;
}

/* Style option */
select option {
  color: #333;
  background-color: #fff;
}
</style>
