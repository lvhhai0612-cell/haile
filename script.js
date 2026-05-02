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
        q: "Theo Thông tư 06/2025/TT-BCT: Điều khiển tần số thứ cấp yêu cầu độ lệch chuẩn không quá?",
        A: "50 +- 0,1 Hz",
        B: "50 +- 0,5 Hz",
        C: "50 +- 0,02 Hz",
        D: "50 +- 0,2 Hz",
        correct: "D"
    }
    // Bạn hãy thêm tiếp các câu hỏi khác vào đây theo mẫu trên
];

let currentQuestions = [];

function startQuiz(limit) {
    // Xáo trộn và lấy số lượng câu hỏi yêu cầu
    currentQuestions = [...originalQuiz].sort(() => 0.5 - Math.random()).slice(0, limit);
    
    document.querySelector('.controls').style.display = 'none';
    document.getElementById('quiz-box').style.display = 'block';
    
    renderQuiz();
}

function renderQuiz() {
    const container = document.getElementById('quiz-content');
    container.innerHTML = currentQuestions.map((item, index) => `
        <div class="question-item">
            <p><strong>Câu ${index + 1}:</strong> ${item.q}</p>
            <label><input type="radio" name="q${index}" value="A"> A. ${item.A}</label><br>
            <label><input type="radio" name="q${index}" value="B"> B. ${item.B}</label><br>
            <label><input type="radio" name="q${index}" value="C"> C. ${item.C}</label><br>
            <label><input type="radio" name="q${index}" value="D"> D. ${item.D}</label>
        </div>
    `).join('');
}

function submitQuiz() {
    let score = 0;
    const container = document.getElementById('quiz-content');
    
    // Duyệt qua từng câu hỏi để kiểm tra kết quả
    currentQuestions.forEach((item, index) => {
        const selected = document.querySelector(`input[name="q${index}"]:checked`);
        const questionDiv = document.getElementsByClassName('question-item')[index];
        
        let resultHTML = `<div class="result-detail">`;
        
        if (selected && selected.value === item.correct) {
            score++;
            questionDiv.style.backgroundColor = "#d4edda"; // Màu xanh cho câu đúng
            resultHTML += `<b style="color: green;">✔ Đúng!</b>`;
        } else {
            questionDiv.style.backgroundColor = "#f8d7da"; // Màu đỏ cho câu sai
            const userAnswer = selected ? selected.value : "Chưa chọn";
            resultHTML += `<b style="color: red;">✘ Sai!</b> (Bạn chọn: ${userAnswer} - Đáp án đúng: ${item.correct})`;
        }
        
        resultHTML += `</div>`;
        
        // Hiển thị kết quả ngay dưới mỗi câu hỏi
        const existingResult = questionDiv.querySelector('.result-detail');
        if (existingResult) existingResult.remove(); // Xóa kết quả cũ nếu có
        questionDiv.insertAdjacentHTML('beforeend', resultHTML);
    });

    // Hiển thị tổng điểm ở phía trên hoặc dưới
    document.getElementById('result-box').style.display = 'block';
    document.getElementById('score').innerText = `Kết quả cuối cùng: Bạn đúng ${score}/${currentQuestions.length} câu.`;
    
    // Cuộn lên đầu trang để xem điểm
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
    });

    document.getElementById('quiz-box').style.display = 'none';
    document.getElementById('result-box').style.display = 'block';
    document.getElementById('score').innerText = `Bạn đúng ${score}/${currentQuestions.length} câu.`;
}
