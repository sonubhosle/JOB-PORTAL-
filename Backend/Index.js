const app = require('./App');
const dotenv = require('dotenv');
const Database_Connection = require('./Config/DB');



dotenv.config({path:"./Config/Config.env"});

Database_Connection()

app.listen(process.env.PORT, () =>{
    console.log(`http://localhost:${process.env.PORT}`)
})