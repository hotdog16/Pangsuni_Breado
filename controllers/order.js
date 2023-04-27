const { stores, users, orders } = require("../models");
const {Sequelize} = require("sequelize");

exports.addOrder  = async (req, res) => {
    try{
        const loopCnt = req.body.p_no.length;
        const {p_no, o_cnt, o_pickup_dt} = req.body;
        const today = new Date();
        const pickupDay = new Date(today.setDate(ttt3.getDate() + Number(o_pickup_dt)));
        const ttt5 = new Date(ttt3.setDate(ttt3.getDate() - 1));
        for(let i=0; i<loopCnt; i++){
            if(Number(o_cnt[i]) !== 0){
                await orders.create({
                    o_no: null,
                    u_id : req.user.u_id,
                    p_no : p_no[i],
                    o_reg_dt : Sequelize.Sequelize.literal('now()'),
                    o_pickup_dt : pickupDay,
                    o_cnt : Number(o_cnt[i])
                })
            }
        }
        res.redirect('/store');
    }catch (e) {
        console.error(e);
    }
};