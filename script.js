  // Seleciona todos os links do menu
const navLinks = document.querySelectorAll('nav a');

// Seleciona todas as seções principais
const sections = document.querySelectorAll('main section');


  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
      const target = link.dataset.target;

      sections.forEach(section => {
        if(section.id === target) {
          section.classList.add('active');
        } else {
          section.classList.remove('active');
        }
      });
    });
  });

  // Quizzes Data
  const quizzes = {
    geral: [
      {
        question: "Qual das senhas abaixo é mais segura?",
        answers: [
          { text: "maria123", correct: false },
          { text: "@M@r1a#2024!", correct: true },
          { text: "123456", correct: false }
        ],
        feedbackCorrect: "✅ Correto! Essa senha é forte e segura.",
        feedbackWrong: "❌ Incorreto. Essa senha é fraca e previsível."
      },
      {
        question: "Por que é importante atualizar seu antivírus e sistema?",
        answers: [
          { text: "Para melhorar o visual do sistema", correct: false },
          { text: "Para proteger contra novas ameaças e falhas", correct: true },
          { text: "Para deixar o computador mais lento", correct: false }
        ],
        feedbackCorrect: "✅ Correto! Atualizações corrigem vulnerabilidades.",
        feedbackWrong: "❌ Não. Atualizações protegem, não atrapalham o desempenho."
      }
    ],
    senhas: [
      {
        question: "Qual prática aumenta a segurança da sua conta online?",
        answers: [
          { text: "Usar a mesma senha para várias contas", correct: false },
          { text: "Ativar autenticação em duas etapas (2FA)", correct: true },
          { text: "Compartilhar a senha com amigos para backup", correct: false }
        ],
        feedbackCorrect: "✅ Isso! A autenticação em duas etapas protege sua conta.",
        feedbackWrong: "❌ Não é isso. Nunca compartilhe senha e não reutilize."
      },
      {
        question: "O que é recomendado para criar uma senha forte?",
        answers: [
          { text: "Nome do seu pet", correct: false },
          { text: "Combinação de letras, números e símbolos", correct: true },
          { text: "Sua data de nascimento", correct: false }
        ],
        feedbackCorrect: "✅ Isso! Use combinações difíceis de adivinhar.",
        feedbackWrong: "❌ Errado. Evite informações fáceis de descobrir."
      }
    ],
    phishing: [
      {
        question: "O que é phishing?",
        answers: [
          { text: "Um tipo de vírus de computador", correct: false },
          { text: "Golpe que usa e-mails falsos para roubar dados", correct: true },
          { text: "Atualização de software", correct: false }
        ],
        feedbackCorrect: "✅ Exato! Phishing é uma fraude por e-mail ou mensagem.",
        feedbackWrong: "❌ Errado. Phishing é golpe, não vírus nem atualização."
      },
      {
        question: "Como identificar um e-mail de phishing?",
        answers: [
          { text: "E-mails com erros de português e links estranhos", correct: true },
          { text: "E-mails enviados por seus contatos de confiança", correct: false },
          { text: "E-mails com anexos que você pediu", correct: false }
        ],
        feedbackCorrect: "✅ Correto! Erros e links suspeitos são sinais de phishing.",
        feedbackWrong: "❌ Não. Preste atenção aos erros e links suspeitos."
      }
    ],
    wifi: [
      {
        question: "Qual é a melhor prática para usar redes Wi-Fi públicas com segurança?",
        answers: [
          { text: "Acessar contas bancárias normalmente", correct: false },
          { text: "Utilizar uma VPN para criptografar o tráfego", correct: true },
          { text: "Desligar o Wi-Fi para economizar bateria", correct: false }
        ],
        feedbackCorrect: "✅ Correto! VPN protege seus dados em redes públicas.",
        feedbackWrong: "❌ Errado. Evite usar redes públicas sem proteção."
      },
      {
        question: "Por que alterar a senha padrão do roteador é importante?",
        answers: [
          { text: "Para evitar que invasores acessem suas configurações", correct: true },
          { text: "Para aumentar a velocidade da internet", correct: false },
          { text: "Para economizar energia", correct: false }
        ],
        feedbackCorrect: "✅ Isso! Senhas padrão são fáceis de ser descobertas.",
        feedbackWrong: "❌ Errado. Senha padrão é vulnerável."
      }
    ],
    backup: [
      {
        question: "Qual é a principal vantagem de fazer backups regulares?",
        answers: [
          { text: "Recuperar arquivos em caso de perda ou ataque", correct: true },
          { text: "Melhorar a performance do computador", correct: false },
          { text: "Economizar espaço no disco", correct: false }
        ],
        feedbackCorrect: "✅ Exato! Backup garante que seus dados estejam seguros.",
        feedbackWrong: "❌ Errado. Backup não afeta performance."
      },
      {
        question: "Por que manter o antivírus sempre atualizado é fundamental?",
        answers: [
          { text: "Para detectar e neutralizar as ameaças mais recentes", correct: true },
          { text: "Para liberar mais espaço no disco", correct: false },
          { text: "Para acelerar a inicialização do sistema", correct: false }
        ],
        feedbackCorrect: "✅ Isso! Atualizações garantem proteção contra novas ameaças.",
        feedbackWrong: "❌ Errado. Atualização não tem relação com espaço ou velocidade."
      }
    ]
  };

  // Elements
  const selectQuiz = document.getElementById('select-quiz');
  const quizContainer = document.getElementById('quiz-container');
  const questionText = document.getElementById('question-text');
  const answersButtons = document.getElementById('answers-buttons');
  const nextBtn = document.getElementById('next-btn');
  const feedback = document.getElementById('quiz-feedback');
  const scoreDisplay = document.getElementById('quiz-score');
  const restartBtn = document.getElementById('restart-btn');
  const scoreHistoryDiv = document.getElementById('score-history');
  const historyList = document.getElementById('history-list');
  const clearHistoryBtn = document.getElementById('clear-history');

  let currentQuiz = null;
  let currentQuestionIndex = 0;
  let score = 0;

  function loadQuiz(quizKey) {
    if (!quizKey || !quizzes[quizKey]) {
      quizContainer.style.display = 'none';
      resetQuiz();
      return;
    }
    currentQuiz = quizzes[quizKey];
    currentQuestionIndex = 0;
    score = 0;
    quizContainer.style.display = 'block';
    feedback.textContent = '';
    scoreDisplay.textContent = '';
    restartBtn.style.display = 'none';
    scoreHistoryDiv.style.display = 'block';
    loadHistory(quizKey);
    showQuestion();
  }

  function showQuestion() {
    const q = currentQuiz[currentQuestionIndex];
    questionText.textContent = q.question;
    answersButtons.innerHTML = '';
    feedback.textContent = '';
    scoreDisplay.textContent = `Pergunta ${currentQuestionIndex + 1} de ${currentQuiz.length} | Pontuação: ${score}`;
    nextBtn.style.display = 'none';

    q.answers.forEach(answer => {
      const btn = document.createElement('button');
      btn.textContent = answer.text;
      btn.style.marginRight = '0.5em';
      btn.style.marginBottom = '0.5em';
      btn.style.padding = '0.5em 1em';
      btn.style.background = 'var(--azul)';
      btn.style.color = 'white';
      btn.style.border = 'none';
      btn.style.borderRadius = '5px';
      btn.style.cursor = 'pointer';
      btn.addEventListener('click', () => selectAnswer(answer));
      answersButtons.appendChild(btn);
    });
  }

  function selectAnswer(answer) {
    const question = currentQuiz[currentQuestionIndex];
    if (answer.correct) {
      feedback.textContent = question.feedbackCorrect;
      feedback.style.color = 'green';
      score++;
    } else {
      feedback.textContent = question.feedbackWrong;
      feedback.style.color = 'red';
    }
    nextBtn.style.display = 'inline-block';
    Array.from(answersButtons.children).forEach(btn => btn.disabled = true);
  }

  nextBtn.addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < currentQuiz.length) {
      fadeOutIn(showQuestion);
    } else {
      showScore();
    }
  });

  restartBtn.addEventListener('click', () => {
    currentQuestionIndex = 0;
    score = 0;
    feedback.textContent = '';
    scoreDisplay.textContent = '';
    restartBtn.style.display = 'none';
    showQuestion();
  });

  selectQuiz.addEventListener('change', () => {
    loadQuiz(selectQuiz.value);
  });

  // Show final score with evaluation and save history
  function showScore() {
    questionText.textContent = `Fim do quiz! Sua pontuação foi ${score} de ${currentQuiz.length}.`;
    answersButtons.innerHTML = '';
    feedback.textContent = '';
    nextBtn.style.display = 'none';
    restartBtn.style.display = 'inline-block';
    scoreDisplay.textContent = evaluationMessage(score, currentQuiz.length);
    saveHistory(selectQuiz.value, score);
    loadHistory(selectQuiz.value);
  }

  // Return evaluation string based on score %
  function evaluationMessage(score, total) {
    const pct = score / total;
    if (pct === 1) return '🎉 Você é um expert em segurança digital!';
    if (pct >= 0.7) return '👍 Muito bom! Você sabe bastante sobre segurança.';
    if (pct >= 0.4) return '🙂 Pode melhorar, mas está no caminho certo.';
    return '😕 Estude mais para melhorar sua segurança digital.';
  }

  // LocalStorage keys format: "quizScores_<quizKey>"
  function saveHistory(quizKey, score) {
    if(!quizKey) return;
    let history = JSON.parse(localStorage.getItem(`quizScores_${quizKey}`)) || [];
    const timestamp = new Date().toLocaleString();
    history.unshift({ score, date: timestamp });
    if(history.length > 10) history.pop();
    localStorage.setItem(`quizScores_${quizKey}`, JSON.stringify(history));
  }

  function loadHistory(quizKey) {
    if(!quizKey) {
      scoreHistoryDiv.style.display = 'none';
      return;
    }
    let history = JSON.parse(localStorage.getItem(`quizScores_${quizKey}`)) || [];
    historyList.innerHTML = '';
    if(history.length === 0) {
      historyList.innerHTML = '<li>Nenhum resultado salvo ainda.</li>';
    } else {
      history.forEach(entry => {
        const li = document.createElement('li');
        li.textContent = `${entry.date} — Pontuação: ${entry.score}`;
        historyList.appendChild(li);
      });
    }
  }

  clearHistoryBtn.addEventListener('click', () => {
    const quizKey = selectQuiz.value;
    if(!quizKey) return;
    if(confirm('Tem certeza que quer limpar o histórico deste quiz?')) {
      localStorage.removeItem(`quizScores_${quizKey}`);
      loadHistory(quizKey);
    }
  });

  // Fade animation helper
  function fadeOutIn(callback) {
    quizContainer.style.opacity = 0;
    setTimeout(() => {
      callback();
      quizContainer.style.opacity = 1;
    }, 300);
  }

