import joi from 'joi';

const userSchema = joi.object().keys({
    loggedIn: joi.boolean(),
    loggingIn: joi.boolean(),
    username: [joi.string(), joi.empty()],
    password: joi.strip()
})

const sidebarSchema = joi.object().keys({
    open: joi.boolean()
})

export let reduxStateSchema = joi.object().keys({
    user: userSchema,
    sidebar: sidebarSchema
})