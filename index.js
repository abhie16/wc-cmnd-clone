import fs from "fs";
import ReadLine from "readline";

 export async function wcClone(){
    try {
        const arg1 = process.argv[2];
        const arg2 = process.argv[3];
        
    
        if(!arg1){
            console.log('path is missing')
        }
        else if(arg1 === '-c'){
            const bytes = bytesInFile(arg2);
            console.log(`${bytes} ${arg2}`);
        }
        else if(arg1 === '-l'){

            // using await becuase linesInfile return a promise
            const lines = await linesInFile(arg2);
            console.log(`${lines} ${arg2}`);
        }
        else if(arg1 === '-w'){
            const words = wordsInFile(arg2);
            console.log(`${words} ${arg2}`);
        }
        else if(arg1 === '-m'){
            const chars = charsInFile(arg2);
            console.log(`${chars} ${arg2}`);
        }
        else{
            const bytes = bytesInFile(arg1);
            const lines = await linesInFile(arg1);
            const words = wordsInFile(arg1);
            
            console.log(`${lines} ${words} ${bytes} ${arg1}`);
        }
    } catch (error) {
        console.log(error);
    }
}

function bytesInFile(filePath){
    try {
        const text = fs.readFileSync(filePath, 'utf8');
        return new Blob([text]).size;
    } catch (error) {
        console.log(error);   
    }
}

function linesInFile(filePath){
    
        const fileStream = fs.createReadStream(filePath);
        const rl  = ReadLine.Interface({
            input: fileStream,
            crlfDelay: Infinity
        })

        // create a promise to return the number of lines because the readline is async function(promise based api) and we can't return the value directly from it
    
        const lines =  new Promise((resolve, reject) => {
            let count = 0;
            rl.on('line', (line) => count++);
            rl.on('close', () => resolve(count));
            rl.on('error', (err) => reject(err));
        })
        return lines;
    
}

function wordsInFile(filePath){
    try {
        const text = fs.readFileSync(filePath, 'utf8');
        const words = text.trim().split(/\s+/);
        return words.length;
    } catch (error) {
        console.log(error);
    }
}

function charsInFile(filePath){
    try {
        const text = fs.readFileSync(filePath, 'utf8');
        return text.length;
    } catch (error) {
        console.log(error);
    }
}