# agular-translationInput [![Build Status](https://travis-ci.org/arthurianx/angular-translationinput.png?branch=master)](https://travis-ci.org/arthurianx/angular-translationinput)

> Inline year selector with callbacks, drag and drop and range selection. WIP.

## Demo

[Live Demo](http://arthurianx.github.io/angular-translationinput/demo)

## Getting Started

Install with Bower or download the files directly from the dist folder in the repo.

```bash
bower install agular-translationInput --save
```

Add `dist/angular-translationinput.js` and `dist/angular-translationinput.css` to your index.html.

*IMPORTANT*: At this point, `translation-input` depends on `angular-dragula` and `dragula`. Please add it as a dependency.

Add `translationInput` as a module dependency for your module.

```js
angular.module('your_app', ['translationInput']);
```

## Options

The `translation-input` directive, by default, expects only the model object, which will give you the selected date or range

You can use it like this:

```html
<div translation-input="{model: 'myModel'}"></div>
```
*IMPORTANT*: The library is dependent on many third part libs, so at this time it is not feasible. That's why the WIP.

There's also a full set of options:

* `something` - Optional.  Defaults to `10` years. You can input a number of years from which you can select or a scope variable with the length you need. Mind you, if you put 40 years in a really small container it won't look good. This is a TODO.

A full usage would look like this: `<div translation-input="{model: 'myModel', years: 15, attachTo: '.mySelector', attachNow: triggerAttachment, externalCallback: updateYearSelection, range: false, drag: false}"></div>`




## Release History
 * v0.1.0 - Initial release.
