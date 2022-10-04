# Car Leasing Calculator

Test task from Oxem Studio

## Overview

### The challenge

#### General requirements

- The Title and Description tags should appear immediately after the opening head tag. Any value can be entered.
- Move all the styles that are used in the layout into separate CSS files.
- Avoid conflicting CSS styles.
- Achieve cross-browser compatibility:
    Google Chrome
    Android
    mobile safari
    Yandex browser
    Firefox
    Opera.
- Get validated https://validator.w3.org/. This is not a critical requirement, but there should be no elementary layout errors (for example, unclosed tags, omission of required attributes, etc.).

#### Breakpoints

- 320-767 (layout at 320px)
- 768-1119 (layout at 768px)
- 1120-1439 (layout at 1120px)
- 1440+ (layout at 1440px)

#### Calculator requirements

- The calculator must initialize with the specified defaults;
In each field, you can enter a value both from the keyboard and using the slider;
- When choosing a value using the slider, all numbers must be recalculated dynamically while the slider is moving, and not just after it stops;
- Each field has a maximum and minimum value - the slider should limit the user in choosing data, and when an incorrect value is entered from the keyboard, it should be reset to the nearest correct number (maximum or minimum).
  a. For the field “Vehicle cost” of the border: 1 million rubles. - 6 million rubles;
  b. For the “Initial payment” field, the borders are: 10% - 60% (here the entry is made exactly as a percentage of the cost, and not in rubles; rubles are the result   of the calculation from the entered car cost);
  c. For the field “Leasing term” the boundaries are: 1 - 60 months;
- Calculation formulas for fields:
  a. Interest rate = 3.5%
  b. For the field “Initial payment”: 
    Down payment (as a percentage) * Car value
  c. For the field “Lease agreement amount”: 
    Down payment + Loan term in months * Monthly payment
  d. For the “Monthly payment from” field: 
    const monthPay = (price - initial) * ((0.035 * Math.pow((1 + 0.035), months)) / (Math.pow((1 + 0.035), months) - 1));
- By clicking the “Submit Request” button, a request should be generated that sends all the calculator data to the backend, for example, so that the backend can then use this data to transfer it to the CRM system.
- At the moment of clicking on the button, the button should be blocked from the possibility of re-sending data for the duration of the request to the backend, and a preloader should be displayed inside the button. Inputs and sliders should be blocked for the time of sending.

### Screenshot

![car-leasing-calculator](https://user-images.githubusercontent.com/75619295/193900691-51d533ca-c2a6-43b8-bb9f-8924ae0c1c7d.png)

### Links

- Solution URL: (https://github.com/Shall-Fade/car-leasing-calculator)
- Live Site URL: (https://shall-fade.github.io/car-leasing-calculator/)

## My process

### Built with

- Semantic HTML5 markup
- Flexbox
- Grid
- [SASS/SCSS](https://sass-lang.com/documentation/) - Stylesheet Language
- [VUE](https://vuejs.org) - JS Framework
- [Vite](https://vitejs.dev) - Frontend Tooling
- [Vuex](https://vuex.vuejs.org) - State Management Library

### What I learned

I tried sending data to the backend. I learned how to dynamically recalculate numbers using the slider.

### Continued development

In the future, you need to:

- Add spaces between thousandths.
- Add validation
- When entering an incorrect value from the keyboard, you need to reset the value to the nearest correct number

## Author

- GitHub - [@Shall-Fade](https://github.com/Shall-Fade)
- Frontend Mentor - [@Shall-Fade](https://www.frontendmentor.io/profile/Shall-Fade)
- VK - [@Marat Chochaev](https://vk.com/0another0)
- Telegram - [@Marat Chochaev](https://t.me/another_rn)
- Instagram - [@marat.chochaev](https://www.instagram.com/marat.chochaev/)

## Conclusion

If you see any bugs in the code or want to share some advice, please contact me. I would be very grateful for any help or advice, as it will give me the opportunity to make fewer mistakes and improve my skills.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```
