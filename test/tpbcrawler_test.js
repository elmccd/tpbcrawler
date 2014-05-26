'use strict';

var tpbcrawler = require('../lib/tpbcrawler.js');

/*
 ======== A Handy Little Nodeunit Reference ========
 https://github.com/caolan/nodeunit

 Test methods:
 test.expect(numAssertions)
 test.done()
 Test assertions:
 test.ok(value, [message])
 test.equal(actual, expected, [message])
 test.notEqual(actual, expected, [message])
 test.deepEqual(actual, expected, [message])
 test.notDeepEqual(actual, expected, [message])
 test.strictEqual(actual, expected, [message])
 test.notStrictEqual(actual, expected, [message])
 test.throws(block, [error], [message])
 test.doesNotThrow(block, [error], [message])
 test.ifError(value)
 */

exports.getTopMusic = {
    'getTorrentsInfo': function (test) {
        tpbcrawler.getTorrentsInfo('/search/arrow/0/99/0', function (result) {
            test.ok(Array.isArray(result), 'Torrent list should be array');
            result.forEach(function (el) {
                test.ok(typeof el.name !== 'undefined', "Name is set");
                test.ok(isFinite(el.id), "Id is set");
                test.ok(isFinite(el.seeds), "Seeds are set");
                test.ok(isFinite(el.leech), "Leech are set");
            });
            test.done();
        });
    }
};

exports.getTorrentInfo = {
    'getFromCorrectData': function (test) {
        tpbcrawler.getTorrentInfo('9739678', function (result) {
            test.ok(typeof result.image !== 'undefined', "Image is set");
            test.ok(typeof result.magnet !== 'undefined', "Magnet is set");
            test.done();
        });
    },
    'getFromInvalidData': function (test) {
        tpbcrawler.getTorrentInfo('wrong id', function (result) {
            test.ok(result === false, "Should return false");
            test.done();
        });

    }
};
