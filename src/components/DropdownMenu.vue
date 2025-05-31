<template>
  <div class="dropdown-container">
    <label for="input-select-province" class="dropdown-label">เลือกจังหวัด</label>
    <select name="province" id="input-select-province">
      <option value="" disabled selected hidden>เลือกจังหวัด...</option>
      <option value="bkk">กรุงเทพมหานคร</option>
      <option value="chiangmai">เชียงใหม่</option>
      <option value="chonburi">ชลบุรี</option>
    </select>
  </div>

  <div class="dropdown-container">
    <label for="input-select-branch" class="dropdown-label">เลือกสาขา</label>
    <select name="branch" id="input-select-branch">
      <option value="" disabled selected hidden>เลือกสาขา...</option>
      <option value="branch1">สาขาที่ 1</option>
      <option value="branch2">สาขาที่ 2</option>
      <option value="branch3">สาขาที่ 3</option>
    </select>
  </div>
</template>

<style scoped>
/* Container สำหรับแต่ละ Dropdown เพื่อจัดกลุ่ม Label และ Select */
.dropdown-container {
  margin-bottom: 1.5rem; /* เพิ่มระยะห่างระหว่าง Dropdown ทั้งสอง */
  width: 100%; /* ให้ container กว้างเต็มที่ */
}

/* Style สำหรับ Label */
.dropdown-label {
  display: block; /* ทำให้ label อยู่บรรทัดของตัวเอง */
  margin-bottom: 0.5rem; /* ระยะห่างระหว่าง label กับ select */
  font-size: 1rem;
  color: #555;
  font-weight: bold;
}

/* Style ทั่วไปสำหรับ select ทั้งหมด */
select {
  width: 100%; /* เต็มความกว้างของ parent */
  height: 2.5rem; /* ความสูงมาตรฐาน */
  padding: 0.5rem 1rem; /* เพิ่ม padding ด้านข้างให้ดูสมส่วน */
  font-size: 1rem; /* ขนาด font */
  line-height: 1.5; /* กำหนด line-height เพื่อจัดข้อความให้อยู่กึ่งกลาง */

  border: 1px solid #ccc; /* สีขอบ */
  border-radius: 8px; /* ความโค้งมน */
  background-color: #fff; /* พื้นหลังสีขาว */
  color: #333; /* สีข้อความ */
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
  border-color: #999;
}

select:focus {
  border-color: #007bff;
  outline: none;
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}

/* Style สำหรับ placeholder option */
select option[disabled]:first-of-type {
  color: #888;
}

/* Style สำหรับ option ทั่วไป */
select option {
  color: #333;
  background-color: #fff;
}

/* คุณสามารถเพิ่ม ID เฉพาะเจาะจงได้ หากต้องการสไตล์ที่แตกต่างกันมากๆ */
/* #input-select-province { ... } */
/* #input-select-branch { ... } */
</style>
