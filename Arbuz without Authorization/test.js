document.body.innerHTML = "Loading...";
const url = "https://opentdb.com/api.php?amount=10&category=26";
fetch(url)
  .then((res) => res.json())
  .then((data) => data.results)
  .then((questions) => {
    console.log(questions);
    document.body.innerHTML = "<h1>Test</h1>";
    questions.forEach((data, ind) => {
      if (data.type == "multiple") {
        document.body.appendChild(createMultipleChoiceQuestion(data, ind));
      } else if (data.type == "boolean") {
        document.body.appendChild(createTrueFalseQuestion(data, ind));
      }
    });

    const answers = questions.map((question) => question.correct_answer);
    document.body.appendChild(createSubmitButton(answers));
  })
  .catch((error) => {
    document.body.innerHTML = `<p>Error occured. Error: ${error}</p>`;
  });

console.log("hi");

function createMultipleChoiceQuestion(data, ind) {
  const { question, incorrect_answers, correct_answer } = data;
  var questionDiv = document.createElement("div");

  var questionParagraph = document.createElement("p");
  questionParagraph.textContent = question;
  questionDiv.appendChild(questionParagraph);

  const randomInd = Math.floor(Math.random() * 3);
  incorrect_answers.splice(randomInd, 0, correct_answer);
  const choices = incorrect_answers;

  choices.forEach((choice) => {
    var label = document.createElement("label");

    var input = document.createElement("input");
    input.setAttribute("type", "radio");
    input.setAttribute("name", "choices" + ind);
    input.setAttribute("value", choice);

    label.appendChild(input);

    label.appendChild(document.createTextNode(choice));

    questionDiv.appendChild(label);

    var lineBreak = document.createElement("br");
    questionDiv.appendChild(lineBreak);
  });

  return questionDiv;
}

function createTrueFalseQuestion(data, ind) {
  var questionDiv = document.createElement("div");

  var questionParagraph = document.createElement("p");
  questionParagraph.textContent = data.question;
  questionDiv.appendChild(questionParagraph);

  var trueLabel = document.createElement("label");
  var trueInput = document.createElement("input");
  trueInput.setAttribute("type", "radio");
  trueInput.setAttribute("name", "truefalse" + ind);
  trueInput.setAttribute("value", "true");
  trueLabel.appendChild(trueInput);
  trueLabel.appendChild(document.createTextNode("True"));
  questionDiv.appendChild(trueLabel);

  var falseLabel = document.createElement("label");
  var falseInput = document.createElement("input");
  falseInput.setAttribute("type", "radio");
  falseInput.setAttribute("name", "truefalse");
  falseInput.setAttribute("value", "false");
  falseLabel.appendChild(falseInput);
  falseLabel.appendChild(document.createTextNode("False"));
  questionDiv.appendChild(falseLabel);

  return questionDiv;
}

function createSubmitButton(answers) {
  var submitButton = document.createElement("button");
  submitButton.setAttribute("type", "submit");
  submitButton.textContent = "Submit";

  submitButton.addEventListener("click", (e) => {
    e.preventDefault();
    const selectedInputs = document.querySelectorAll("input")

    const selectedAnswers = Array.from(selectedInputs)
    .filter(input => input.checked)
    .map(input => input.value);

  if (selectedAnswers.length != answers.length) {
    alert("Please answer all the questions");
  }

  let correctAnswers = 0;

  for (let i = 0; i < answers.length; i++) {
    if (answers[i] == selectedAnswers[i]) {
      correctAnswers++;
    }
  }

  alert(`You answered correctly ${correctAnswers} questions out of ${answers.length}` )
  });

  return submitButton;
}
