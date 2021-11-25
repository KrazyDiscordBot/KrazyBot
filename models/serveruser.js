const { Schema, model, SchemaTypes } = require('mongoose');

let ServerUserSchema = new Schema({
  userID: { type: SchemaTypes.String, default: "0", required: true, unique: true },
  guildID: { type: SchemaTypes.String, default: "0", required: true, unique: true },
  Ban: { type: SchemaTypes.Boolean, default: false },
  track: { type: SchemaTypes.Boolean, default: false },
  XP: { type: SchemaTypes.Number, default: 0 },
  level: { type: SchemaTypes.Number, default: 0 },
  lastXP: { type: SchemaTypes.Number, default: 0 },
  afk: {
    afk: { type: SchemaTypes.Boolean, default: false },
    from: { type: SchemaTypes.Number, default: 0 },
    mentions: { type: SchemaTypes.Number, default: 0 },
    reply: { type: SchemaTypes.String, default: "No reason was specified" },
  },
  warn: [
    {
      mod: { type: SchemaTypes.Number, default: 0 },
      user: { type: SchemaTypes.Number, default: 0 },
      at: { type: SchemaTypes.Number, default: Date.now() },
      reason: { type: SchemaTypes.String, default: "No reason was specified" },
    }
  ],
  autoMod: {
    caps: {
      count: { type: SchemaTypes.Number, default: 1 }
    },
    links: {
      count: { type: SchemaTypes.Number, default: 1 },
    },
    images: {
      count: { type: SchemaTypes.Number, default: 1 },
    },
    emojis: {
      count: { type: SchemaTypes.Number, default: 1 },
    },
    abuse: {
      count: { type: SchemaTypes.Number, default: 1 },
    },
    spam: {
      count: { type: SchemaTypes.Number, default: 3 },
    },
    dublicate: {
      count: { type: SchemaTypes.Number, default: 3 },
    },
    strikes: { type: SchemaTypes.Number, default: 0 },
    messages: [
      {
        at: { type: SchemaTypes.Number },
        content: { type: SchemaTypes.String }
      }
    ],
  },
  logs: {
    startToday: { type: SchemaTypes.Number, default: Date.now() },
    startWeek: { type: SchemaTypes.Number, default: Date.now() },
    startMonth: { type: SchemaTypes.Number, default: Date.now() },
    messageToday: { type: SchemaTypes.Number, default: 0 },
    messageWeek: { type: SchemaTypes.Number, default: 0 },
    messageMonth: { type: SchemaTypes.Number, default: 0 },
    messageTotal: { type: SchemaTypes.Number, default: 0 },
  }
});

module.exports = model("guilduserconfig_", ServerUserSchema);