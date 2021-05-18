'use strict';

const {OBSUtility} = require('nodecg-utility-obs');
const timerObj = require('./timer');

module.exports = function (nodecg) {
    const obs = new OBSUtility(nodecg);
    const tim = new timerObj(nodecg);
}

