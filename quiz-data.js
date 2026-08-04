/* Quiz Night — question bank
   Each category has 6 questions. answer is the index of the correct option. */

const CATEGORIES = [
  {
    id: "general",
    name: "General Knowledge",
    icon: "🗺️",
    blurb: "A bit of everything — the kind of round that starts every quiz night.",
    questions: [
      { q: "What is the largest ocean on Earth?", options: ["Atlantic", "Indian", "Pacific", "Arctic"], answer: 2 },
      { q: "How many strings does a standard violin have?", options: ["4", "5", "6", "8"], answer: 0 },
      { q: "Which country gifted the Statue of Liberty to the USA?", options: ["Spain", "France", "Italy", "Portugal"], answer: 1 },
      { q: "What is the smallest prime number?", options: ["0", "1", "2", "3"], answer: 2 },
      { q: "Which planet is known as the Red Planet?", options: ["Venus", "Jupiter", "Mars", "Saturn"], answer: 2 },
      { q: "What is the currency of Japan?", options: ["Won", "Yuan", "Yen", "Ringgit"], answer: 2 }
    ]
  },
  {
    id: "science",
    name: "Science & Nature",
    icon: "🧪",
    blurb: "Atoms, animals, and the odd volcano.",
    questions: [
      { q: "What gas do plants absorb from the atmosphere?", options: ["Oxygen", "Nitrogen", "Carbon dioxide", "Hydrogen"], answer: 2 },
      { q: "What is the chemical symbol for gold?", options: ["Ag", "Au", "Gd", "Go"], answer: 1 },
      { q: "How many bones are in the adult human body?", options: ["186", "206", "226", "246"], answer: 1 },
      { q: "What is the hardest natural substance on Earth?", options: ["Quartz", "Diamond", "Granite", "Titanium"], answer: 1 },
      { q: "Which organ pumps blood through the body?", options: ["Liver", "Lungs", "Heart", "Kidney"], answer: 2 },
      { q: "What force pulls objects toward Earth?", options: ["Magnetism", "Gravity", "Friction", "Tension"], answer: 1 }
    ]
  },
  {
    id: "movies",
    name: "Movies & TV",
    icon: "🎬",
    blurb: "Popcorn required.",
    questions: [
      { q: "Which studio created Toy Story?", options: ["DreamWorks", "Pixar", "Illumination", "Blue Sky"], answer: 1 },
      { q: "Who directed the movie Jaws?", options: ["George Lucas", "Martin Scorsese", "Steven Spielberg", "James Cameron"], answer: 2 },
      { q: "In The Wizard of Oz, what color are Dorothy's slippers?", options: ["Silver", "Ruby", "Gold", "Emerald"], answer: 1 },
      { q: "Which show is set in the fictional town of Hawkins, Indiana?", options: ["Riverdale", "Stranger Things", "Twin Peaks", "Ozark"], answer: 1 },
      { q: "What is the name of the coffee shop in Friends?", options: ["Central Perk", "The Grind", "Bean There", "Java Joe's"], answer: 0 },
      { q: "Who played the lead role of Jack in Titanic?", options: ["Brad Pitt", "Matt Damon", "Leonardo DiCaprio", "Tom Cruise"], answer: 2 }
    ]
  },
  {
    id: "history",
    name: "History",
    icon: "🏺",
    blurb: "Dates, dynasties, and a few revolutions.",
    questions: [
      { q: "In which year did World War II end?", options: ["1943", "1945", "1947", "1950"], answer: 1 },
      { q: "Who was the first President of the United States?", options: ["Thomas Jefferson", "John Adams", "George Washington", "Benjamin Franklin"], answer: 2 },
      { q: "Which ancient civilization built the pyramids of Giza?", options: ["Roman", "Egyptian", "Mayan", "Greek"], answer: 1 },
      { q: "The Berlin Wall fell in which year?", options: ["1985", "1989", "1991", "1993"], answer: 1 },
      { q: "Who was known as the 'Maid of Orléans'?", options: ["Marie Antoinette", "Joan of Arc", "Catherine the Great", "Eleanor of Aquitaine"], answer: 1 },
      { q: "Which empire was ruled by Genghis Khan?", options: ["Ottoman", "Roman", "Mongol", "Persian"], answer: 2 }
    ]
  }
];
