const { Schema, model, SchemaTypes } = require('mongoose');

let botSchema = new Schema({
    id: { type: SchemaTypes.String, default: "0", required: true, unique: true },
    servers: { type: SchemaTypes.String, default: "0" },
    users: { type: SchemaTypes.String, default: "0" },
    complain: [{
        id: { type: SchemaTypes.String, default: "0" },
        guild: { type: SchemaTypes.String, default: "0" },
        channel: { type: SchemaTypes.String, default: "0" },
        user: { type: SchemaTypes.String, default: "0" },
        content: { type: SchemaTypes.String, default: "0" },
        at: { type: SchemaTypes.String, default: "0" },
        status: { type: SchemaTypes.Number, default: 0 },
    }],
    suggestion: [{
        id: { type: SchemaTypes.String, default: "0" },
        guild: { type: SchemaTypes.String, default: "0" },
        channel: { type: SchemaTypes.String, default: "0" },
        user: { type: SchemaTypes.String, default: "0" },
        content: { type: SchemaTypes.String, default: "0" },
        at: { type: SchemaTypes.String, default: "0" },
        status: { type: SchemaTypes.Number, default: 0 },
    }],
});

module.exports = model("botdb", botSchema);