
document.addEventListener("DOMContentLoaded", () => {
    const phishingBtn = document.getElementById("phishing-btn");
    const phishingAlert = document.getElementById("phishing-alert");
  
    phishingBtn.addEventListener("click", () => {
      phishingAlert.style.display = "block";
      phishingBtn.disabled = true;
    });
  
  
    loadQuestion();
    startTimer();
    showRandomTip();
  });
  
  
  const questions = [
    {
      question: "O que é phishing?",
      options: [
        "Um tipo de ataque de engenharia social",
        "Um software antivírus",
        "Um protocolo de segurança",
        "Uma criptomoeda"
      ],
      answer: 0
    },
    {
      question: "Qual dessas senhas é mais segura?",
      options: [
        "12345678",
        "senha123",
        "Q@1vZ!9k",
        "meunome2023"
      ],
      answer: 2
    },
    {
      question: "O que fazer ao receber um e-mail suspeito?",
      options: [
        "Clicar no link para ver do que se trata",
        "Responder pedindo mais informações",
        "Ignorar e marcar como spam",
        "Encaminhar para todos os contatos"
      ],
      answer: 2
    }
  ];
  
  let currentQuestion = 0;
  let score = 0;
  let timerInterval;
  let seconds = 0;
  
  function loadQuestion() {
    const questionEl = document.getElementById("quiz-question");
    const optionsEl = document.getElementById("quiz-options");
    const resultEl = document.getElementById("quiz-result");
    const question = questions[currentQuestion];
  
    resultEl.textContent = "";
    questionEl.textContent = question.question;
    optionsEl.innerHTML = "";
  
    question.options.forEach((option, index) => {
      const btn = document.createElement("button");
      btn.textContent = option;
      btn.classList.add("quiz-option");
      btn.addEventListener("click", () => checkAnswer(index));
      optionsEl.appendChild(btn);
    });
  }
  
  function checkAnswer(selected) {
    const question = questions[currentQuestion];
    const resultEl = document.getElementById("quiz-result");
  
    if (selected === question.answer) {
      score++;
      resultEl.textContent = "✅ Resposta correta!";
      resultEl.style.color = "green";
    } else {
      resultEl.textContent = "❌ Resposta incorreta.";
      resultEl.style.color = "red";
    }
  
    currentQuestion++;
    if (currentQuestion < questions.length) {
      setTimeout(() => {
        loadQuestion();
      }, 1000);
    } else {
      clearInterval(timerInterval);
      setTimeout(() => {
        showFinalResult();
      }, 1000);
    }
  }
  
  function showFinalResult() {
    const quizEl = document.querySelector(".quiz");
    let feedback = "";
  
    if (score === questions.length) {
      feedback = "Excelente! Você domina os conceitos básicos!";
    } else if (score >= 2) {
      feedback = "Muito bem! Mas ainda pode melhorar.";
    } else {
      feedback = "Vamos estudar mais um pouco sobre segurança digital.";
    }
  
    quizEl.innerHTML = `
      <h2>Quiz Finalizado 🧠</h2>
      <p>Você acertou <strong>${score}</strong> de <strong>${questions.length}</strong> perguntas.</p>
      <p>Tempo total: <strong>${seconds} segundos</strong>.</p>
      <p>${feedback}</p>
      <button id="restart-btn">Refazer Quiz</button>
    `;
  
    document.getElementById("restart-btn").addEventListener("click", restartQuiz);
  }
  
  function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    seconds = 0;
    document.querySelector(".quiz").innerHTML = `
      <h2>Quiz de Cibersegurança</h2>
      <p id="quiz-question"></p>
      <div id="quiz-options"></div>
      <p id="quiz-result"></p>
    `;
    loadQuestion();
    startTimer();
  }
  
  function startTimer() {
    const timerEl = document.getElementById("quiz-timer");
    timerInterval = setInterval(() => {
      seconds++;
      if (timerEl) timerEl.textContent = `⏱️ Tempo: ${seconds}s`;
    }, 1000);
  }
  
 
  function checkPasswordStrength(password) {
    const strengthEl = document.getElementById("password-strength");
  
    const strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&_])[A-Za-z\d@$!%*?#&_]{8,}$/;
  
    if (strongRegex.test(password)) {
      strengthEl.textContent = "Senha forte 💪";
      strengthEl.style.color = "green";
    } else if (password.length >= 6) {
      strengthEl.textContent = "Senha média ⚠️";
      strengthEl.style.color = "orange";
    } else {
      strengthEl.textContent = "Senha fraca ❌";
      strengthEl.style.color = "red";
    }
  }
  
  
  const tips = [
    "Nunca compartilhe sua senha com outras pessoas.",
    "Use autenticação de dois fatores sempre que possível.",
    "Evite clicar em links suspeitos de e-mails desconhecidos.",
    "Atualize seu software e antivírus regularmente.",
    "Use senhas únicas para cada serviço que utiliza."
  ];
  
  function showRandomTip() {
    const tipEl = document.getElementById("seguranca-tip");
    const randomIndex = Math.floor(Math.random() * tips.length);
    tipEl.textContent = `💡 Dica de Segurança: ${tips[randomIndex]}`;
  }
  