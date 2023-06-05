import  express  from 'express'
import cors from 'cors'
import {config} from 'dotenv'
import router from './router/route.js'

import connect from './data/conn.js'


const app = express()

app.use(cors());
app.use(express.json());
config();


const port = process.env.PORT || 8080;


app.use('/api', router)

app.get('/',(req, res)=>{
    try {
        res.json("Get Запит")
    } catch (error) {
        console.log(error)
    }
})

connect().then(()=>{
    try{
        app.listen(port, ()=>{
            console.log(`Сервер запустився по 'http://localhost:${port}`)
        })
    } catch(error){
        console.log("Неправильне підєднання")
    }
}).catch(error =>{
    console.log("Перевірти чи правильновказали ")
})

