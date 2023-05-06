const {stores, orders, products} = require("../models");
const {Sequelize} = require("sequelize");

exports.addOrder = async (req, res) => {
    try {
        const loopCnt = req.body.p_no.length;
        const {p_no, o_cnt, o_pickup_dt} = req.body;
        const today = new Date();
        const pickupDay = new Date(today.setDate(today.getDate() + Number(o_pickup_dt)));
        for (let i = 0; i < loopCnt; i++) {
            if (Number(o_cnt[i]) !== 0) {
                await orders.create({
                    o_no: null,
                    u_no: req.user.u_no,
                    p_no: p_no[i],
                    o_reg_dt: Sequelize.Sequelize.literal('now()'),
                    o_pickup_dt: pickupDay,
                    o_cnt: Number(o_cnt[i])
                })
            }
        }
        res.redirect('/store');
    } catch (e) {
        console.error(e);
    }
};

exports.userOrderList = async (req, res) => {
    const order = await orders.findAll({
        where: {
            u_no: req.user.u_no
        },
        include: {
            model: products,
            as: "p_no_product",
            required: true,
            include: {
                model: stores,
                as: 's_no_store',
                required: true
            }
        }
    })
    res.render('order/selectOneOrder', {user: req.user, order});
}