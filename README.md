# AUTOANALYTICS

<img src="https://user-images.githubusercontent.com/10475683/168904901-fac935c0-5227-43ed-9eb5-f9f245b94967.png" width="100" height="100">

Autoanalytics is a library to automatic track click events on a web based on accessibility that works inside any library or framework like React or Angular.



## Installation
```bash
npm install autoanalytics
```


## Usage
```js
import { initializeListeners } from 'autoanalytics'

initializeListeners({
  handler: (data) => {
    // Send the info to your favorite service
  },
})
```

## Event info

- type: Currently it only can be a click, but in the future we are planning to add other events like submit or change
- name: the accessible name of the element clicked (we don´t always use the actual clicked element but the nearest parent with information)
- classes: the classes of the element
- context: the nearest parent with accessible name
- occurredAt: a date of the moment when the event is performed
- targetedElement: the actual clicked element by te user


### Example
With this DOM:

```html
<div class="player-controls" aria-label="Player controls">
   <div class="player-controls__buttons">
      <button class="player-controls__play" aria-label="Play">
         <svg class="play__icon"></svg>
      </button>
   </div>
</div>
```

if you click the svg element you will we the next event info

```js
{
    "type": "click",
    "name": "Play",
    "classes": [
        "player-controls__play"
    ],
    "context": "Player controls",
    "occurredAt": "2022-05-17T00:00:00.000Z",
    "targetedElement": {
        "classes": [
            "play__icon"
        ],
        "tag": "svg"
    }
}
```



## Philosophy

We are using **accessibility** roles to make our tests using [Wrapito](https://github.com/mercadona/wrapito) and [Testing Library](https://testing-library.com/) this library adds even more value to take into account accessibility into our applications.

As we are using accessibility role this tool may not be the best if you have translations in your app because it will generate different logs for the same action.

This app is not made to use in public pages but in internal tools as it does not protects any data.

About **extra properties** like current path or url: this library tries to be agnostic of the application details, as it´s just a callback, if you want to extend the current properties you can just add them before send them to you analytics service.

