const fs = require('fs');
const util = require('util');

const unlink = util.promisify(fs.unlink);


class FileLib {




    async deleteFile(URL){

        try {
        
            return await unlink(URL);

        } catch (error) {

            throw error;
            
        }

        

    }




}




module.exports = FileLib;