"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const https_1 = require("https");
const url_1 = require("url");
var TaskResult;
(function (TaskResult) {
    TaskResult["Success"] = "SUCCESS";
    TaskResult["Failed"] = "FAILED";
})(TaskResult = exports.TaskResult || (exports.TaskResult = {}));
exports.completeTask = (msg) => {
    const { hostname, path } = url_1.parse(msg.ResponseURL);
    const body = JSON.stringify(msg);
    return new Promise((resolve, reject) => {
        const options = {
            hostname,
            path,
            method: 'PUT',
            headers: { 'content-length': body.length },
        };
        const req = https_1.request(options, res => {
            let body = '';
            res.on('data', chunk => (body += chunk));
            res.on('end', () => resolve(body));
        });
        req.on('error', reject);
        req.write(body);
        req.end();
    });
};
