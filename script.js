const allData = [
    {
        q: "Theo quy định tại Thông tư 06/2025/TT-BCT: Phương án nào sau đây đúng trình tự tiến hành thao tác tại vị trí đặt thiết bị điện nhất thứ?",
        A: "Người giám sát đọc lệnh; Người thao tác nhắc lại lệnh; Người thao tác thực hiện thao tác; Người giám sát và người thao tác kiểm tra thao tác tốt.",
        B: "Người giám sát và người thao tác kiểm tra đúng thiết bị cần thao tác; Người giám sát đọc lệnh; Người thao tác nhắc lại lệnh; Người thao tác thực hiện thao tác.",
        C: "Người thao tác kiểm tra đúng thiết bị cần thao tác; Người giám sát đọc lệnh; Người thao tác nhắc lại lệnh; Người thao tác thực hiện thao tác.",
        D: "Người giám sát kiểm tra đúng thiết bị cần thao tác; Người giám sát đọc lệnh; Người thao tác nhắc lại lệnh; Người thao tác thực hiện thao tác.",
        correct: "B"
    }
    // Thêm các câu hỏi khác của bạn vào đây tương tự mẫu trên
];

let activeQuestions = [];
let user = "";

window.onload = () => { loadLeaderboard(); };

function startQuiz(num) {
    user = document.getElementById('username').value.trim();
    if (!user) { alert("Vui lòng nhập tên trước khi làm bài!"); return; }

    // Chuyển màn hình
    document.getElementById('home-screen').style.display = 'none';
    document.getElementById('quiz-screen').style.display = 'block';
    document.getElementById('display-name').innerText = user;

    // Lấy câu hỏi ngẫu nhiên
    activeQuestions = [...allData].sort(() => 0.5 - Math.random()).slice(0, num);
    document.getElementById('total-ques').innerText = activeQuestions.length;

    renderQuestions();
}

function renderQuestions() {
    const container = document.getElementById('quiz-content');
    container.innerHTML = activeQuestions.map((item, i) => `
        <div class="question-item">
            <span class="question-text">Câu ${i + 1}: ${item.q}</span>
            <label><input type="radio" name="q${i}" value="A"> A. ${item.A}</label>
            <label><input type="radio" name="q${i}" value="B"> B. ${item.B}</label>
            <label><input type="radio" name="q${i}" value="C"> C. ${item.C}</label>
            <label><input type="radio" name="q${i}" value="D"> D. ${item.D}</label>
            <div id="result-${i}"></div>
        </div>
    `).join('');
}

function submitQuiz() {
    let finalScore = 0;
    activeQuestions.forEach((item, i) => {
        const picked = document.querySelector(`input[name="q${i}"]:checked`);
        const resDiv = document.getElementById(`result-${i}`);
        const val = picked ? picked.value : "";

        if (val === item.correct) {
            finalScore++;
            resDiv.innerHTML = `<span class="correct-ans">✓ Đúng.</span>`;
        } else {
            resDiv.innerHTML = `<span class="wrong-ans">✗ Sai. Đáp án đúng: ${item.correct}</span>`;
        }
    });

    document.getElementById('current-score').innerText = finalScore;
    saveToLeaderboard(user, finalScore, activeQuestions.length);
    alert(`Hoàn thành! Điểm của bạn: ${finalScore}/${activeQuestions.length}`);
}

function saveToLeaderboard(name, pts, total) {
    const storageKey = `bxh-${total}`;
    let list = JSON.parse(localStorage.getItem(storageKey)) || [];
    list.push({ name, pts, total });
    list.sort((a, b) => b.pts - a.pts);
    localStorage.setItem(storageKey, JSON.stringify(list.slice(0, 10)));
    loadLeaderboard();
}

function loadLeaderboard() {
    const fillTable = (tableId, key) => {
        const data = JSON.parse(localStorage.getItem(key)) || [];
        document.querySelector(`#${tableId} tbody`).innerHTML = data.map(d => 
            `<tr><td>${d.name}</td><td>${d.pts}/${d.total}</td></tr>`
        ).join('');
    };
    fillTable('bxh-60', 'bxh-60');
    fillTable('bxh-343', 'bxh-343');
}

function resetLeaderboard() {
    if (confirm("Bạn có chắc muốn xóa bảng xếp hạng?")) {
        localStorage.clear();
        loadLeaderboard();
    }
}
