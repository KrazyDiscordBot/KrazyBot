const punishments = require("../types/punishment");

/**
 * Return the array of punishment in string
 * @param {Array<Number>} array 
 */
module.exports = (array) => {
    let ar = [];

    array.forEach(v=>{
        ar.push(punishments[v.toString()]);
    })

    return ar;
}