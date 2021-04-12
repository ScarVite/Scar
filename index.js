const fs = require('file-system');
const package = require('./package.json');
const { Parser } = require('./parser/');
const { Compiler } = require('./compiler/');

var config = {
    "compilerVersion": package.version,
    "inDir": "./",
    "outDir": "./"
};

var parser;

async function main() {
    await setup().catch(e => {
        throw new Error(e);
    });
    console.log(config)
    if (fs.existsSync(config.inDir)) {
        fs.mkdirSync(config.outDir);
        parser = new Parser(config);
        parser.initDir();
    }
    else {
        throw new Error("InputDir Does Not Exist");
    }
}

function setup() {
    return new Promise(async (resolve, reject) => {
        var error = [];
        var args = process.argv.slice(2);
        if (args.length > 0) {
            if (fs.existsSync('./scar.config.json')) {
                console.log("Ignoring Duplicate Config Entries and Preffering args");
            }
            console.log(args)
        }
        else {
            if (fs.existsSync('./scar.config.json')) {
                config = JSON.parse(fs.readFileSync('./scar.config.json'));
            }
            else {
                console.log("using Standard Config");
            }
        }
        if (error.length > 0) {
            reject("Something Went Wrong with the Setup");
        }
        else resolve();
    })
}

main();