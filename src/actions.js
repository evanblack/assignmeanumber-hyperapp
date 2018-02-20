import createNumber from './Number';

function randomWholeNum(upperLimit) {
  // Will be a whole number between 0 and (upperLimit - 1)
  return Math.floor(Math.random() * upperLimit);
}

function generateNumbers(count) {
  let numbers = []
  for (let i = 0; i < count; i += 1) {
    numbers.push(createNumber({ assigned: false, value: i + 1 }));
  }
  return numbers;
}

const createActions = (state) => {
  return ({
    ready: () => state => {
      return ({
        numbers: generateNumbers(state.howManyNumbers),
        pointer: null,
        cardFlipped: false,
        screen: 'picker'
      })
    },
    startOver: () => state => {
      return ({
        numbers: [],
        pointer: null,
        cardFlipped: false,
        screen: 'welcome'
      })
    },
    setHowManyNumbers: value => state => {
      return ({ howManyNumbers: value });
    },
    getNewNumber: () => state => {
      const unassigned = state.numbers.filter(n => n.assigned === false);
      if (unassigned.length) {
        const cursor = randomWholeNum(unassigned.length);
        const num = unassigned[cursor];
        num.setAssigned();
        return ({
          pointer: num,
          cardFlipped: !state.cardFlipped
        });
      } else {
        return ({
          pointer: null,
          cardFlipped: !state.cardFlipped
        });
      }
    },
    flipCard: () => state => {
      return ({ cardFlipped: !state.cardFlipped });
    },
  })
};

export default createActions;
