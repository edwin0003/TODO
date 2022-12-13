import { App } from "./src/app.js";
import * as dotenv from  "dotenv"
dotenv.config();

const port = process.env.PORT || 3001

App.listen(port, ()=>{
    console.log("Estoy en el puerto ", port);
})
