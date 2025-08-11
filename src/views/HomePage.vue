<template>
    <div class="container">
        <div class="card">
            <h1>診間叫號系統</h1>
        </div>

        <main>
            <div class="card">
                <div class="current_number_title">
                    目前叫號
                </div>
                <section class="current-number-section">
                    <div class="current-number-box">
                        <span id="current-number">
                            {{ padNumber(patients[currentIndex]?.number) }}
                        </span>
                    </div>
                    <div class="button-group">
                        <button class="btn btn-blue" @click="prevPatient">上一號</button>
                        <button class="btn btn-green" @click="nextPatient">下一號</button>
                        <button class="btn btn-yellow" @click="skipPatient">過號報到</button>
                    </div>
                    <div class="queue-info">
                        <span>等候人數: <span id="waiting-count" class="waiting_count">{{ waitingCount }}</span></span><br>
                        <span>預估等候時間: <span id="waiting-time" class="waiting_time">{{ waitingTime }} 分鐘</span></span>
                    </div>
                </section>
            </div>
            <div class="card">
                <div class="patient_list_title">
                    患者清單
                </div>
                <hr>
                <section class="patient-list-section">
                    <div class="search-box">
                        <input type="text" id="search-input" placeholder="輸入身分證ID查詢..." v-model="searchText">
                        <button id="search-btn" @click="sendPost">送出</button>
                    </div>
                    <ul id="patient-list" class="patient-list">
                        <li class="patient-item" v-for="(patient, idx) in filteredPatients" :key="patient.id">
                            <span class="patient-number">{{ padNumber(patient.number) }}</span>
                            <span class="patient-sex" :class="patient.sex == '1' ? 'male' : 'female'">{{
                                patient.sex == '1' ? '男' : '女' }}</span>
                            <span class="patient-name">{{ patient.patientName }}</span>
                            <span class="patient-id">{{ patient.idNo }}</span>
                            <span class="patient-status" :class="statusClass(patient.status)">{{
                                statusText(patient.status) }}</span>
                            <button class="action-btn action-call" @click="callPatient(idx)">叫號</button>
                            <button class="action-btn action-status" @click="showStatus(patient)">狀態</button>
                        </li>
                    </ul>
                </section>
            </div>
        </main>

    </div>
</template>
<script>
import axios from 'axios'
import { ref, computed } from 'vue'

export default {
    setup() {
        // 患者資料陣列
        const patients = ref([])

        const sendPost = async () => {
            try {
                const res = await axios.post(
                    'https://hkt-ap1.landseed.com.tw/Temp/Lesson/Patient',
                    {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }
                )

                patients.value = res.data
            } catch (err) {
                console.error('POST 失敗', err)
            }
        }


        const statusMap = {
            1: { text: '未報到', class: 'status-wait' },
            2: { text: '已報到', class: 'status-pending' },
            3: { text: '已看診', class: 'status-done' },
            4: { text: '看報告', class: 'status-report' }
        };
        const statusText = status => statusMap[status]?.text || '';
        const statusClass = status => statusMap[status]?.class || '';

        // 目前叫號的索引
        const currentIndex = ref(2); // 預設叫號003
        // 上一號
        function prevPatient() {
            if (currentIndex.value > 0) {
                currentIndex.value--;
            }
        }
        // 下一號
        function nextPatient() {
            if (currentIndex.value < patients.value.length - 1) {
                currentIndex.value++;
            }
        }
        // 計算等候人數（目前叫號之後，狀態不是已看診的患者）
        const waitingCount = computed(() => {
            // 計算目前叫號之後，狀態不是已看診的患者數
            return patients.value.filter((p, idx) => idx > currentIndex.value && p.status !== 3).length
        })

        // 預估等候時間（每人5分鐘）
        const waitingTime = computed(() => {
            // 每人預估5分鐘
            return waitingCount.value * 5
        })

        function padNumber(num) {
            if (!num) return '---';
            return num.toString().padStart(3, '0');
        }
        // 過號報到：跳到下一個未報到患者
        function skipPatient() {
            // 跳到下一個未報到
            const nextWait = patients.value.findIndex((p, idx) => idx > currentIndex.value && p.status === 'wait');
            if (nextWait !== -1) {
                currentIndex.value = nextWait;
            } else {
                alert('沒有未報到的患者');
            }
        }
        // 叫號：指定目前叫號
        function callPatient(idx) {
            currentIndex.value = idx;
        }
        // 顯示患者狀態
        function showStatus(patient) {
            alert(`姓名：${patient.patientName} 狀態: ${statusText(patient.status)}`);
        }

        // 搜尋文字
        const searchText = ref('');

        // 根據搜尋文字過濾患者清單
        const filteredPatients = computed(() => {
            if (!searchText.value) return patients.value;
            return patients.value.filter(p =>
                p.idNo?.includes(searchText.value) || p.id?.includes(searchText.value)
            );
        });

        return {
            patients,
            sendPost,
            statusText,
            statusClass,
            callPatient,
            showStatus,
            prevPatient,
            nextPatient,
            skipPatient,
            currentIndex,
            waitingCount,
            waitingTime,
            padNumber,
            searchText,
            filteredPatients,
        }
    }
}
</script>