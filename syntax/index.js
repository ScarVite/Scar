class Syntax {

    constructor(conf) {
        this.config = conf;
    }

    async checkSyntax(file) {
        return new Promise(async (resolve, reject) => {
            
        })
    }

}

class SyntaxError extends Error {

    constructor(message) {
        super(message);
        this.name = "SyntaxError";
    }
}


exports.Syntax = Syntax;