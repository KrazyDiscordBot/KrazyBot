/**
 * The module to find the percantage of captial letters present in a string
 * @param {String} string The string in which you want to find the percantage of capital letters
 * @exports Promise<Number> The percantage of capital letters
 */
module.exports = (string) => {
    return new Promise((resolve, reject) => {
        try {
            let per = 0, lowChars = [], upChars = [];

            for (let i = 0; i < string.length; i++) {
                if (/[a-z]/.test(string[i])) lowChars.push(string[i])
                if (/[A-Z]/.test(string[i])) upChars.push(string[i])
            }

            per = Math.floor((upChars.length / (upChars.length + lowChars.length)) * 100);

            resolve(per);
        } catch (e) {
            reject(e)
        }
    })
}