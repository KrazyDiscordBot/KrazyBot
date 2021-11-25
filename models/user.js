const { Schema, model, SchemaTypes } = require('mongoose');

let userSchema = new Schema({
    id: { type: SchemaTypes.String, default: "0", required: true, unique: true },
    points: { type: SchemaTypes.Number, default: 0 },
    ban: {
        all: { type: SchemaTypes.Boolean, default: false },
        sug: { type: SchemaTypes.Boolean, default: false },
        comp: { type: SchemaTypes.Boolean, default: false },
    },
    banTill: {
        all: { type: SchemaTypes.String, default: "0" },
        sug: { type: SchemaTypes.String, default: "0" },
        comp: { type: SchemaTypes.String, default: "0" },
    },
    mails: [{
        title: { type: SchemaTypes.String, default: "" },
        description: { type: SchemaTypes.String, default: "" },
        from: { type: SchemaTypes.String, default: "" },
        note: { type: SchemaTypes.String, default: "" },
        at: { type: SchemaTypes.Number, default: Date.now() },
    }],
    basicConfig: {
        gender: { type: SchemaTypes.String, default: "none" },
        device: { type: SchemaTypes.String, default: "none" },
        language: { type: SchemaTypes.String, default: "english" },
        description: { type: SchemaTypes.String, default: "description" },
        rankCardBackground: { type: SchemaTypes.String, default: "#000000" },
        rankCardColors: { type: SchemaTypes.Array, default: ["#00ff00","#723aff","#4dffe4","#723aff","#4dffe4","#723aff","#4dffe4","#723aff","#4dffe4","#ffffff"] },
    },
    note: [{
        name: { type: SchemaTypes.String, default: "none" },
        rname: { type: SchemaTypes.String, default: "none" },
        content: { type: SchemaTypes.String, default: "none" },
    }]
});

module.exports = model("Userdata", userSchema);