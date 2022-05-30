const ApiError = require('../exception/apiError');
const User = require('../models/user');
const UserDto = require('../dtos/user-dto');
const TokenService = require('./TokenService');
//const MailService = require('./MailService');
const uuid = require('uuid');

class UserService {
    async  registration() {}

    async login(email, password) {
        const user = await User.findOne({email});

        if(!user) throw ApiError.BadRequest('User not found')

        const isPassEquals = await user.matchPassword(password);

        if(!isPassEquals) throw ApiError.BadRequest('Uncorrect password');

        const userDto = new UserDto(user);
        const tokens = TokenService.generateTokens({...userDto});

        await TokenService.saveToken(userDto._id, tokens.refreshToken);
        return {...tokens, user: userDto};
    }

    async registration(email, password, name) {
        const candidate = await User.findOne({email})
        if (candidate) {
            throw ApiError.BadRequest(`A user with an email ${email} already exists`)
        }
        const activationLink = uuid.v4();

        const user = await User.create({email, password, activationLink, name});
       // await MailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`);

        const userDto = new UserDto(user);
        const tokens = TokenService.generateTokens({...userDto});
        await TokenService.saveToken(userDto.id, tokens.refreshToken);

        return {...tokens, user: userDto}
    }


    async refresh(refreshToken) {
        if (!refreshToken) {
            throw ApiError.UnauthorizedError();
        }
        const userData = TokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = await TokenService.findToken(refreshToken);
        if (!userData || !tokenFromDb) {
            throw ApiError.UnauthorizedError();
        }
        const user = await User.findById(userData._id);
        const userDto = new UserDto(user);
        const tokens = TokenService.generateTokens({...userDto});

        await TokenService.saveToken(userDto.id, tokens.refreshToken);
        return {...tokens, user: userDto}
    }

    async logout(refreshToken) {
        const token = await TokenService.removeToken(refreshToken);
        return token;
    }

    async updateProfile(userId, body) {
        const user = await User.findById(userId);

        if(user) {
            user.name = body.name || user.name;
            user.email= body.email || user.email;
            
            if(body.password) {
                user.password = body.password;
            }
            const updatedUser = await user.save();
            return {...new UserDto(updatedUser)};
        }

        throw ApiError.UserNotFound();
        
    }

    async getProfile(userId) {
        const user = await User.findById(userId);
        
        if(user) {
            return new UserDto(user);
        }
        
        throw ApiError.UserNotFound();
    }
}



module.exports = new UserService();