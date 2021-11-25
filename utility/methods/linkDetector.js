const linkdetector = require("links-finder");

/**
 * The outcome of the Link Detector
 * @typedef {Array,String} output
 */

/**
 * An module to extract links from a string
 * @param {String} strin the string from which you want to find links
 * @returns {Promise<output>} The output have two values, first is array of links, second is text of links
 */
module.exports = (strin) => {
    return new Promise((resolve, reject) => {
        try {
            let det = linkdetector.findLinks(strin);

            let links = [], linksText;

            for (let i = 0; i < det.length; i++) {
                links.push(strin.substring(det[i].start, det[i].end + 1));
            }

            links.forEach((ll) => {
                linksText += ll + "\n";
            });

            resolve({ links, linksText });
        } catch (e) {
            reject(e);
        }
    })
}