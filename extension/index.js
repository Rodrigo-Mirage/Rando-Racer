'use strict';

const {OBSUtility} = require('nodecg-utility-obs');
const timerObj = require('./timer');
const fileSystem = require('./fileSystem');
const Videos = require('./videoDown');

module.exports = function (nodecg) {
    const obs = new OBSUtility(nodecg);
    const tim = new timerObj(nodecg);
    const files = new fileSystem(nodecg);
    const videos = new Videos(nodecg);
}

