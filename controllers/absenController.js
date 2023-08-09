const db = require('../models');
const absen = db.Absen;

module.exports = {
    clockIn: async (req, res) => {
        try {
            const currentTime = new Date();
            const userId = req.user.id;
            const currentDate = currentTime.toISOString().split('T')[0];
            
            const existingClockIn = await absen.findOne({
                where: {
                    UserId: userId,
                    date: currentDate,
                    clockIn: true,
                },
            });
            if (existingClockIn) {
                return res.status(400).send({
                    msg: "You have already clocked in for today.",
                    status: false,
                });
            }
            const result = await absen.create({
                clockIn: true,
                UserId: userId,
                date: currentDate,
            });
            res.status(200).send({
                result,
                msg: "Success clock in",
                status: true,
                UserId: userId,
            });
        } catch (error) {
            console.log(error);
            res.status(400).send(error);
        }
    },
    clockOut: async (req, res) => {
        try {
            const userId = req.user.id;
            const currentDate = new Date().toISOString().split('T')[0];
            
            const existingClockOut = await absen.findOne({
                where: {
                    UserId: userId,
                    date: currentDate,
                    clockOut: true,
                },
            });
            if (existingClockOut) {
                return res.status(400).send({
                    msg: "You have already clocked out for today.",
                    status: false,
                });
            }
            const result = await absen.update(
                {
                    clockOut: true,
                },
                {
                    where: {
                        UserId: userId,
                        date: currentDate,
                    },
                }
            );
            res.status(200).send({
                result,
                msg: "Success clock out",
                status: true,
            });
        } catch (error) {
            console.log(error);
            res.status(400).send(error);
        }
    },
    arrival: async (req, res) => {
        const currentDate = new Date().toISOString().split('T')[0];
        const userId = req.user.id; 
        const condition = {
            date: currentDate,
            UserId: userId,
        };
        try {
            const result = await absen.findAll({
                attributes: ['createdAt', 'updatedAt'],
                where: condition,
            });

            res.status(200).send({
                result,
                status: true,
            });
        } catch (error) {
            console.log(error);
            res.status(400).send(error);
        }
    },
    history: async (req, res) => {
        const userId = req.user.id; 
        try {
            const result = await absen.findAll({
                where: { UserId: userId },
                order: [['createdAt', 'DESC']],
            });
            res.status(200).send({
                result,
                status: true,
            });
        } catch (error) {
            console.log(error);
            res.status(400).send(error);
        }
    },
    
};
