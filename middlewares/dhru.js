const { DhruFusion } = require('../helper/dhru');

module.exports = (req, res, next) => {
    try {
        const dhruConfig = {
            username: process.env.USERNAME,
            apiKey: process.env.API_ACCESS_KEY,
            format: process.env.REQUESTFORMAT,
            fusionUrl: process.env.DHRUFUSION_URL
        }

        req.dhruFusion = new DhruFusion(dhruConfig);
        next();
    } catch (error) {
        res.status(401).json({ message: 'dhru access not permitted!' });
    }
}