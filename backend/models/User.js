const mongoose = require("mongoose");

const schema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            minLength: 3,
            maxLength: 30,
        },
        lastName: {
            type: String,
            required: true,
            minLength: 3,
            maxLength: 30,
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
            minLength: 8,
        },
        phoneNumber : {
            type: Number,
            default: null
        },
        role : {
            type : String,
            default: "USER"
        },
        basket: {
            type: Object,
            default: [],
        },
        wishlists: {
            type: Object,
            default: [],
        },
        orders: {
            type: Object,
            default: [],
        },
        address: {
            type: Object,
            default: [],
        },
        cards: {
            type: Object,
            default: [],
        },
        notifications: {
            type: Object,
            default: [],
        },
    },
    { versionKey: false }
);

const userModel = mongoose.model("users", schema);

module.exports = userModel;
