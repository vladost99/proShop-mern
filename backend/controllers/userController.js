const User = require('../models/user');
const asyncHandler = require('express-async-handler');
const TokenService = require('../services/TokenService');
const UserDto = require('../dtos/user-dto');

const login = asyncHandler(async (req, res) => {
    const {email, password} = req.body;

    const user = await User.findOne({email});

    if(!user) {
        res.status(401)
        throw new Error('There is no user with this email');
    }

    const isPassEquals = await user.matchPassword(password);

    if(!isPassEquals) {
        res.status(401)
        throw new Error('Invalid password');
    }
    let data = {...new UserDto(user), token: TokenService.generateToken(user._id)};
    res.json(data);
    

});

const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if(user) {
        res.json(new UserDto(user));
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});



const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if(user) {
       user.name = req.body.name || user.name;
       user.email= req.body.email || user.email;
       
       if(req.body.password) {
           user.password = req.body.password;
       }

       const updatedUser = await user.save();
       res.json({...new UserDto(updatedUser), token: TokenService.generateToken(updatedUser._id)})

    } else {
        res.status(404);
        throw new Error('User not found');
    }
});


const registerUser = asyncHandler(async (req, res) => {
    const data = req.body;

    const userExists = await User.findOne({email: data.email});

    if(userExists) {
        res.status(400)
        throw new Error('User already exists');
    }

    const user = await User.create({
        name: data.name,
        email: data.email,
        password: data.password
    });

    if(user) {
        res.status(201).json({
            ...new UserDto(user),
            token: TokenService.generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data');
    }
    
});

const getAllUser = asyncHandler(async (req, res) => {
    const users = await User.find({});
    res.json(users);
})

const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if(user) {
        await user.remove();
        res.json({message: 'User removed'});
    } else {
        res.status(404);
        throw new Error('User not Found');
    }

});

const getUseById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    
    if(user) {
        res.json(user);
    }
    else {
        res.status(404);
        throw new Error('User not found');
    }
});

const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if(user) {
        user.name = req.body.name || user.name;
        user.email= req.body.email || user.email;
        user.isAdmin = req.body.isAdmin || user.isAdmin;
        
        const updateUser = await user.save();
        res.json({...new UserDto(updateUser)});
    }
});

module.exports = {
    login,
    getUserProfile,
    registerUser,
    updateUserProfile,
    getAllUser,
    deleteUser,
    updateUser,
    getUseById
}