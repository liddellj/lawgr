[![Build Status](http://img.shields.io/travis/linn/lawgr/master.svg?style=flat)](https://travis-ci.org/linn/lawgr)
[![npm Version](http://img.shields.io/npm/v/lawgr.svg?style=flat)](https://www.npmjs.org/package/lawgr)
[![Nuget Version](http://img.shields.io/nuget/v/lawgr.js.svg?style=flat)](https://www.nuget.org/packages/lawgr.js/)
lawgr
=====

Simple JavaScript logging library. Supports logging to local console as well as a remote endpoint.

## Usage
### Configuration
The default configuration includes logging to a target called `local`, which renders messages in the local console.

You can additionally log to a remote endpoint by reconfiguring the `targets` property as follows:

```javascript
log.config.targets = [ log.defaults.targets.local, log.defaults.targets.remote ];
```

The `log.defaults.targets.remote` target will post log messages to */logs/* with a body like this:

```javascript
{
	level: "error",
	message: "Uncaught Error: Oh noes!",
	sender: "some-app",
	stack: {
		context: [
			"var someFuncName = function() {",
			"    throw new Error('Oh Noes');",
			"};"
		],
		func: "someFuncName",
		line: 2,
		url: "http://blah.com/scripts/lib.js"
    },
	url: "/"
	useragent: "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.1916.153 Safari/537.36"
}
```

The `sender` property is configured as follows:

```javascript
log.config.sender = 'some-app';
```

The `stack` property is only included if available. Stack traces are obtained through [TraceKit](https://github.com/occ/TraceKit).

You can also implement your own target(s) by providing a function with the following signature:

```javascript
function (level, message, stack)
```

`level` will be one of *debug*, *info*, *warning*, *error* or *critical*. `message` is the log message. `stack` corresponds to the `stack` property in the example above.

### Logging
The API for logging messages is simple:

```javascript
log.debug('This is a debug thing');
log.info('This is an informational thing');
log.warning('This is a warning thing');
log.error('This is an error thing');
log.critical('This is a critical thing');
```

Unhandled errors are automatically caught and logged as an error. To ensure you get the best stack trace possible, you should throw errors like this:

```javascript
throw new Error('Oh noes!');
```

## Installation
### [Bower](http://bower.io/search/?q=lawgr)
```
bower install lawgr
```

### [npm](https://www.npmjs.org/package/lawgr) [![npm Version](http://img.shields.io/npm/v/lawgr.svg?style=flat)](https://www.npmjs.org/package/lawgr) [![npm Downloads](http://img.shields.io/npm/dm/lawgr.svg?style=flat)](https://www.npmjs.org/package/lawgr)
```
npm install lawgr
```

### [NuGet](https://www.nuget.org/packages/lawgr.js/) [![Nuget Version](http://img.shields.io/nuget/v/lawgr.js.svg?style=flat)](https://www.nuget.org/packages/lawgr.js/) [![Nuget Downloads](http://img.shields.io/nuget/dt/lawgr.js.svg?style=flat)](https://www.nuget.org/packages/lawgr.js/)

```
Install-Package lawgr.js
```

## Publishing
Prior to publishing a new version of the package, you must run the following commands to configure your NuGet and npm credentials. You should only need to do this once.
```
npm adduser
grunt nugetkey --key=XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
```
Once you have entered your credentials, you can publish to npm and NuGet by running one of the following tasks:
 ```
grunt publish
```
Increments patch version in package.json, publishes to npm and NuGet. This is short-hand for `grunt publish:patch`.
```
grunt publish:minor
```
As before, but bumps minor version.
```
grunt publish:major
```
As before, but bumps major version.

The publish task will create an appropriate semver tag which Bower will detect as a new version.
