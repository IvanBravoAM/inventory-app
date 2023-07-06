import fs from 'fs';

async function readFile(path){
    try{
        let fileContent = await fs.promises.readFile(path, 'utf-8');
        let data = JSON.parse(fileContent);

        return data;
    }catch(err){
        console.log(err)
    }
}

async function writeFile(path, data){
    try{
        const jsonContent = JSON.stringify(data)
        await fs.promises.writeFile(path,jsonContent)
    }catch(err){
        console.log(err);
    }
}

export default {readFile, writeFile};