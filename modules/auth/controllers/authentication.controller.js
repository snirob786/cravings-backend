/**
 * Authentication Controller
 */
const UserRepo = require("../../user/repositories/user.repository")
const passport = require('passport');
const signJwt = require('../services/signJwt');
const verifyJwt = require('../services/verifyJwt');
const bcrypt = require("bcrypt");


exports.DoSignUp = async (req, res, next) => {
    let user = req.body
    try {
        let userData = await UserRepo.Single({ email: user.username })
        if (userData) {
            return res.status(400).json({ message: "You are already registered." })
        }
        const hassPassword = await bcrypt.hashSync(user.password, 10);
        user.password = hassPassword
        let createUser = await UserRepo.Create(user)
        res.status(200).json({ message: "Registered successfully" })
    } catch (e) {
        console.error(err)
        return res.status(500).json({ message: "Internal server error" })
    }
}

exports.DoLogin = async (req, res, next) => {
    console.log("req login: ", req);
    const user = req.body
    try {
        const userResponse = await UserRepo.Single({ email: user.username })
        if (!userResponse) {
            return res.status(400).json({ message: "This email is not registered yet!" })
        } else {
            const comparePass = await bcrypt.compare(user.password, userResponse.password)
            if (!comparePass) {
                return res.status(400).json({ message: "Password mismatch" })
            } else {
                const token = await signJwt({
                    name: userResponse.name,
                    email: userResponse.email,
                    phone: userResponse.phone,
                    role: userResponse.role
                })

                return res.status(200).json({ token: token, message: "Logged In" })
            }
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

exports.JwtVerify = async (req, res, next) => {
    try {
        let { jwt } = req.body
        let decodedToken = await verifyJwt(jwt)
        if (decodedToken == undefined) return res.status(400).json({ message: "Invalid Jwt token", })
        let expiration = decodedToken.exp;
        const now = Math.floor(Date.now() / 1000);
        const timesToLeft = 60 * 60 * 24;
        const timeLeft = `${Math.floor(((expiration - now) / 3600) / 24)} day ${Math.floor(((expiration - now) / 3600) % 24)}hrs`

        if (expiration - now < timesToLeft && expiration - now > 0) {
            let payload = {
                name: decodedToken.name,
                email: decodedToken.email,
                phone: decodedToken.phone,
                role: decodedToken.role
            }
            let newToken = await signJwt(payload)
            res.status(200).json({ message: "JWT has expired or will expire soon. New token generated.", data: newToken })
        } else if (expiration - now < 0) {
            res.status(400).json({ message: "JWT has expired", })
        }

        else {
            res.status(200).json({ message: "JWT is valid for more than 1 day", user: decodedToken })
        }
    } catch (error) {
        console.error("error in jwt verify: ", error);
    }
}
