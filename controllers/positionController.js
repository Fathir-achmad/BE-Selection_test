const db = require('../models');
const user = db.Users
const absen = db.Absen
const position = db.Position;
module.exports = {
    getPosition: async (req, res) => {
        try {
            const result = await position.findAll({});
            res.status(200).send({
                result,
                status: true,
            });
        } catch (error) {
            console.log(err);
            res.status(400).send(err);
        }
    },
    calculateSalary: async (req, res) => {
        try {
            const results = await absen.findAll({
                where: {
                    UserId: req.user.id
                },
                include: [{
                    model: user,
                    attributes: ["PositionId"],
                    include: [{
                        model: position
                    }],
                }, ],
            });
            const calculatedResults = results.map((result) => {
                let fee = 0;

                if (!result.clockIn && !result.clockOut) {
                    fee = 0;
                } else if (result.clockIn && !result.clockOut) {
                    fee = result.User.Position.fee * 0.5;
                } else if (result.clockIn && result.clockOut) {
                    fee = result.User.Position.fee;
                }
                return {
                    id: result.id,
                    date: result.date,
                    clockIn: result.clockIn,
                    clockOut: result.clockOut,
                    createdAt: result.createdAt,
                    updatedAt: result.updatedAt,
                    UserId: result.UserId,
                    User: {
                        PositionId: result.User.PositionId,
                        Position: {
                            id: result.User.Position.id,
                            position: result.User.Position.position,
                            fee: result.User.Position.fee,
                        },
                    },
                    fee: fee,
                };
            });
            res.status(200).send({
                results: calculatedResults,
                status: true,
            });
        } catch (error) {
            console.log(err);
            res.status(400).send(err);
        }
    },
}