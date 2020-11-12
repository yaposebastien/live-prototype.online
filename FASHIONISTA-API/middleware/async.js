/*
File: async.js
Function to handle all asynchronous request
*/

const asyncHandler = fn => (req, res, next) => 
    Promise
        .resolve(fn(req, res, next))
        .catch(next)

module.exports = asyncHandler;