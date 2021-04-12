const fs = require('file-system');

const { Syntax } = require('../syntax/')

class Parser {

    constructor(conf) {
        this.config = conf;
        this.Syntax = new Syntax(conf);
    }

    async listFiles() {
        fs.readdir(config.inDir, (err, files) => {
            if (err) console.log(err)
            if(!files.length) {
                console.log(`There Are no Files in the Input Dir`);
            }
        });
    }

    async initDir() {
        return new Promise(async (resolve, reject) => {
            fs.readdir(this.config.inDir, (err, files) => {
                if (err) console.log(err)
                console.log(files)
                if(files.filter(file => !file.includes('.scar')).length > 0) {
                    var wrongEnding = [];
                    files = files.filter(file => {
                        if(!file.includes('.scar')) wrongEnding.push(file);
                        return file.includes('.scar');
                    });
                    if(wrongEnding.length > 0) console.log(`Some Files had the Wrong Ending`, `\nAffected Files: \n`, ...wrongEnding, `\n Simply just copying these files`);
                    this.getFiles(files)
                } 
                if(!files.length) {
                    reject(`There Are no Files in the Input Dir`);
                }
                fs.readdir(this.config.outDir, (err, files) => {
                    if(err) console.log(err);
                    console.log(files);
                });
            });
        })
    }

    async getFiles(files) {
        return new Promise(async (resolve, reject) => {
            files.forEach(async (file) => {
                var loadedFile = fs.readFileSync(`${this.config.inDir}/${file}`, "utf8");
                await this.Syntax.checkSyntax(loadedFile);
            })
        })
    }
}

exports.Parser = Parser;