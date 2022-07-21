//Validation
const Joi = require('@hapi/joi');

const registerValidation = (data) => {
    const schema = Joi.object({
       
        
        Email: Joi.string().required().email(),
        Password: Joi.string().min(6).required(),
        Name: Joi.string(),
        Phone: Joi.string(),
        Gender: Joi.string()
       
    });

    return schema.validate(data);
}

const loginValidation = (data) => {
    const schema = Joi.object({
        Email: Joi.string().required().email(),
        Password: Joi.string().min(6).required(),
        Name: Joi.string().optional().allow(''),
        Phone: Joi.string().optional().allow(''),
        Gender: Joi.string().optional().allow('')
    });

    return schema.validate(data);
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;