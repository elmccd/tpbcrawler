# TPBCrawler

The Pirate Bay crawler for Node.js

## Getting Started
Install the module with: `npm install tpbcrawler`


## Documentation
`getTorrentsInfo(path, callback)`

`getTorrentInfo(id, callback)`


## Examples

### Getting search result
```javascript
var tpbcrawler = require('./lib/tpbcrawler.js');
tpbcrawler.getTorrentsInfo('/search/john%20doe/0/99/0', function (result) {
    console.log(result);
});
```

### Getting information about torrent by ID
```javascript
tpbcrawler.getTorrentInfo('9739678', function (result) {
    console.log(result);
});
```

### Getting information from other list
```javascript
tpbcrawler.getTorrentsInfo('/top/101', function (result) {
    console.log(result);
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## To do
* Retrive all data
* Handle domain changing

## Release History
v 0.0.1 - 26.05.2014 - two basic methods for crawling data

## License
Copyright (c) 2014 Maciej Dudziński.
Licensed under the MIT license.
