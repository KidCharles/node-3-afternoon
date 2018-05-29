const swag = require('../models/swag');

module.exports = {
    add: (req, res, next) => {
        const { id } = req.query;
        let { cart } = req.session.user;
        const index = cart.findIndex(swag => swag.id == id);
        if (index === -1) {
            const selectedSwag = swag.find(swag => swag.id == id);

            cart.push(selectedSwag);
            req.session.user.total += selectedSwag.price;
        }

        res.status(200).send(req.session.user);

    },
    delete: (req, res, next) => {
        const { id } = req.query;
    },
    checkout: (req, res, next) => {
        let { user } = req.session;
        user.cart = [];
        uster.total = 0;

        res.status(200).send(req.session.user);
    },
}