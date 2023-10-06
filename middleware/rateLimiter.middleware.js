const rateLimit =  require('express-rate-limit')

const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 15 minutes
    max: 10, // limit each IP to 100 requests per windowMs
    message: 'Too many requests, please try again later.'
  });

module.exports = limiter