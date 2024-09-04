import express from 'express'

const app = express()
app.use(express.json())

const PORT = process.env.PORT || 4000
app.listen(PORT, ()=>{
    console.log(`server listening at http://localhost:${PORT}`)
})