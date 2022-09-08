const Users = require("../models/Users");
const jwt = require('jsonwebtoken');
const config = require('config')

let refreshTokens = []

exports.signIn = (req, res) => {
    const { email, password } = req.body;

    const user = Users.findOne({email, password}, (error, result) => {
        if (error) res.send('Error');
        if (result) {
            const accessToken = jwt.sign({ email: user.email }, config.get('accessTokenSecret'));
            const refreshToken = jwt.sign({ email: user.email }, config.get('refreshTokenSecret'));
            refreshTokens.push(refreshToken);
            res.json({
                accessToken,
                refreshToken
            });
        } else  {
            res.send("Not User")
        }
    })
}

exports.signUp = (req, res) => {
    const { email, password } = req.body;
    const user = new Users({ email, password });
    user.save().then((response) => {
        res.send(response);
    })
}

exports.auth = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, config.get('accessTokenSecret'), (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};

exports.tokenRefresh = (req, res) => {
    const { token } = req.body;

    if (!token) {
        return res.sendStatus(401);
    }

    if (!refreshTokens.includes(token)) {
        return res.sendStatus(403);
    }

    jwt.verify(token, config.get('refreshTokenSecret'), (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }
        const accessToken = jwt.sign({ email: user.email}, config.get('accessTokenSecret'), { expiresIn: '20m' });

        res.json({
            accessToken
        });
    });
}

exports.logout =  (req, res) => {
    const { token } = req.body;
    refreshTokens = refreshTokens.filter((tk) => tk !== token);
    res.send("Logout successful");
}