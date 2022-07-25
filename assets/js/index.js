//All required elements
const start_btn = document.querySelector(".start_quiz");
const quiz_box = document.querySelector(".quiz-box");
const que_text = document.querySelector(".que_text");
const options_box = document.querySelector(".options");
const next_btn = document.querySelector(".next-btn");
const total_q = document.querySelector(".quiz-footer .total_que");
const count_que = document.querySelector(".quiz-footer .count_que");
const result_box = document.querySelector(".result-box");

const total_que_r = document.querySelector(".total-que span");
const right_ans_r = document.querySelector(".right-ans span");
const wrong_ans_r = document.querySelector(".wrong-ans span");
const percentage = document.querySelector(".percentage span");
//buttons
const again_quiz = document.querySelector(".again-quiz");
const exit = document.querySelector(".exit");
//font awesome icons
const mark_wrong = `<i class="fa fa-times"></i>`;
const mark_check = `<i class="fa fa-check"></i>`;

//Quiz questions database
var questions = [
  {
    num: 1,
    question:
      " The two straight lines in the same plane which never meet are called?",
    answer: "Parallel lines",
    options: ["Angles", "Transversal lines", "Vertex", "Parallel lines"],
  },
  {
    num: 2,
    question:
      " The locus of a point in a plane equidistant from a fixed point is known as?",
    answer: "Circle",
    options: ["Triangle", "Rectangle", "Hexagon", "Circle"],
  },
  {
    num: 3,
    question:
      " The opposite angles of any quadrilateral inscribed in a circle are?",
    answer: "Supplementary",
    options: ["Tangent", "Supplementary", "Complementary", "Reflective"],
  },
  {
    num: 4,
    question:
      " The set of all the ordered pair (x, y) which satisfies the system of equations is called?",
    answer: "Solution set",
    options: ["Solution set", "Null set", "Complex set", "Subset"],
  },
  {
    num: 5,
    question: " Any two angles in the same segment of a circle are?",
    answer: "Equal",
    options: ["Equal", "Not equal", "Reflective", "Opposite"],
  },
];

start_btn.onclick = () => {
  quiz_box.classList.remove("inactive");
  start_btn.classList.add("inactive");
};

total_q.innerText = questions.length;
total_que_r.innerText = questions.length;

var que_index = 0;
var right_answers = 0;
var wrong_answers = 0;

count_que.innerText = que_index + 1;

showQuestion(que_index);

function showQuestion(q_index) {
  que_text.innerText =
    questions[q_index].num + "." + questions[q_index].question;
  var option_statement = "";

  for (var i = 0; i < questions[q_index].options.length; i++) {
    option_statement += `<div class="option">${questions[q_index].options[i]}</div>`;
  }
  //to add options from db to options box
  options_box.innerHTML = option_statement;
  var AllOptions = options_box.querySelectorAll(".option");
  for (var j = 0; j < AllOptions.length; j++) {
    AllOptions[j].setAttribute("onclick", "userAnswer(this)"); // to get user answer
  }
  next_btn.classList.add("inactive");
}
next_btn.onclick = () => {
  que_index++;
  if (questions.length > que_index) {
    count_que.innerText = que_index + 1;

    showQuestion(que_index);
  } else {
    console.log("Questions Complete");
    quiz_box.classList.add("inactive");
    result_box.classList.remove("inactive");
    right_ans_r.innerText = right_answers;
    wrong_ans_r.innerText = wrong_answers;
    percentage.innerText =
      ((right_answers * 100) / questions.length).toFixed(2) + "%";
  }
  if (questions.length - 1 == que_index) {
    next_btn.innerText = "Finish";
  }
};

function userAnswer(answer) {
  let userAns = answer.innerText;
  let correctAns = questions[que_index].answer;
  var AllOptions2 = options_box.querySelectorAll(".option");
  next_btn.classList.remove("inactive");

  if (userAns == correctAns) {
    answer.classList.add("correct");
    answer.insertAdjacentHTML("beforeend", mark_check);
    right_answers++;
    const scoreText = document.querySelector(".score_text");
    if (right_answers > 3) {
      // if user scored more than 3
      //creating a new span tag and passing the user score number and total question number
      let scoreTag =
        "<span>and congrats! 🎉, You got <p>" +
        right_answers +
        " out of " +
        questions.length +
        "</p></span>";
      scoreText.innerHTML = scoreTag; //adding new span tag inside score_Text
    } else if (right_answers > 1) {
      // if user scored more than 1
      let scoreTag =
        "<span>and nice 😎, You got <p>" +
        right_answers +
        " out of " +
        questions.length +
        "</p></span>";
      scoreText.innerHTML = scoreTag;
    } else {
      // if user scored less than 1
      let scoreTag =
        "<span>and sorry 😐, You got only <p>" +
        right_answers +
        " out of " +
        questions.length +
        "</p></span>";
      scoreText.innerHTML = scoreTag;
    }
  } else {
    answer.classList.add("incorrect");
    answer.insertAdjacentHTML("beforeend", mark_wrong);
    wrong_answers++;

    for (var i = 0; i < AllOptions2.length; i++) {
      if (AllOptions2[i].innerText == correctAns) {
        AllOptions2[i].classList.add("correct");
        AllOptions2[i].insertAdjacentHTML("beforeend", mark_check);
      }
    }
  }
  // To disabled all other options
  for (var j = 0; j < AllOptions2.length; j++) {
    AllOptions2[j].classList.add("disabled");
  }
}
//Quiz again Button
again_quiz.onclick = () => {
  quiz_box.classList.remove("inactive");
  result_box.classList.add("inactive");
  reset();
};
//Exit Quiz Button
exit.onclick = () => {
  start_btn.classList.remove("inactive");
  result_box.classList.add("inactive");
  reset();
};
//to rest user result
function reset() {
  que_index = 0;
  right_answers = 0;
  wrong_answers = 0;
  count_que.innerText = que_index + 1;
  next_btn.innerText = "Next Question";
  showQuestion(que_index);
}
