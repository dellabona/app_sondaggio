const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const resultsButton = document.getElementById('results-btn');
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
let scoreText = document.getElementById('score');

let shuffledQuestions, currentQuestionIndex, score;

const questions = [
  {
    question: 'What color is a banana?',
    answers: [
      { text: 'blue', correct: false },
      { text: 'yellow', correct: true }
    ]
  },
  {
    question: 'Which of these flowers is yellow?',
    answers: [
      { text: 'Rose', correct: false },
      { text: 'Sunflower', correct: true }
    ]
  },
  {
    question: 'What is 4 * 2?',
    answers: [
      { text: '6', correct: false },
      { text: '8', correct: true }
    ]
  }
];

startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
  currentQuestionIndex++;
  setNextQuestion();
});
resultsButton.addEventListener('click', resultsPage);

function startGame() {  
  shuffledQuestions = questions.sort(() => Math.random() - .5);
  currentQuestionIndex = 0;
  score = 0;
  scoreText.innerText = `Your score: ${score}`;
  questionContainerElement.classList.remove('hide');
  startButton.classList.add('hide');
  resultsButton.classList.add('hide');
  setNextQuestion();
};

function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
};

function showQuestion(question) {
  questionElement.innerText = question.question;
  question.answers.forEach(answer => {
    const button = document.createElement('button');
    button.innerText = answer.text;
    button.classList.add('btn');
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener('click', selectAnswer);
    answerButtonsElement.appendChild(button);
  })
};

function resetState() {
  clearStatusClass(document.body);  
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);}
  nextButton.classList.add('hide');
};

function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct;
  setStatusClass(document.body, correct);
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct);
  });
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide');
  } else {
    startButton.innerText = 'Restart';
    startButton.classList.remove('hide');
    resultsButton.classList.remove('hide');
    }
};

function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {    
    element.classList.add('correct');
    updateScore();    
  } else {
    element.classList.add('wrong');
  }  
};

function updateScore(){  
  score++;
  scoreText.innerText = `Your score: ${score}`;  
}


function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
};



function resultsPage(){
  clearStatusClass(document.body);
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
  questionElement.innerText = `Each correct answer is 2 points 
  \n Wrong answer is 1 point 
  \n The correct answers were:`;
  questions.forEach(question => {
    const button = document.createElement('button');
    button.innerText = question.answers[1].text;
    button.classList.add('btn');
    button.classList.add('correct');
    answerButtonsElement.appendChild(button);
  });
  questions.forEach(question => {
    const button = document.createElement('button');
    button.innerText = question.answers[0].text;
    button.classList.add('btn');
    button.classList.add('wrong');
    answerButtonsElement.appendChild(button);
  });
  resultsButton.classList.add('hide');

};

