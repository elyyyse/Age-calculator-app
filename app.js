const DAYS_PER_MONTH_ = [
  31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31, 31, 28, 31, 30, 31, 30, 31,
  31, 30, 31, 30, 31,
];
const DAYS_PER_MONTH_LEAP = [
  31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31, 31, 29, 31, 30, 31, 30, 31,
  31, 30, 31, 30, 31,
];

const todaysDate = new Date();
const today = {
  year: todaysDate.getFullYear(),
  month: todaysDate.getMonth(),
  day: todaysDate.getDate(),
};

const yearInput = document.querySelector('#year-input');
const monthInput = document.querySelector('#month-input');
const dayInput = document.querySelector('#day-input');

const yearsOutput = document.querySelector('#years-output');
const monthsOutput = document.querySelector('#months-output');
const daysOutput = document.querySelector('#days-output');

const form = document.querySelector('form');
form.addEventListener('submit', e => {
  e.preventDefault();
  checkRequiredFields();
  checkDateValidity();
  if (!document.querySelector('.error-state')) {
    calcAndUpdateAge();
  } else {
    yearsOutput.innerText = '-';
    monthsOutput.innerText = '-';
    daysOutput.innerText = '-';
  }
});

const parseInputs = () => {
  const parsedYear = parseInt(yearInput.value);
  const parsedMonth = parseInt(monthInput.value) - 1;
  const parsedDay = parseInt(dayInput.value);

  const inputs = {
    year: parsedYear,
    month: parsedMonth,
    day: parsedDay,
  };

  return inputs;
};

const calcAndUpdateAge = () => {
  const inputs = parseInputs();
  const birthday = new Date(inputs.year, inputs.month, inputs.day);
  console.log(birthday);

  const leapDays = calcLeapDays(inputs);

  const msecOld = todaysDate - birthday;
  const msecPerYear = 31536000000;
  const msecPerDay = 86400000;

  const calcAge = (yearsAdj, leapAdj, daysArray) => {
    let yearsOld = 0;
    let monthsOld = 0;
    let daysOld = 0;
    let remainder = 0;

    yearsOld = today.year - inputs.year - yearsAdj;
    remainder =
      msecOld - yearsOld * msecPerYear - (leapDays + leapAdj) * msecPerDay;
    let i = inputs.month;
    while (remainder - daysArray[i] * msecPerDay >= 0) {
      remainder -= daysArray[i] * msecPerDay;
      monthsOld++;
      if (monthsOld === 11) {
        break;
      }
      i++;
    }
    daysOld = Math.floor(remainder / msecPerDay);

    // handles anomaly every 4 years on February 29th
    if (
      today.month === 1 &&
      today.day === 29 &&
      inputs.month === 2 &&
      inputs.day === 1
    ) {
      daysOld++;
    }

    updateAndAnimateAge(yearsOutput, yearsOld, '.years-plural');
    updateAndAnimateAge(monthsOutput, monthsOld, '.months-plural');
    updateAndAnimateAge(daysOutput, daysOld, '.days-plural');
  };

  // current year is a leap year
  if (today.year % 4 === 0 && today.month > 1) {
    // user has already celebrated a birthday this year - will pass thru february in array
    if (inputs.month < 2 && today.month > 1) {
      calcAge(0, 0, DAYS_PER_MONTH_LEAP);
      // user has already celebrated a birthday this year - will NOT pass thru february in array
    } else if (
      today.month > inputs.month ||
      (today.month === inputs.month && today.day >= inputs.day)
    ) {
      calcAge(0, 1, DAYS_PER_MONTH_LEAP);
      // user has not yet celebrated a birthday this year
    } else if (
      (today.month === inputs.month && today.day < inputs.day) ||
      today.month < inputs.month
    ) {
      calcAge(1, 0, DAYS_PER_MONTH_LEAP);
    }
    // current year is NOT a leap year
  } else {
    // user has not yet celebrated a birthday this year
    if (
      today.month > inputs.month ||
      (today.month === inputs.month && today.day >= inputs.day)
    ) {
      calcAge(0, 0, DAYS_PER_MONTH_);
    } else if (
      // user has already celebrated a birthday this year
      (today.month === inputs.month && today.day < inputs.day) ||
      today.month < inputs.month
    ) {
      calcAge(1, 0, DAYS_PER_MONTH_);
    }
  }
};

const checkRequiredFields = () => {
  const inputs = [dayInput, monthInput, yearInput];
  for (let input of inputs) {
    const inputContainer = input.parentElement;
    const errorMsg = inputContainer.querySelector('.error-msg');
    if (input.value === '') {
      errorMsg.innerText = 'This field is required';
      errorMsg.classList.remove('hidden');
      inputContainer.classList.add('error-state');
    } else if (input.value !== '') {
      errorMsg.classList.add('hidden');
      inputContainer.classList.remove('error-state');
    }
  }
};

const checkDateValidity = () => {
  const dayInputContainer = document.querySelector('#day-input-container');
  const monthInputContainer = document.querySelector('#month-input-container');
  const yearInputContainer = document.querySelector('#year-input-container');

  const dayErrorMsg = document.querySelector('.day-error');
  const monthErrorMsg = document.querySelector('.month-error');
  const yearErrorMsg = document.querySelector('.year-error');

  const inputs = parseInputs();

  const checkDayValidity = daysArray => {
    if (inputs.day > 31) {
      addErrorStates(dayErrorMsg, dayInputContainer, 'Must be a valid day');
    } else if (inputs.day > daysArray[inputs.month] && inputs.day < 32) {
      addErrorStates(dayErrorMsg, dayInputContainer, 'Must be a valid date');
    } else if (inputs.day) {
      removeErrorStates(dayErrorMsg, dayInputContainer);
    }
  };

  if (inputs.year % 4 === 0) {
    checkDayValidity(DAYS_PER_MONTH_LEAP);
  } else {
    checkDayValidity(DAYS_PER_MONTH_);
  }

  if (inputs.month > 11) {
    addErrorStates(monthErrorMsg, monthInputContainer, 'Must be a valid month');
  } else if (inputs.month) {
    removeErrorStates(monthErrorMsg, monthInputContainer);
  }

  if (
    inputs.year > today.year ||
    (inputs.year === today.year && inputs.month > today.month)
  ) {
    addErrorStates(yearErrorMsg, yearInputContainer, 'Must be in the past');
  } else if (inputs.year) {
    removeErrorStates(yearErrorMsg, yearInputContainer);
  }
};

const addErrorStates = (error, container, msg) => {
  error.innerText = msg;
  error.classList.remove('hidden');
  container.classList.add('error-state');
};

const removeErrorStates = (error, container) => {
  error.classList.add('hidden');
  container.classList.remove('error-state');
};

const calcLeapDays = birthday => {
  let leapDays = 0;
  for (let i = birthday.year; i < today.year; i++) {
    if (i % 4 === 0) {
      leapDays++;
    }
  }
  if (birthday.year % 4 === 0 && birthday.month > 1) {
    leapDays--;
  }
  return leapDays;
};

const updateAndAnimateAge = (output, age, plural) => {
  output.innerText = age;
  const plurality = document.querySelector(plural);
  if (age === 1) {
    plurality.innerText = '';
  } else {
    plurality.innerText = 's';
  }

  const animateAge = (output, start, end, duration) => {
    let startTimestamp = null;
    const step = timestamp => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      output.innerHTML = Math.floor(progress * (end - start) + start);
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  };

  animateAge(output, 0, age, 500);
};
