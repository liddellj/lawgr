[![Build Status](http://img.shields.io/travis/linn/lawgr/master.svg?style=flat)](https://travis-ci.org/linn/lawgr)
[![npm Version](http://img.shields.io/npm/v/lawgr.svg?style=flat)](https://www.npmjs.org/package/lawgr)
[![Nuget Version](http://img.shields.io/nuget/v/lawgr.js.svg?style=flat)](https://www.nuget.org/packages/lawgr.js/)
lawgr
=====

Simple JavaScript logging library.

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