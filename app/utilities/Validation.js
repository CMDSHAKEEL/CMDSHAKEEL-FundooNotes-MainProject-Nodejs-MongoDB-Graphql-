const Joi = require('joi');

class joiValidation {
    authRegister =
        Joi.object({
            firstName: Joi.string()
                .min(2)
                .required()
                .pattern(new RegExp('[A-Za-z]')),

            lastName: Joi.string()
                .min(2)
                .required()
                .pattern(new RegExp('[A-Za-z]')),

            email: Joi.string()
                .pattern(new RegExp('^[a-zA-z]{3}([+-_ .]*[a-zA-Z0-9]+)*[@][a-zA-z0-9]+(.[a-z]{2,3})*$'))
                .required(),

            password: Joi.string()
                .pattern(new RegExp('[A-Za-z0-9]{4,}[$&+,:;=?@#|<>.^*()%!-]{2,}'))
                .required(),
             _id: Joi.required()
            
        })
        authLogin =
        Joi.object({
            email: Joi.string()
                .pattern(new RegExp('^[a-zA-Z0-9]+([+_.-][a-zA-Z0-9]+)*[@][a-zA-Z0-9]+[.][a-zA-Z]{2,4}([.][a-zA-Z]{2,4})?$'))
                .required(),

            password: Joi.string()
                .required()
                .pattern(new RegExp('[A-Za-z0-9]{4,}[$&+,:;=?@#|<>.^*()%!-]{2,}'))
        });

}
module.exports = new joiValidation();