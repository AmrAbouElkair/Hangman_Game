// Letters
const letters: string = "abcdefghijklmnopqrstuvwxyz";

// create array from letters
let lettersArr: string[] = letters.split(""); // || Array.from(letters);

// select letters container
let lettersConatiner = document.querySelector(".letters") as HTMLDivElement;

// Generate Letters
lettersArr.forEach((letter): void => {
  // create span
  let span = document.createElement("span");
  // create text node
  let theLetter = document.createTextNode(letter);
  // append theLetter to the span
  span.appendChild(theLetter);
  // add class to the span
  span.className = "letter-box";
  // append the span to the conatiner
  lettersConatiner.appendChild(span);
});

// Object Of Words + Categories

type Words = {
  programming: string[];
  movies: string[];
  people: string[];
  countries: string[];
};
const words: Words = {
  programming: [
    "php",
    "javascript",
    "go",
    "scala",
    "fortran",
    "r",
    "mysql",
    "python",
  ],
  movies: [
    "Prestige",
    "Inception",
    "Parasite",
    "Interstellar",
    "Whiplash",
    "Memento",
    "Coco",
    "Up",
  ],
  people: [
    "Albert Einstein",
    "Hitchcock",
    "Alexander",
    "Cleopatra",
    "Mahatma Ghandi",
  ],
  countries: ["Syria", "Palestine", "Yemen", "Egypt", "Bahrain", "Qatar"],
};

// Get random Property
let allKeys: (keyof Words)[] = Object.keys(words) as (keyof Words)[];

// Random Number Depend On Keys Length
let randomPropNumber: number = Math.floor(Math.random() * allKeys.length);

// Category
let randomPropName: keyof Words = allKeys[randomPropNumber];

// Category Words
let randomPropValue: string[] = words[`${randomPropName}`];

// Random Number Depend On Words
let randomValueNumber: number = Math.floor(
  Math.random() * randomPropValue.length
);

// The Chosen Word
let randomValue: string = randomPropValue[randomValueNumber];

// Set category Info
let categorySpan = document.querySelector(
  ".game-info .category span"
) as HTMLSpanElement;
categorySpan.innerHTML = randomPropName;

// Select Letters Guess Element
let lettersGuessContainer = document.querySelector(
  ".letters-guess"
) as HTMLDivElement;

//  Convert Chosen Word To Array
let lettersAndSpace: string[] = randomValue.split(""); // || Array.from(randomValue)

// Create Spans Depened On Word
lettersAndSpace.forEach((letter: string): void => {
  // Create Empty Span
  let emptySpan = document.createElement("span") as HTMLSpanElement;
  // If Letter Is Space
  if (letter === " ") {
    emptySpan.className = "with-space";
  }
  // Append Span To The Letters Guess Container
  lettersGuessContainer.appendChild(emptySpan);
});

// Select Guess Spans
let guessSpans = document.querySelectorAll(
  ".letters-guess span"
) as NodeListOf<HTMLSpanElement>;

// set wrond attempts
let wrongAttempts = 0;

// Select the draw element
let theDraw = document.querySelector(".hangman-draw") as HTMLDivElement;

// Handle Clicking On Letters
document.addEventListener("click", (e) => {
  // set the choose status
  let theStatus: boolean = false;
  let totalWord: string = "";

  if ((e.target as Element).className === "letter-box") {
    (e.target as Element).classList.add("clicked");

    //   Get Clicked Letter
    let theClickedLetter = (e.target as Element).innerHTML.toLowerCase();

    //   The Chosen words
    let chosenWords: string[] = randomValue.toLowerCase().split("");

    chosenWords.forEach((wordLetter, wordIndex): void => {
      if (theClickedLetter == wordLetter) {
        // set status to correct
        theStatus = true;

        // loop on all guess spans
        guessSpans.forEach((span, spanIndex): void => {
          if (wordIndex === spanIndex) {
            span.innerHTML = wordLetter || theClickedLetter;
          }

          if ((span as HTMLSpanElement).textContent) {
            totalWord += (span as HTMLSpanElement).textContent;
          }
        });
      }
    });

    if (!theStatus) {
      wrongAttempts++;
      theDraw?.classList.add(`wrong-${wrongAttempts}`);
      (document.getElementById("fail") as HTMLAudioElement).play();

      if (wrongAttempts === 8) {
        popup(`Game over, the word is ${randomValue.toUpperCase()}`);
        lettersConatiner.classList.add("finished");
      }
    } else {
      (document.getElementById("success") as HTMLAudioElement).play();
      if (totalWord === randomValue.toLowerCase()) {
        popup(`Congratulations!, You have guessed the word correctly!
              after a ${wrongAttempts} times
            `);
      }
    }
  }
});

function popup(text: string): void {
  let div = document.createElement("div");
  let divText = document.createTextNode(text);
  div.appendChild(divText);
  div.className = "popup";
  document.body.appendChild(div);
}
