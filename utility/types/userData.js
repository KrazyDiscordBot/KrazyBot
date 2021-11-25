let userData = {
    id: "",
    points: 0,
    ban: {
        all: false,
        sug: false,
        comp: false,
    },
    banTill: {
        all: "0",
        sug: "0",
        comp: "0",
    },
    mails: [{
        title: "",
        description: "",
        from: "",
        note: "",
        at: Date.now(),
    }],
    basicConfig: {
        gender: "none",
        device: "none",
        language: "english",
        description: "description",
        rankCardBackground: "#000000",
        rankCardColors: ["#00ff00", "#723aff", "#4dffe4", "#723aff", "#4dffe4", "#723aff", "#4dffe4", "#723aff", "#4dffe4", "#ffffff"],
    },
    note: [{
        name: "none",
        rname: "none",
        content: "none",
    }]
};

module.exports = userData;