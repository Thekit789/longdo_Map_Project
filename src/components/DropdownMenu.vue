<script setup>
import { ref, watch, computed } from 'vue'

const ProvinceDropdown = [
  'ลพบุรี',
  'สระบุรี',
  'สิงห์บุรี',
  'อ่างทอง',
  'นครราชสีมา',
  'ชัยภูมิ',
  'สุพรรณบุรี',
  'นครราชสีมา',
]

const BranchDropdown = {
  ลพบุรี: [
    'สำนักงานใหญ่ (ท่าโพธิ์)',
    'ลำนารายณ์',
    'ลำนารายณ์ 2',
    'โคกสำโรง',
    'หนองม่วง',
    'บ้านหมี่',
    'เสาธง',
    'ท่าศาลา',
    'สะพาน 7',
    'ท่าวุ้ง',
    'วนเวียนสระแก้ว',
    'สระโบสถ์',
    'ท่าหลวง',
    'โคกเจริญ',
  ],
  สระบุรี: [
    'สระบุรี',
    'หน้าพระลาน',
    'บ้านหมอ',
    'แก่งคอย',
    'วิหารแดง',
    'พระพุทธบาท',
    'มวกเหล็ก',
    'หนองแค',
  ],
  สิงห์บุรี: ['สิงห์บุรี', 'อินทร์บุรี', 'บางระจัน'],
  ชัยนาท: ['สรรคบุรี', 'วัดสิงห์'],
  อ่างทอง: ['อ่างทอง', 'โพธิ์ทอง', 'วิเศษชัยชาญ', 'ป่าโมก'],
  นครราชสีมา: ['ปากช่อง', 'ด่านขุนทด', 'ปักธงชัย', 'ขามทะเลสอ', 'สี่คิ้ว', 'สูงเนิน'],
  ชัยภูมิ: ['วะตะแบก', 'คำปิง'],
  สุพรรณบุรี: ['สุพรรณบุรี', 'เดิมบางนางบวช'],
}

const selectedProvince = ref('')
const selectedBranch = ref('')

// ใช้ watch เพื่อตรวจสอบการเปลี่ยนแปลงของ selectedProvince
watch(selectedProvince, (newProvince, oldProvince) => {
  if (newProvince !== oldProvince) {
    selectedBranch.value = ''
  }
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
