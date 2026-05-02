const originalQuiz = [
    {
        q: "Theo Thông tư 05/2025/TT-BCT: Tổ máy phát điện của bạn phải vận hành trong dải tần số nào?",
        A: "48 Hz đến 50 Hz.",
        B: "48 Hz đến 51 Hz.",
        C: "49 Hz đến 50 Hz.",
        D: "49 Hz đến 51 Hz.",
        correct: "D"
    },
    {
        q: "Theo Thông tư 06/2025/TT-BCT: Điều khiển tần số thứ cấp yêu cầu độ lệch chuẩn không quá bao nhiêu?",
        A: "50 +- 0,1 Hz",
        B: "50 +- 0,5 Hz",
        C: "50 +- 0,02 Hz",
        D: "50 +- 0,2 Hz",
        correct: "D"
    }
];

let currentQuestions = [];

function startQuiz(limit) {
    // Xáo trộn ngẫu nhiên và lấy số lượng câu theo yêu cầu
    currentQuestions = [...originalQuiz].sort(() => 0.5 - Math.random()).slice(0, limit);
    
    document.getElementById('setup-box').style.display = 'none';
    document.getElementById('quiz-box').style.display = 'block';
    
    renderQuiz();
}

function renderQuiz() {
    const container = document.getElementById('quiz-content');
    container.innerHTML = currentQuestions.map((item, index) => `
        <div class="question-item" id="q-container-${index}">
            <p><strong>Câu ${index + 1}:</strong> ${item.q}</p>
            <label><input type="radio" name="q${index}" value="A"> A. ${item.A}</label>
            <label><input type="radio" name="q${index}" value="B"> B. ${item.B}</label>
            <label><input type="radio" name="q${index}" value="C"> C. ${item.C}</label>
            <label><input type="radio" name="q${index}" value="D"> D. ${item.D}</label>
            <div id="ans-${index}" class="feedback"></div>
        </div>
    `).join('');
}

function submitQuiz() {
    let score = 0;
    
    currentQuestions.forEach((item, index) => {
        const selected = document.querySelector(`input[name="q${index}"]:checked`);
        const qContainer = document.getElementById(`q-container-${index}`);
        const feedback = document.getElementById(`ans-${index}`);
        const userValue = selected ? selected.value : "Chưa trả lời";

        // Khóa không cho chọn lại
        const options = document.querySelectorAll(`input[name="q${index}"]`);
        options.forEach(opt => opt.disabled = true);

        if (userValue === item.correct) {
            score++;
            qContainer.classList.add('correct');
            feedback.innerHTML = `<span style="color: green;">✔ Đúng!</span>`;
        } else {
            qContainer.classList.add('wrong');
            feedback.innerHTML = `<span style="color: red;">✘ Sai. Đáp án đúng là: ${item.correct}</span>`;
        }
    });

    // Hiện bảng điểm và cuộn lên đầu
    document.getElementById('result-summary').style.display = 'block';
    document.getElementById('score-text').innerText = `Kết quả: ${score} / ${currentQuestions.length} câu đúng`;
    document.getElementById('submit-btn').style.display = 'none';
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
