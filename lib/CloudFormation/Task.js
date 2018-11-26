"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const https_1 = require("https");
const url_1 = require("url");
var Status;
(function (Status) {
    Status["Succes"] = "SUCCESS";
    Status["Failed"] = "FAILED";
})(Status = exports.Status || (exports.Status = {}));
const sendMessage = (msg) => {
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
            res.on('end', resolve);
        });
        req.on('error', reject);
        req.write(body);
        req.end();
    });
};
exports.fromEvent = (event) => ({
    complete: (status, data, reason) => sendMessage({
        Status: status,
        StackId: event.StackId,
        RequestId: event.RequestId,
        ResponseURL: event.ResponseURL,
        LogicalResourceId: event.LogicalResourceId,
        PhysicalResourceId: event.PhysicalResourceId || event.LogicalResourceId,
        Data: data,
        Reason: reason,
    }),
});
