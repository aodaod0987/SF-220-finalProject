<script>
  let showmode = true;
  let newname = "";
  let newsubject = "";
  let newtotal = "";
  let newcredit = "";
  let newTeacher = "";
  let newshort_description = "";
  let newdescription = "";
  import { subjects, accounts, account, mode } from "./stores.js";

  function show_results() {
    if ((newcredit >= 0 && newcredit <= 3 && newcredit != "") && 
    (newtotal >= 1 && newtotal <= 100 && newtotal != "") && 
    (newsubject != "") && 
    (newname != "" && newname.length == 5)) {
      document.getElementById("total-sub").style.display = "none";
      document.getElementById("credit-sub").style.display = "none";
      document.getElementById("name-sub").style.display = "none";
      document.getElementById("sub-sub").style.display = "none";
      document.getElementById("model").style.display = "none";
      showmode = false;
    } else {
      alert("กรุณากรอกรายละเอียดให้ถูกต้อง");
      
      if (newname == "" || newname == null || newname.length < 5) {
      document.getElementById("name-sub").style.display = "block";
    } else {
      document.getElementById("name-sub").style.display = "none";
    }

    if (newsubject == "" || newsubject == null ) {
      document.getElementById("sub-sub").style.display = "block";
    } else {
      document.getElementById("sub-sub").style.display = "none";
    }

    if (newcredit == "" || newcredit == null  || newcredit < 0 || newcredit > 3) {
      document.getElementById("credit-sub").style.display = "block";
    } else {
      document.getElementById("credit-sub").style.display = "none";
    }

    if (newtotal == "" || newtotal == null || newtotal < 1 || newtotal > 100) {
      document.getElementById("total-sub").style.display = "block";
    } else {
      document.getElementById("total-sub").style.display = "none";
    }
    
    if (!Number.isInteger(+newtotal) || !Number.isInteger(+newcredit)) {
      alert("กรุณากรอกเป็นจำนวนเต็ม");
    }
  }

    for (let i = 0; i < $subjects.length; i++) {
      if ($subjects[i].name == newname) {
        alert("มีรายวิชาดังกล่าวแล้ว");
        duplicate();
        break;
      }
    }
  }

  function confirm() {
    if (newcredit >= 0 && newtotal >= 1 && newcredit <= 3 && newtotal <= 100) {
      $subjects.push({
        name: newname,
        subject: newsubject,
        total: Math.ceil(newtotal),
        register: 0,
        remaining: newtotal,
        credit: Math.ceil(newcredit),
        Teacher: newTeacher,
        short_description: newshort_description,
        description: newdescription,
      });
      $subjects = [...new Set($subjects)];

      alert("เพิ่มรายวิชาสำเร็จ");
      newname = "";
      newsubject = "";
      newtotal = "";
      newcredit = "";
      newTeacher = "";
      newshort_description = "";
      newdescription = "";
      mode.set("allsubjects");
    }
  }

  function back() {
    showmode = true;
    document.getElementById("model").style.display = "flex";
  }

  function duplicate() {
    newname = "";
    showmode = true;
    document.getElementById("model").style.display = "flex";
    document.getElementById("name").value = newname;
  }
</script>

<div id="page-name"><h1>รายละเอียดวิชาที่ต้องการเพิ่ม</h1></div>

{#if showmode == true}
  <div id="container">
    <div id="model">
      <div class="terms">
        <div class="highsub-1">
          <div class="sub-1">
            <div class="sub-name">
              รหัสวิชา: <p id="name-sub">*กรุณาใส่ให้ครบ 5 ตำแหน่ง</p>
            </div>
            <input
              id="name"
              type="text"
              minlength="5"
              maxlength="5"
              value={newname}
              on:input={(e) => (newname = e.target.value)}
            />
          </div>
          <div class="sub-2">
            ชื่อวิชา: <p id="sub-sub">*กรุณาใส่ชื่อวิชา</p> <input
              id="subject"
              type="text"
              maxlength="30"
              value={newsubject}
              on:input={(e) => (newsubject = e.target.value)}
            />
          </div>
        </div>
        <div class="highsub-2">
          <div class="sub-3">
            <div class="sub-total">
              จำนวนโควตาทั้งหมด:
              <p id="total-sub">*ขั้นต่ำ 1 คน <br /> ไม่เกิน 100 คน</p>
            </div>
            <input
              id="total"
              type="number"
              min="1"
              max="100"
              step="1"
              value={newtotal}
              on:input={(e) => (newtotal = e.target.value)}
            />
          </div>
          <div class="sub-4">
            <div class="sub-credit">
              หน่วยกิต:
              <p id="credit-sub">*ขั้นต่ำ 0 หน่วย <br /> ไม่เกิน 3 หน่วย</p>
            </div>
            <input
              id="credit"
              type="number"
              min="0"
              max="3"
              step="1"
              value={newcredit}
              on:input={(e) => (newcredit = e.target.value)}
            />
          </div>
        </div>
        <div class="highsub-3">
          <div class="sub-5">
            ชื่ออาจารย์ผู้สอน:<input
              id="teacher"
              type="text"
              maxlength="30"
              value={newTeacher}
              on:input={(e) => (newTeacher = e.target.value)}
            />
          </div>
          <div class="sub-6">
            เพิ่มเติม:
            <input
              id="short_description"
              type="text"
              maxlength="30"
              value={newshort_description}
              on:input={(e) => (newshort_description = e.target.value)}
            />
          </div>
        </div>
        <div class="sub-7">
          รายละเอียดวิชา:<textarea
            id="description"
            type="text"
            maxlength="300"
            value={newdescription}
            on:input={(e) => (newdescription = e.target.value)}
          />
        </div>
        <div class="sub-8">
          <button class="button button1" on:click={() => show_results()}
            >ยืนยันวิชาที่ต้องการเพิ่ม</button
          >
        </div>
      </div>
    </div>
  </div>
{/if}

{#if showmode == false}
  <div id="confirm">
    <table>
      <thead>
        <tr>
          <th>รหัสวิชา</th>
          <th>ชื่อวิชา</th>
          <th>จำนวนโควตาทั้งหมด</th>
          <th>หน่วยกิต</th>
          <th>ชื่ออาจารย์ผู้สอน</th>
          <th>เพิ่มเติม</th>
          <th>รายละเอียดวิชา</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><p id="new-name">{newname}</td>
          <td><p id="new-sub">{newsubject}</td>
          <td><p id="new-total">{newtotal}</td>
          <td><p id="new-cre">{newcredit}</td>
          <td><p id="new-teacher">{newTeacher}</td>
          <td><p id="new-sdes">{newshort_description}</td>
          <td ><p id="new-des">{newdescription}</p></td>
        </tr>
      </tbody>
    </table>
    <div class="flex-btn">
      <button class="button button1" on:click={() => confirm()}
        >ยืนยันวิชาที่ต้องการเพิ่ม</button
      >
      <button class="button button1" on:click={() => back()}>ย้อนกลับ</button>
    </div>
  </div>
{/if}

<div id="bg" />

<style>
  #bg {
    background-image: linear-gradient(
      0deg,
      rgb(6, 113, 183) 22%,
      rgb(103, 163, 217) 87%,
      rgb(199, 230, 245) 97%
    );
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: -1;
  }

  #page-name {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
  }

  #page-name h1 {
    color: white;
    margin-top: 20px;
    margin-bottom: 20px;
    font-size: 60px;
  }

  p#name-sub, p#total-sub, p#credit-sub ,p#sub-sub {
    font-size: 10px;
    color: tomato;
    display: block;
  }

  textarea {
    resize: both;
    min-width: 200px;
    min-height: 200px;
    max-width: 300px;
    max-height: 250px;
    margin-left: 20px;
  }

  div#confirm {
    display: flex;
    justify-content: center;
    margin-top: 10%;
    color: white;
    flex-direction: column;
    align-items: center;
  }

  div#container {
    height: auto;
    width: 100%;
    display: flex;
    justify-content: center;
  }

  #model {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgb(255,255,255,0.3);
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0px 10px 30px 5px rgba(87, 85, 101, 0.5);
  }

  .flex-btn {
    display: flex;
    flex-direction: row;
    margin-left: 10px;
    margin-bottom: 20px;
    margin-top: 20px;
    margin-right: 10px;
  }

  .button {
    margin: 10px;
    padding: 10px 20px;
    font-size: 15px;
    text-align: center;
    cursor: pointer;
    outline: none;
    border: none;
    border-radius: 40px;
    transition-duration: 0.4s;
    cursor: pointer;
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2),
      0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }

  .button1 {
    background-color: white;
    color: black;
    border: 2px solid rgba(69, 117, 165, 1);
  }

  .button1:hover {
    background-color: rgb(103, 163, 217);
    color: white;
  }
  table,
  td,
  th {
    border: 1px solid #ddd;
    text-align: center;
  }

  #new-sub,#new-teacher,#new-sdes {
    width: 100px;
    word-wrap: break-word;
    text-align: left;
  }

  #new-name,#new-total,#new-cre {
    word-wrap: break-word;
    text-align: center;
  }

  #new-des {
    width: 300px;
    word-wrap: break-word;
    text-align: left;
  }

  table {
    border-collapse: collapse;

    background-color: rgb(255,255,255, 0.3);

    padding: 10px;
    text-align: center;

    width: 700px;
    height: 150px;
    box-shadow: 0px 10px 30px 5px rgba(87, 85, 101, 0.2);
  }
  th,
  td {
    padding: 10px;
    border-bottom: 1px dashed grey;
    background-color: rgb(255,255,255, 0.3);

    height: 50px;
  }
  tr:nth-last-child(-n + 1) {
    border-bottom: none;
  }

  h1 {
    display: flex;
    justify-content: center;
    margin-top: 50px;
    color:white;
  }

  .highsub-1,
  .highsub-2,
  .highsub-3 {
    display: flex;
    justify-content: left;
    margin-top: 20px;
  }

  .sub-1,
  .sub-2,
  .sub-5,
  .sub-6,
  .sub-7 {
    display: flex;
    justify-content: left;
    flex-direction: column;
    margin-top: 10px;
  }

  .sub-3,
  .sub-4 {
    display: flex;
    justify-content: left;
    margin-top: 10px;
  }

  .sub-4 {
    margin-left: 70px;
  }

  .sub-8 {
    display: flex;
    justify-content: center;
    margin-top: 10px;
  }
</style>
