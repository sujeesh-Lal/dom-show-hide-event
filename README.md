# Dom Show Hide Event

An npm package for observing the dom show hide events.

## Introduction

This package uses Javascript Mutation Observer class for triggering the show hide events.

### Usage

1. Using node

Create the instance of dom show hide observer

```
npm install dom-show-hide-observer

```
Import module using below code

```
import DO from 'dom-show-hide-observer'

```

2. Others

Create instance of the library

```
var DO = new domShowHideObserver();

```

### Listening

Listen function has 3 arguments
target - target dom node.
event - event to listen
callback - callback function which is to executed

```
var target = document.getElementById('content');

var hideObserver = DO.listen(target, "onHide", function (status) {
    console.log("status : " + status);
});

var showObserver = DO.listen(target, "onShow", function (status) {
    console.log("status : " + status);
});
```

### Stop Listening

Call the stopListening function to stop event listening. Pass the observer instance returned when listen event is registered.

```
DO.stopListening(showObserver);
```

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details



