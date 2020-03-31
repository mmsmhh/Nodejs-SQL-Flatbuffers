const flatbuffers = require('flatbuffers').flatbuffers;
const User = require('../models/user_generated').io.mahmoudsaleh.generated.User;
const bcrypt = require('bcryptjs');
const db = require('../configurations/database');


const fromHexString = hexString =>
    new Uint8Array(hexString.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));

const getUser = bytes => {

    const Uint8Array = fromHexString(bytes);

    const buffer = new flatbuffers.ByteBuffer(Uint8Array);

    const user = User.getRootAsUser(buffer);

    return {
        email: user.email(),
        password: user.password()
    }
}

const hashPassword = async password => {
    try {

        const salt = await bcrypt.genSalt(10);

        const passwordHash = await bcrypt.hash(password, salt);

        return passwordHash;

    } catch (error) {
        throw new Error(error);
    }
};

const isValidPassword = async (newPassword, oldPassword) => {
    try {
        console.log(newPassword);
        console.log(oldPassword);
        return await bcrypt.compare(newPassword, oldPassword);
    } catch (error) {
        throw new Error(error);
    }
}



module.exports = {
    registration: async (req, res) => {
        const user = getUser(req.body);
        const rows = await db.query(`SELECT * FROM users where email=${db.escape(user.email)}`);
        if (rows.length > 0) {
            return res.status(401).send();
        }
        else {

            const hashedPassword = await hashPassword(user.password);

            const r = await db.query(`INSERT INTO users(email, password) VALUES(${db.escape(user.email)}, "${hashedPassword}")`);

            return res.status(200).send();

        }
    },
    login: async (req, res) => {
        const user = getUser(req.body);
        const rows = await db.query(`SELECT * FROM users where email=${db.escape(user.email)}`);
        if (rows.length > 0) {
            if (await isValidPassword(user.password, rows[0].password)) {
                return res.status(200).send();
            }
            else {
                return res.status(401).send();
            }
        }
        else {
            return res.status(401).send();
        }
    }
}

