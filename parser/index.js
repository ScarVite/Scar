const fs = require('file-system');

class Parser {

    constructor(conf) {
        this.config = conf;
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
                    files.filter(file => {
                        if(!file.includes('.scar')) {
                            wrongEnding.push(file);
                        }
                        return file.includes('.scar');
                    });
                    console.log(wrongEnding, files)
                    if(wrongEnding.length > 0) console.log(`Some Files had the Wrong Ending`, `\nAffected Files: \n`, ...wrongEnding, `\n Simply just copying these files`);
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
                var loadedFile = fs.readFileSync(file);
            })
        })
    }
}

exports.Parser = Parser;