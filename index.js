const STORE = {
  currentQuestionNum: 0,
  answeredCorrectly: 0,
  totalQuestions: 5,
  quizStarted: false,
  correctAnsImage: "images/correct_owl.png",
  incorrectAnsImage: "images/confused_owl.png",
  resultsImage: "images/final_results.png",

  questions: [
    {
      question: "A group of Gambel’s quail is known as a: ",
      answers: ["Battery ", "Shake", "Drift", "Flush", "All of the above"],
      correctAnswerIndex: 4,
      image: "images/quail_image.png"
    },
    {
      question: "The Turkey Vulture’s wingspan can be up to: ",
      answers: ["3 ft", "4 ft", "6 ft", "8 ft"],
      correctAnswerIndex: 2,
      image: "images/turkey_vulture.jpg"
    },
    {
      question: "The Greater Roadrunner can run up to speeds of: ",
      answers: ["16 mph", "22 mph", "26 mph", "30 mph"],
      correctAnswerIndex: 2,
      image: "images/roadrunner.jpg"
    },
    {
      question:
        "Which of the following is true about the Double-crested cormorant?",
      answers: [
        "It can dive up to 25 ft deep",
        "It’s feathers are not waterproof",
        "It almost never makes a sound",
        "None of the above",
        "All of the above"
      ],
      correctAnswerIndex: 4,
      image: "images/doublecrestedcormorant.jpg"
    },
    {
      question:
        "A female Anna’s Humingbird can eat up to how many insects per day?",
      answers: ["100", "500", "1000", "2000"],
      correctAnswerIndex: 3,
      image: "images/hummingbird_image.png"
    },
    
  ]
};

const QUESTION_BOX = $(".js-question-and-answers");
const QUIZ_STATUS = $(".js-question-number-and-score");

function displayWelcome() {
  QUESTION_BOX.html(
    `<h2 class="welcome-title">Welcome!</h2>
                  <div class="js-question-image">
                  <img src='images/welcome_roadrunner_head.png'>
                  </div>
                  <p class="welcome-message">How much do you know about Sonoran Desert birds?</p>

                  <button id="js-start-button">Start Quiz!</button>`
  );
  QUESTION_BOX.addClass("js-welcome");
}

function startQuiz() {
  STORE.currentQuestionNum = 0;
  STORE.quizStarted = false;
  STORE.answeredCorrectly = 0;
  displayQuestionBox();
  displayQuestionNumberAndScore();
}

function handleRestartQuiz() {
  QUESTION_BOX.on("click", ".js-restart-button", function(event) {
    QUESTION_BOX.removeClass("js-results")
    startQuiz();
  });
}

function displayQuestionNumberAndScore() {
  // this expression prevents displaying as question 6/5.
  // makes sure that it only displays up to 5/5
  const quesNumber =
    STORE.currentQuestionNum < STORE.totalQuestions
      ? STORE.currentQuestionNum + 1
      : STORE.currentQuestionNum;
  QUIZ_STATUS.html(`<span>Question: ${quesNumber}/${STORE.totalQuestions}</span>
          <span>Score: ${STORE.answeredCorrectly}/${STORE.totalQuestions}</span>`);
}

function displayQuestionBox() {
  QUESTION_BOX.html(
    `<form id="js-questions">
              <fieldset>
              ${displayQuestion()}
              ${displayQuestionImage()}
              <div class="form-options">
              ${displayOptions()}
              
                <button type="submit" id="js-submit-answer">Submit</button>
                </div>
                </fieldset>
            </form>`
  );
}

function displayQuestion() {
  const question = getQuestion();
  const htmlQuestionString = `<legend>${question}</legend>`;
  return htmlQuestionString;
}

function displayOptions() {
  const options = getOptions();
  // ** get rid of <br> below
  const htmlOptionsString = options
    .map(
      (el, i) =>
        `<div class="inputs-labels"><input type="radio" id="option${i}" name="options" value="${i}">
               <label for="option${i}">${el}</label></div>`
    )
    .join("");
  return htmlOptionsString;
}

function displayQuestionImage() {
  const image = getQuesImage();
  const htmlImageString = `<div><img src="${image}" /></div>`;
  return htmlImageString;
}

function getQuestion() {
  return STORE.questions[STORE.currentQuestionNum].question;
}

function getOptions() {
  return STORE.questions[STORE.currentQuestionNum].answers;
}

function getQuesImage() {
  return STORE.questions[STORE.currentQuestionNum].image;
}

function handleClickStart() {
  QUESTION_BOX.on("click", "#js-start-button", function(event) {
    STORE.quizStarted = true;
    QUESTION_BOX.removeClass("js-welcome");
    startQuiz();
  });
}

function handleSubmitAnswer() {
  QUESTION_BOX.on("click", "#js-submit-answer", function(event) {
    event.preventDefault();
    evaluateAnswer($("#js-questions input:checked").val());
  });
}

function evaluateAnswer(userAnswer) {
  if (userAnswer === undefined) {
    alert("Please choose an answer");
    return;
  }
  const isCorrect = parseInt(userAnswer, 10) === getCorrectAnswerIndex();
  displayFeedback(isCorrect);
}

function getCorrectAnswerIndex() {
  const correctAnswerIndex =
    STORE.questions[STORE.currentQuestionNum].correctAnswerIndex;
  return correctAnswerIndex;
}

function getCorrectAnswer() {
  const correctAnswer =
    STORE.questions[STORE.currentQuestionNum].answers[getCorrectAnswerIndex()];
  return correctAnswer;
}

function displayFeedback(isCorrect) {
  QUESTION_BOX.html(
    `<div class="js-correct-or-not"><h3>${displayFeedbackEvaluation(
      isCorrect
    )}</h3></div>
                  <div class="js-feedback-image">
                  <img src="${displayFeedbackImage(isCorrect)}" />
                  </div>
                  <div class="js-correct-ans-was"><h3>${displayFeedbackAnswer()}</h3></div>
                  <button type="submit" class="js-next-question">Next</button>`
  );
  if (isCorrect === true) {
    STORE.answeredCorrectly++;
  }
  displayQuestionNumberAndScore();
}

function displayFeedbackEvaluation(isCorrect) {
  if (isCorrect === true) {
    return `That's correct!`;
  } else {
    return `That's incorrect`;
  }
}

function displayFeedbackImage(isCorrect) {
  if (isCorrect === true) {
    return STORE.correctAnsImage;
  } else {
    return STORE.incorrectAnsImage;
  }
}

function displayFeedbackAnswer(isCorrect) {
  return `The correct answer was: ${getCorrectAnswer()}`;
}


function handleClickNext() {
  QUESTION_BOX.on("click", ".js-next-question", function(event) {
    event.preventDefault();
    STORE.currentQuestionNum++;
    displayQuestionNumberAndScore();
    if (STORE.currentQuestionNum < STORE.totalQuestions) {
      displayQuestionBox();
    } else {
      displayResults();
    }
  });
}

function displayResults() {
  QUESTION_BOX.html(
    `<h3 class="result-final-score">Your answered ${STORE.answeredCorrectly} 
    out of ${STORE.totalQuestions} questions correctly</h3>
                  <div class="js-display-image">
                  <img src="${displayResultsImage()}" />
                  </div>
                  <button type="submit" class="js-restart-button">Restart</button>`
  );
  QUESTION_BOX.addClass("js-results");

}

function displayResultsImage() {
  return STORE.resultsImage;
}

function makeQuiz() {
  handleSubmitAnswer();
  handleClickStart();
  handleClickNext();
  handleRestartQuiz();
  displayWelcome();
}

$(makeQuiz);