// Array of questions for the quiz
const questions = [
  {
      image: "assets/ai_landscapes/468331822_122208244970035764_2282908482191597704_n.jpg",
      correctAnswer: true,
      type: "AI"

  },
  {
      image: "assets/real_landscapes/247367268_572330697156069_2979847651387129907_n.jpg",
      correctAnswer: false,
      type: "Real"
  },
  {
      image: "assets/real_landscapes/Henrhyd-waterfall-my-favourite-photograph-of-the-day.jpg",
      correctAnswer: false,
      type: "Real"
  },
  {
      image: "assets/ai_animals/466102111_508915815459459_6813336929034864895_n.jpg",
      correctAnswer: true,
      type: "AI"

  },
  {
      image: "assets/real_animals/467543187_10227515988549544_75484108812622918_n.jpg",
      correctAnswer: false,
      type: "Real"
  },
  {
      image: "assets/real_animals/467373377_10234149334770747_6084234588927059719_n.jpg",
      correctAnswer: false,
      type: "Real"
  },
  {
      image: "assets/ai_landscapes/468703483_122209771808035764_8016437906056550943_n.jpg",
      correctAnswer: true,
      type: "AI"

  },
  {
      image: "assets/ai_landscapes/469308913_122209617578035764_2590018170392023291_n.jpg",
      correctAnswer: true,
      type: "AI"


  },
  {
      image: "assets/real_landscapes/278158564_715097739903722_8877496179328899826_n.jpeg",
      correctAnswer: false,
       type: "Real"
  },
  {
      image: "assets/ai_landscapes/469442975_122209929326035764_2121258949118876146_n.jpg",
      correctAnswer: true,
      type: "AI"

  }
];

// Variables to track the current question and quiz state
let currentQuestion = {}; // Stores the question currently being displayed
let questionCount = 0; // Tracks the number of questions answered
let correctCount = 0; // Tracks the number of correct answers
let incorrectCount = 0; // Tracks the number of incorrect answers
const maxQuestions = 10; // Maximum number of questions in the quiz

/**
* Function to get a random question that has not been asked yet.
*/
function getRandomQuestion() {
  const askedQuestions = JSON.parse(localStorage.getItem("askedQuestions") || "[]");

  // Filter out the already asked questions from the full question list
  const remainingQuestions = questions.filter(q => !askedQuestions.includes(q.image));

  // If there are no remaining questions, return null to signal the end of the quiz
  if (remainingQuestions.length === 0) {
      return null;
  }

  // Pick a random question from the remaining questions
  const randomIndex = Math.floor(Math.random() * remainingQuestions.length);
  return remainingQuestions[randomIndex];
}

/**
* Function to display a question on the page.
*/
function displayQuestion() {
  const questionElement = document.getElementById("quiz-image"); // Get the image element for the quiz

  // Get a random question and update the current question
  currentQuestion = getRandomQuestion();

  // If there are no more questions or the maximum number of questions has been reached
  if (currentQuestion === null || questionCount >= maxQuestions) {
      displayResults(); // Call the function to display results
      return; // Exit the function
  }

  // Set the image source to the current question's image
  questionElement.src = currentQuestion.image;

  // Clear any feedback message and hide the "Next Question" button
  document.getElementById("feedback-message").textContent = "";
  document.getElementById("next-button").style.display = "none";
}

/**
* Function to check if the selected answer is correct.
*/
function checkAnswer(selectedAnswer) {
  const feedbackMessageElement = document.getElementById("feedback-message"); // Get the feedback message element

  // Compare the selected answer with the correct answer for the current question
  if (selectedAnswer === currentQuestion.correctAnswer) {
      feedbackMessageElement.textContent = "Correct!";
      feedbackMessageElement.style.color = "#4CAF50"; // Green for correct answers
      correctCount++; // Increment the correct answer count
  } else {
      feedbackMessageElement.textContent = "Incorrect!";
      feedbackMessageElement.style.color = "#d9534f"; // Red for incorrect answers
      incorrectCount++; // Increment the incorrect answer count
  }

  // Update the list of asked questions in localStorage
  const askedQuestions = JSON.parse(localStorage.getItem("askedQuestions") || "[]");
  askedQuestions.push(currentQuestion.image); // Add the current question to the asked list
  localStorage.setItem("askedQuestions", JSON.stringify(askedQuestions));

  // Increment the question count
  questionCount++;

  // Show the "Next Question" button
  document.getElementById("next-button").style.display = "block";
}

/**
* Function to display the results of the quiz at the end.
*/
function displayResults() {
  const quizCard = document.getElementById('quiz-card');

  // Ensure the results are displayed in the quiz card
  quizCard.innerHTML = `
      <h2>Quiz Complete!</h2>
      <p>You answered ${correctCount} questions correctly and ${incorrectCount} questions incorrectly.</p>
  `;

  // Clear localStorage to reset progress
  localStorage.removeItem("askedQuestions");
}

/**
* Function to load the next question when the "Next Question" button is clicked.
*/
function nextQuestion() {
  displayQuestion(); // Display a new question
}

// Initialize the quiz on page load
window.onload = function () {
  displayQuestion(); // Display the first question
};

// Clear localStorage when the user closes the session
window.addEventListener("beforeunload", () => {
  localStorage.removeItem("askedQuestions");
});
