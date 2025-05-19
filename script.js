function showSection(id) {
  const sections = document.querySelectorAll('.section');
  sections.forEach(section => section.classList.remove('active'));
  const current = document.getElementById(id);
  current.classList.add('active');

  // При открытии показать сохранённый результат
  const result = localStorage.getItem(`result_${id}`);
  const resultBox = current.querySelector('.result');
  if (resultBox && result) {
    resultBox.textContent = result;
  }
}

function checkQuiz(num) {
  const form = document.getElementById("quizForm" + num);
  const section = form.closest('#test' + num);
  const sectionId = section.id;

  let score = 0;
  const totalQuestions = 10;
  for (let i = 1; i <= totalQuestions; i++) {
    const answer = form.querySelector(`input[name="q${i}"]:checked`);
    if (answer && answer.value === "1") {
      score++;
    }
  }

  let grade;
  if (score >= 9) {
    grade = "Отлично";
  } else if (score >= 7) {
    grade = "Хорошо";
  } else if (score >= 5) {
    grade = "Удовлетворительно";
  } else {
    grade = "Неудовлетворительно";
  }

  const resultText = `Оценка: ${grade} (${score}/10)`;

  const resultBox = section.querySelector('.result');
  resultBox.textContent = resultText;

  // Сохраняем в localStorage
  localStorage.setItem(`result_${sectionId}`, resultText);

  // Блокируем все радиокнопки после проверки
  const radioButtons = form.querySelectorAll('input[type="radio"]');
  radioButtons.forEach(button => {
    button.disabled = true;
  });

  // Блокируем кнопку "Проверить", чтобы нельзя было нажать повторно
  const submitBtn = section.querySelector('#submitBtn');
  submitBtn.disabled = true;
}
