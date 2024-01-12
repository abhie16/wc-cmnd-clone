import fs from "fs";
import ReadLine from "readline";

 export function wcClone(){
    try {
        const arg1 = process.argv[2];
        const arg2 = process.argv[3];
        
    
        if(!arg1){
            console.log('path is missing')
        }
        else if(arg1 === '-c'){
            if(!arg2){
                const fileContent = fs.readFileSync(0, 'utf8');
                const bytes = bytesInFile(fileContent);
                console.log(`${bytes}`);
                return;
            }

            const fileContent = fs.readFileSync(arg2, 'utf8');
            const bytes = bytesInFile(fileContent);
            console.log(`${bytes} ${arg2}`);
        }
        else if(arg1 === '-l'){

            if(!arg2){
                const fileContent = fs.readFileSync(0, 'utf8');
                const lines = linesInFile(fileContent);
                console.log(`${lines}`);
                return;
            }

            const fileContent = fs.readFileSync(arg2, 'utf8');
            const lines = linesInFile(fileContent);
            console.log(`${lines} ${arg2}`);
        }
        else if(arg1 === '-w'){
            if(!arg2){
                const fileContent = fs.readFileSync(0, 'utf8');
                const words = wordsInFile(fileContent);
                console.log(`${words}`);
                return;
            }

            const fileContent = fs.readFileSync(arg2, 'utf8');
            const words = wordsInFile(fileContent);
            console.log(`${words} ${arg2}`);
        }
        else if(arg1 === '-m'){
            if(!arg2){
                const fileContent = fs.readFileSync(0, 'utf8');
                const chars = charsInFile(fileContent);
                console.log(`${chars}`);
                return;
            }

            const fileContent = fs.readFileSync(arg2, 'utf8');
            const chars = charsInFile(fileContent);
            console.log(`${chars} ${arg2}`);
        }
        else{
            const fileContent = fs.readFileSync(arg1, 'utf8');
            const bytes = bytesInFile(fileContent);
            const lines = linesInFile(fileContent);
            const words = wordsInFile(fileContent);
            
            console.log(`${lines} ${words} ${bytes} ${arg1}`);
        }
    } catch (error) {
        console.log(error);
    }
}

function bytesInFile(fileContent){
    try {
        return new Blob([fileContent]).size;
    } catch (error) {
        console.log(error);   
    }
}

function linesInFile(fileContent){
    const fileContentLines = fileContent.split('\n');
    return fileContentLines.length-1;
}

function wordsInFile(fileContent){
    try {
        const words = fileContent.trim().split(/\s+/);
        return words.length;
    } catch (error) {
        console.log(error);
    }
}

function charsInFile(filePath){
    try {
        return filePath.length;
    } catch (error) {
        console.log(error);
    }
}