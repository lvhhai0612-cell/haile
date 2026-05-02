// Dữ liệu câu hỏi (Bạn hãy bổ sung đầy đủ bộ đề vào đây)
const allQuestions = [
    {
        q: "Theo quy định tại Thông tư 06/2025/TT-BCT: Phương án nào sau đây đúng trình tự tiến hành thao tác tại vị trí đặt thiết bị điện nhất thứ?",
        A: "Người giám sát đọc lệnh; Người thao tác nhắc lại lệnh; Người thao tác thực hiện thao tác; Người giám sát và người thao tác kiểm tra thao tác tốt.",
        B: "Người giám sát và người thao tác kiểm tra đúng thiết bị cần thao tác; Người giám sát đọc lệnh; Người thao tác nhắc lại lệnh; Người thao tác thực hiện thao tác.",
        C: "Người thao tác kiểm tra đúng thiết bị cần thao tác; Người giám sát đọc lệnh; Người thao tác nhắc lại lệnh; Người thao tác thực hiện thao tác.",
        D: "Người giám sát kiểm tra đúng thiết bị cần thao tác; Người giám sát đọc lệnh; Người thao tác nhắc lại lệnh; Người thao tác thực hiện thao tác.",
        correct: "B"
    },
    {
        q: "Theo quy định tại Thông tư 06/2025/TT-BCT: Cho phép dùng dao cách ly để tiến hành các thao tác có điện trong trường hợp nào sau đây?",
        A: "Đóng và cắt không tải thanh cái hoặc đoạn thanh dẫn.",
        B: "Đóng và cắt dao cách ly nối tắt thiết bị.",
        C: "Đóng và cắt điểm trung tính của các máy biến áp, kháng điện.",
        D: "Đóng và cắt điểm trung tính của các máy biến áp, kháng điện hoặc đóng và cắt không tải thanh cái hoặc đoạn thanh dẫn hoặc đóng và cắt dao cách ly nối tắt thiết bị.",
        correct: "D"
    }
];

let currentQuiz = [];
let userName = "";

// Tải BXH khi mở trang
window.onload = updateLeaderboard;

function startQuiz(limit) {
    userName = document.getElementById('username').value.trim() || "Ẩn danh";
    document.getElementById('display-name').innerText = userName;
    
    // Xáo trộn và lấy số lượng câu
    currentQuiz = [...allQuestions].sort(() => 0.5 - Math.random()).slice(0, limit);
    
    document.getElementById('home-screen').style.display = 'none';
    document.getElementById('quiz-screen').style.display = 'block';
    document.getElementById('total-count').innerText = currentQuiz.length;
    
    renderQuiz();
}

function renderQuiz() {
    const container = document.getElementById('quiz-content');
    container.innerHTML = currentQuiz.map((item, index) => `
        <div class="question-block" id="q-container-${index}">
            <div class="question-text">Câu ${index + 1}: ${item.q}</div>
            <label><input type="radio" name="q${index}" value="A"> A. ${item.A}</label>
            <label><input type="radio" name="q${index}" value="B"> B. ${item.B}</label>
            <label><input type="radio" name="q${index}" value="C"> C. ${item.C}</label>
            <label><input type="radio" name="q${index}" value="D"> D. ${item.D}</label>
            <div id="feedback-${index}"></div>
        </div>
    `).join('');
}

function submitQuiz() {
    let score = 0;
    currentQuiz.forEach((item, index) => {
        const selected = document.querySelector(`input[name="q${index}"]:checked`);
        const feedback = document.getElementById(`feedback-${index}`);
        const userAnswer = selected ? selected.value : "";

        if (userAnswer === item.correct) {
            score++;
            feedback.innerHTML = `<span class="correct-text">✓ Đúng.</span>`;
        } else {
            feedback.innerHTML = `<span class="wrong-text">✗ Sai. Đáp án đúng: ${item.correct}</span>`;
        }
    });

    document.getElementById('live-score').innerText = score;
    saveScore(userName, score, currentQuiz.length);
    alert(`Bạn đã hoàn thành bài thi! Điểm số: ${score}/${currentQuiz.length}`);
}

function saveScore(name, score, total) {
    const key = `bxh-${total}`;
    let history = JSON.parse(localStorage.getItem(key)) || [];
    history.push({ name, score, total });
    history.sort((a, b) => b.score - a.score);
    localStorage.setItem(key, JSON.stringify(history.slice(0, 10)));
    updateLeaderboard();
}

function updateLeaderboard() {
    const showBXH = (id, key) => {
        const data = JSON.parse(localStorage.getItem(key)) || [];
        document.querySelector(`#${id} tbody`).innerHTML = data.map(item => 
            `<tr><td>${item.name}</td><td>${item.score}/${item.total}</td></tr>`
        ).join('');
    };
    showBXH('bxh-60', 'bxh-60');
    showBXH('bxh-343', 'bxh-343');
}

function resetLeaderboard() {
    if(confirm("Xóa toàn bộ lịch sử điểm số?")) {
        localStorage.clear();
        updateLeaderboard();
    }
}
