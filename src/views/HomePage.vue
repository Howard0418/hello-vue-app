<template>
    <div class="container">
        <div class="card">
            <h1>診間叫號系統</h1>
        </div>

        <main>
            <div class="card">
                <section class="current-number-section">
                    <div class="current-number-box">
                        <span id="current-number">003</span>
                    </div>
                    <div class="button-group">
                        <button id="prev-btn" class="btn btn-blue">上一號</button>
                        <button id="next-btn" class="btn btn-green">下一號</button>
                        <button id="skip-btn" class="btn btn-yellow">過號報到</button>
                    </div>
                    <div class="queue-info">
                        <span>等候人數: <span id="waiting-count">2</span></span><br>
                        <span>預估等候時間: <span id="waiting-time">10 分鐘</span></span>
                    </div>
                </section>
            </div>
            <div class="card">
                <section class="patient-list-section">
                    <div class="search-box">
                        <input type="text" id="search-input" placeholder="輸入身分證ID查詢...">
                        <button id="search-btn" @click="sendPost">送出</button>
                    </div>
                    <ul id="patient-list" class="patient-list">
                        <li class="patient-item" v-for="patient in patients" :key="patient.id">
                            <span class="patient-number">{{ patient.number }}</span>
                            <span class="patient-sex" :class="patient.sex == '1' ? 'male' : 'female'">{{
                                patient.sex == '1' ? '男' : '女' }}</span>
                            <span class="patient-name">{{ patient.patientName }}</span>
                            <span class="patient-id">{{ patient.idNo }}</span>
                            <span class="patient-status" :class="statusClass(patient.status)">{{
                                statusText(patient.statusText) }}</span>
                            <button class="action-btn action-call">叫號</button>
                            <button class="action-btn action-status">狀態</button>
                        </li>
                    </ul>
                </section>
            </div>
        </main>

    </div>
</template>
<script>
import axios from 'axios'
import { ref } from 'vue'

export default {
    setup() {
        const patients = ref([])

        const sendPost = async () => {

            /*
            const testpatients = [
                { number: '001', gender: 'male', name: '王小明', id: 'A123456789', status: 'done' },
                { number: '002', gender: 'female', name: '李小華', id: 'B987654321', status: 'report' },
                { number: '003', gender: 'male', name: '張大同', id: 'C456789123', status: 'done' },
                { number: '004', gender: 'female', name: '陳美麗', id: 'D789123456', status: 'wait' },
                { number: '005', gender: 'male', name: '林志明', id: 'E321654987', status: 'done' }
            ];
            */

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
            done: { text: '已看診', class: 'status-done' },
            report: { text: '看報告', class: 'status-report' },
            wait: { text: '未報到', class: 'status-wait' },
            pending: { text: '待檢查', class: 'status-pending' }
        };
        const statusText = status => statusMap[status]?.text || '';
        const statusClass = status => statusMap[status]?.class || '';

        return {
            patients,
            sendPost,
            statusText,
            statusClass
        }
    }
}
</script>