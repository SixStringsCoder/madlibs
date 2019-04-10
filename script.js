// Content Object
const model = {
  title: "Space Shuttle",
  posp: ["noun", "noun", "adjective", "plural noun", "verb ending in 'ing'", "plural noun", "a city", "plural noun", "number", "something round", "number", "adverb", "a place", "adjective"],
  paragraph: 'In 1981, the U.S. launched the first real Space * . It was called a/an * Shuttle because it not only went up into * space, it also came back. It was named the "Columbia" and was piloted by two brave * . They had practiced * for two years and were expert * . The Columbia took off from * using its powerful first stage * . At an altitude of * feet, it went into orbit around the * . After * orbits, the Shuttle landed * at * . It was a/an * day for the U.S. Space Program.',
}

// Render to DOM Object
const view = {
  init: function() {
    this.madform = document.querySelector('#form-group');
    this.title = document.querySelector('#title');
    this.resultsCont = document.querySelector('.results-container');
    this.results_paragraph = document.querySelector('#results-paragraph');
    this.submit = document.querySelector('#submit-entries');
    this.clear = document.querySelector('#clear-entries');
    this.renderTitle();
    this.renderForm();
    this.submit.addEventListener('click', () => this.renderResults());
    this.clear.addEventListener('click', () => this.clearForm());
  },

  renderTitle: function() {
    const title = manager.getTitle();
    return this.madform.innerHTML +=
    `<div class="container">
      <h1 class="text-center" id="title">${title}</h1>
      <p class="lead text-center">Fill in the blanks with the words called for. <br />Then click <em>Make MadLib!</em></p>
    </div>`;
  },

  renderForm: function() {
    const posp = manager.getPosp();
    posp.map((speech, index) => {
      return this.madform.innerHTML +=
      `<div class="form-inline">
         <label for="exampleInputEmail1" class="mr-4 mt-3" id="posp${index}">${speech}:</label>
         <input type="text" class="form-control inputs" id="answer${index}" aria-describedby="${speech}">
       </div>`;
    });
  },

  answersToArray: function() {
    let answersArray = [];
    this.inputs = document.querySelectorAll('.inputs');
    for (let i = 0; i < this.inputs.length; i++) {
      answersArray.push(this.inputs[i].value);
    }
    return answersArray;
  },

  renderResults: function() {
    let answers = this.answersToArray();
    let p_no_answers = manager.getParagraph().split(' ');
    let c = -1;
    const p_w_answers = p_no_answers.map((word) => {
      if (word === "*") {
        c += 1
        return word = `<span class="blank answer">${answers[c]}</span>`;
      } else {
        return word;
      }
    });
    this.showResults();
    return this.results_paragraph.innerHTML = p_w_answers.join(' ');
  },

  showResults: function() {
    this.resultsCont.style.width = "100%";
    this.resultsCont.style.height = "50%";
    this.resultsCont.style.visibility = "visible";
  },

  clearForm: function() {
    this.inputs = document.querySelectorAll('.inputs');

    this.inputs.forEach(input => {
      input.value = "";
    });
    this.resultsCont.style.width = "0%";
    this.resultsCont.style.height = "0%";
    this.resultsCont.style.visibility = "hidden";
  }

}

// Delegate between model and view
const manager = {
  init: () => view.init(),
  getTitle: () => model.title,
  getPosp: () => model.posp,
  getParagraph: () => model.paragraph
}

// Starts here
manager.init();
