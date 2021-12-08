const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    let token = req.header('Authorization'); //amra jokhn json a kore kono data pathai tokhn {key: value} ei key("Authorization") tei value(token) thake. so Authorization ke access korlei token ta peye jabo.
    if (!token) return res.status(401).send("No Token Found!")
    token = token.split(" ")[1].trim();// basically Authorization key te just token ta thake na. format ta holo "Bearer <token>". ekhane Bearer ta holo ekta keyword and <token> ta holo original token. so, amra Authorization er value (full token with Bearer keyword) ta k space er maddhome split kore Bearer ar <token> ta k alada korte pari. but split function ekta array return kore. so split korar pore array er first index[0] a Bearer keyword ta thakbe and second index[1] a basically main token ta thakbe. so main token ta only nite hole .split(" ")[1] likha jay!

    //abar onek shomoy hoyto token er shamne or pechone kono space pore jaite pare. tai trim function diye basically shamne or pichone jodi kono karone kono space pore jay tahole shei space ta amra remove kore dita parbo

    try {
        const decoded = jwt.verify(token, process.env.mySecretKey);
        //user jokhn signup/login kore tokhn amra JWT pathacchi. JWT er 3 ta part! 1) header, 2) payload!
        //ei payload a korei ei matro jei user signup/login korlo shei user er id+email send kore dicchi JWT payload a
        //shei JWT payload theke verify function a kore decoded variable a id+email set hobe!
        req.user = decoded;
        next();
    }

    catch (error) {
        return res.status(400).send("Invalid Token!")
    }
}