'use strict';

var tpbcrawler = require('./lib/tpbcrawler.js');

tpbcrawler.getTorrentsInfo('/search/john%20doe/0/99/0', function (result) {
    console.log(result);
});

tpbcrawler.getTorrentsInfo('/top/101', function (result) {
    console.log(result);
});

tpbcrawler.getTorrentInfo('9739678', function (result) {
    console.log(result);
});