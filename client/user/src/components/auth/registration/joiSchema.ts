import Joi from "joi";

const schema = Joi.object({
    name: Joi.string()
        .min(3)
        .required()
        .label("Name")
        .messages({
            "string.empty": "Enter name",
            "string.min": "Name should have a minimum length of 3 characters",
            "any.required": "Name is required"
        }),
    email: Joi.string()
        .email({ tlds: { allow: false } })
        .required()
        .label("Email")
        .messages({
            "string.email": "Enter a valid email address",
            "string.empty": "Enter Email",
            "any.required": "Email is required"
        }),
    phone: Joi.string()
        .min(10)
        .required()
        .label("Phone")
        .messages({
            "string.min": "Phone number must be at least 10 digits",
            "string.empty": "Enter phone number",
            "any.required": "Phone number is required"
        }),
    password: Joi.string()
        .min(6)
        .required()
        .label("Password")
        .messages({
            "string.min": "Password should have a minimum length of 6 characters",
            "string.empty": "Enter password",
            "any.required": "Password is required"
        })
});

export default schema;