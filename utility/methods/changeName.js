module.exports = (name, int) => {
    let newName = "";

    name.split(" ").forEach(v => {
        let changed = true;
        if (isNaN(parseInt(v))) newName += `${v} `;
        else if (changed) {
            changed = false;
            newName += `${int} `;
        }
    });
    
    return newName.length > 32 ? newName.substring(0,31) : newName;
}