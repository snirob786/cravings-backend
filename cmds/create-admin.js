const crypto = require('crypto');
const User = require('../modules/user/models/user');
const ConnectDB = require('./utils/connect-db');

// localize arguments
if (process.argv.length !== 5) {
    process.stdout.write("Usage: " + __filename + " $NAME $EMAIL $PHONE \n");
    process.exit(1);
}

ConnectDB(function(){
    main().then((data)=>{
        var admin = data.admin, password = data.password;
        console.log("\x1b[1m","\x1b[32m","New admin created!","\x1b[0m");
        console.log(`Username: ${admin.email}`);
        console.log(`Password: ${password}`);
        process.exit(0); 
    })    
})

async function main(){
    var name = process.argv[2];
    var email = process.argv[3];
    var phone = process.argv[4];
    
    const password = crypto.randomBytes(12).toString('hex');

    try{
        var admin = new User({
            name,
            email,
            phone,
            password,
            role: 'admin'
        });
        admin = await admin.save();
    }
    catch(error){
        console.log("\x1b[31m",error.message);
        return process.exit(0);
    }
    
    return {admin:admin,password:password};
    
}
