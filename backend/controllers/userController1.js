const UserService = require("../services/UserService");
const ApiError = require('../exception/apiError');
const {validationResult} = require('express-validator');



class UserController {

    async login(req, res, next) {
        try {
            const {email, password} = req.body;
            const userData = await UserService.login(email, password);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
            return res.json(userData);
        }
        catch(e) {
            next(e);
        }
    }


    async logout(req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            const token = await UserService.logout(refreshToken);
            res.clearCookie('refreshToken');
            return res.json(token);
        } catch (e) {
            next(e);
        }
    }

    async registration(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('Validation error', errors.array()))
            }
            const {email, password, name} = req.body;
            const userData = await UserService.registration(email, password, name);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }


    async refresh(req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            const userData = await UserService.refresh(refreshToken);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }

    async updateProfile(req,res, next) {
        const userId = req.user._id;
        
        try {
            let updateUser = await UserService.updateProfile(userId, req.body);
            return res.json(updateUser);
        }
        catch(e) {
            next(e);
        }
    }
    async getProfile(req,res,next) {
        const userId = req.user._id;

        try {
           const user = await UserService.getProfile(userId);
           res.json(user);
        }
        catch(e) {
            next(e);
        }
    }

}



module.exports = new UserController();