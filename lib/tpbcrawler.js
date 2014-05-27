/*
 * TPBCrawler
 * https://github.com/elmccd/tpbcrawler
 *
 * Copyright (c) 2014 Maciej Dudziński
 * Licensed under the MIT license.
 */
'use strict';
var http = require('http'),
    zlib = require('zlib');


var TPBCrawler = {
    getTorrentsInfo: function (url, callback) {
        var options = { host: 'thepiratebay.se',
            path: url[0] === '/' ? url : '/' + url,
            port: 80,
            headers: { 'accept-encoding': 'gzip' }
        };
        http.get(options, function (res) {
            var chunks = [];
            res.on('data', function (chunk) {
                chunks.push(chunk);
            });
            res.on('end', function () {
                var buffer = Buffer.concat(chunks);

                zlib.gunzip(buffer, function (err, decoded) {

                    try {
                        var tr = decoded.toString().split('<tr>');
                        tr.shift();
                        var result = [];

                        tr.forEach(function (element) {
                            var td = element.split('</td>');
                            result.push({
                                name: td[1].split('title="')[1].split('"')[0].replace("Details for ", ''),
                                id: td[1].split('href="')[1].split('"')[0].split('/')[2],
                                seeds: td[2].split(">")[1],
                                leech: td[3].split(">")[1]
                            });
                        });
                        callback(result);
                    } catch (e) {
                        callback(false);
                    }
                });
            });
        }).on('error', function (e) {
            console.error("Got error: " + e.message);
        });
    },
    getTorrentInfo: function (path, callback) {
        var options = { host: 'thepiratebay.se',
            path: '/torrent/' + path,
            port: 80,
            headers: { 'accept-encoding': 'gzip' }
        };
        http.get(options, function (res) {
            var chunks = [];
            var result = {};
            res.on('data', function (chunk) {
                chunks.push(chunk);
            });
            res.on('end', function () {
                var buffer = Buffer.concat(chunks);
                zlib.gunzip(buffer, function (err, decoded) {
                    try {
                        var details = decoded.toString().split('<div id="detailsframe">')[1];
                        var image_crawl = details.split('class="torpicture"');
                        if (!!image_crawl[1]) {
                            result.image = image_crawl[1].split('src="')[1].split('"')[0];
                        }

                        result.magnet = details.split('href="magnet:?xt=urn:btih:')[1].split('&')[0];
                        callback(result);
                    } catch (e) {
                        callback(false);
                    }
                });
            });
        }).on('error', function (e) {
            console.error("Got error: " + e.message);
        });
    }
};


//TODO very new dev features



module.exports = TPBCrawler;


