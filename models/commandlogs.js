const { Schema, model, SchemaTypes } = require('mongoose');

const commandLogsSchema = new Schema({
    time: { type: SchemaTypes.Number, default: Date.now() },
    command: { type: SchemaTypes.String, default: "" },
    user: { type: SchemaTypes.String, default: "" },
    guild: { type: SchemaTypes.String, default: "" },
});

module.exports = model("commandlogs", commandLogsSchema);