const getType = require('./getType');

module.exports = function getOptions(args = "", argsDescription = "", argsType = "") {
    let last = "", lastIndex = 0;
    argsDescription = argsDescription.length > 1 ? argsDescription.split("|") : [] || [], argsType = argsType.length > 1 ? argsType.split("|") : [] || [], index = 0;

    const req = [], opt = [];

    for (let i = 0; i < args.length; i++) {
        if (last === "<" ? args[i] === ">" : args[i] === "]") {
            last === "<" ? req.push({ name: args.substring(lastIndex + 1, i).replace(/ /g, "-").toLowerCase(), required: true, description: argsDescription[index] || args.substring(lastIndex + 1, i), type: getType(argsType[index]) || "STRING" }) : opt.push({ name: args.substring(lastIndex + 1, i).replace(/ /g, "-").toLowerCase(), required: false, description: argsDescription[index] || args.substring(lastIndex + 1, i), type: getType(argsType[index]) || "STRING" });
            index++;
        }

        if (args[i] === "<" || args[i] === "[") {
            last = args[i];
            lastIndex = i;
        }
    }

    return req.concat(opt);
}