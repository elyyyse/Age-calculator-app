# Frontend Mentor - Age calculator app solution

This is a solution to the [Age calculator app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/age-calculator-app-dF9DFFpj-Q). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- View an age in years, months, and days after submitting a valid date through the form
- Receive validation errors if:
  - Any field is empty when the form is submitted
  - The day number is not between 1-31
  - The month number is not between 1-12
  - The year is in the future
  - The date is invalid e.g. 31/04/1991 (there are 30 days in April)
- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page
- **Bonus**: See the age numbers animate to their final number when the form is submitted

### Links

- [Solution URL](https://github.com/elyyyse/Age-calculator-app)
- [Live Site URL](https://elyyyse.github.io/Age-calculator-app/)

## My process

### Built with

- Vanilla JavaScript
- Semantic HTML5 markup
- CSS custom properties, Flexbox

### What I learned

This marks my first interactions with dates in JavaScript, so naturally, I learned a lot. I'll be curious to revisit this code when I have more projects under my belt to see how I could have built it better.

This project also gave me the opportunity to:
- Style number inputs (including placeholders, outlines, spinners, and carat colors)
- Continue to explore the nuances of Flexbox
- Play more with the position property
- Learn about aria-errormessage and aria-invalid to make custom, yet accessible, error messages

Bonus: The acceptance criteria said to show error message if "The year is in the future", but I added logic to show the error if the date is in the future for any reason.

### Continued development

I wrote this app fully manual with no libraries or frameworks. I've used jQuery in the past, but I want to learn React or Vue for future projects.

### Useful resources

- [Digital Ocean](https://www.digitalocean.com/community/tutorials/understanding-date-and-time-in-javascript) - I could not have built this app without this article from [Tania Rascia](https://www.digitalocean.com/community/users/taniarascia). It's a really great overview of all things Date and Time in Javascript.
- [MDN](https://developer.mozilla.org/en-US/) - My goto for every random question.

## Author

- Website - [Elyse Kanagaratnam](https://www.elysekan.com)
- Frontend Mentor - [@elyyyse](https://www.frontendmentor.io/profile/elyyyse)
