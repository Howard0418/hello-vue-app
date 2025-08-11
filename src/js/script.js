
const statusMap = {
    done: { text: '已看診', class: 'status-done' },
    report: { text: '看報告', class: 'status-report' },
    wait: { text: '未報到', class: 'status-wait' },
    pending: { text: '待檢查', class: 'status-pending' }
};

let currentIndex = 2; // 預設叫號003

function renderPatientList(filter = '') {
    const list = document.getElementById('patient-list');
    list.innerHTML = '';
    patients.forEach((p, idx) => {
        if (filter && !p.id.includes(filter)) return;
        const li = document.createElement('li');
        li.className = 'patient-item' + (idx === currentIndex ? ' selected' : '');
        let callBtnClass = 'action-btn action-call';
        // 005且被選中才加selected
        if (idx === 4 && idx === currentIndex) callBtnClass += ' selected';
        li.innerHTML = `
            <span class="patient-number">${p.number}</span>
            <span class="patient-gender ${p.gender === 'male' ? 'male' : 'female'}">${p.gender === 'male' ? '男' : '女'}</span>
            <span class="patient-name">${p.name}</span>
            <span class="patient-id">${p.id}</span>
            <span class="patient-status ${statusMap[p.status].class}">${statusMap[p.status].text}</span>
            <button class="${callBtnClass}">叫號</button>
            <button class="action-btn action-status">狀態</button>
        `;
        // 狀態按鈕功能
        li.querySelector('.action-status').onclick = function () {
            alert(`${p.name} 狀態: ${statusMap[p.status].text}`);
        };
        // 叫號按鈕功能
        li.querySelector('.action-call').onclick = function () {
            currentIndex = idx;
            updateCurrentNumber();
            renderPatientList(document.getElementById('search-input').value);
        };
        list.appendChild(li);
    });
}

function updateCurrentNumber() {
    document.getElementById('current-number').textContent = patients[currentIndex].number;
    // 更新等候人數與預估時間
    const waitingCount = patients.filter((p, idx) => idx > currentIndex && p.status !== 'done').length;
    document.getElementById('waiting-count').textContent = waitingCount;
    document.getElementById('waiting-time').textContent = `${waitingCount * 5} 分鐘`;
}

document.getElementById('prev-btn').onclick = function () {
    if (currentIndex > 0) {
        currentIndex--;
        updateCurrentNumber();
        renderPatientList(document.getElementById('search-input').value);
    }
};

document.getElementById('next-btn').onclick = function () {
    if (currentIndex < patients.length - 1) {
        currentIndex++;
        updateCurrentNumber();
        renderPatientList(document.getElementById('search-input').value);
    }
};
document.getElementById('skip-btn').onclick = function () {
    // 跳到下一個未報到
    const nextWait = patients.findIndex((p, idx) => idx > currentIndex && p.status === 'wait');
    if (nextWait !== -1) {
        currentIndex = nextWait;
        updateCurrentNumber();
        renderPatientList(document.getElementById('search-input').value);
    } else {
        alert('沒有未報到的患者');
    }
};
document.getElementById('search-input').oninput = function (e) {
    renderPatientList(e.target.value);
};

// 初始化
updateCurrentNumber();
renderPatientList();
