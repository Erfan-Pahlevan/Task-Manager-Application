// Logger middleware:
const logger = (req, res, next) => {
  req.requestTime = new Date().toISOString();
  console.log(
    `Request Received method: ${req.method} url:${req.url} Time: ${req.requestTime}`
  );
  next();
};

const requestTimeLogger = (req, res, next) => {
  req.requestTime = new Date().toISOString();
  // console.log(`[NEW REQUEST] Path: ${req.url} | Time: ${req.requestTime}`);
  next();
};

module.exports = logger;
