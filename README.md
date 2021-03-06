# chigai-api [![Build Status](https://travis-ci.org/martinkr/chigai-api.svg?branch=master)](https://travis-ci.org/martinkr/chigai-api)
Modern visual regression testing with ```puppeteer``` and ```blink-diff```

## Visual regression testing
Visual regression testing: compare your current state against your baseline.
It's nothing new. We've done this for ages. Comparing two images. Looking at the current version and the previous one. Searching for the difference. On our own. Manually.

Well, Chiagi does this automatically. It takes a screenshot from a given URI and compares it to the previous version.

## Automated. Always
Chigai is designed to be used in your tests. You can use it in your favourite testrunner. As a regression tool. If your layout changes, it won't go on unnoticed.

# How to use this?
Chigai-api provides a clean facade for chigai-core. The regression testing of a given url and creating a fresh reference item beforehand.
Chigai-api is designed to be used with your favourite testrunner.

## Regression testing
Provide a url and options such as the viewport width (default: 1024), viewport height (default: 720) or a threshold (default: 0.01 = 1%) for the image comparison. Chigai-api creates a new screenshot of the whole page and compares it to the last specified reference. If their difference is lower than the given threshold it will resolve with ```true``, otherwise ```false```

## Installation
```$ yarn add chigai-api chigai-cli```

## Example
```JavaScript
// with mocha
const regression = require("chigai-api");

describe("Perform regression on my page.", () => {
	it("should not change.", (async () => {
		let result;
		// set the viewport to 1200x800 and wait for 250ms between onload and screenshotting. expect the delta to be lower than 1%
		result = await regression("http://example.com", {"vw": 1200, "vh": 800, "threshold": 0.01, "wait": 250});
		result.should.be.ok;
	}));
});
```


### Configuration options
Options can either be passed as arguments per call or globally  via .chigairs.json file. The options-object takes precedence.

#### ```vw```
Default: ```1024```. The with of the viewport you cant to screenshot. This will be part of the unique identifier.
#### ```vh```
Default: ```786```. The height of the viewport you cant to screenshot. This will be part of the unique identifier.

#### ```threshold```
Default: ```0.01```. The threshold to use for the comparison. This will not be part of the unique identifier.

#### ```path```
Default: ```./screenshots``` There's the possiblitly to pass a custom path to chigai. It's relative to your working directory.
Use this to share your reference items (e.g. via source control, rsync ...).

#### ```wait```
Default: ```0```. Wait this amount of miliseconds after the page's ```load-event``` before making the screenshot. This will not be part of the unique identifier.

#### .chigai.json
You can store project wide setttings in this file. It takes the same key-value-pairs as the options-object. Plus an additional ```path``` property.


```JavaScript
{
	"path" : "./myscreenshots",
	"threshold": 0.5,
	"vw": 1200,
	"vh" : 800,
	"wait": 5000
}
```


## Create a fresh reference on the CLI
If you need a new reference item, e.g. because you changed the page - use chigai-cli:

```$ chigai reference http://example.com -w 1200 -h 800 -t 0.01```

```$ ./node-modules/.bin/chigai reference http://example.com -w 1200 -h 800 -t 0.01```



## Tech Stack
- ECMAScript 2018 on ```nodejs v8.5.0```
- ```blink-diff v^1.0.1```
- ```fs-extra-plus v0.1.3```
- ```puppeteer v0.11.0```
- 100% code coverage using ```mocha v3.5.2```, ```chai v4.1.2``` and ```nyc v11.2.1```,

## Resources
- [GoogleChrome/puppeteer - Headless Chrome Node API](https://github.com/GoogleChrome/puppeteer)
- [yahoo/blink-diff - A lightweight image comparison tool](https://github.com/yahoo/blink-diff)

## License
Licensed under the [MIT license](http://www.opensource.org/licenses/mit-license.php).

Copyright (c) 2016, 2017 Martin Krause <github@mkrause.info> [http://martinkr.github.io)](http://martinkr.github.io)
