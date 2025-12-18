const express = require("express")
const {users} = require("./Data/users.json")

const userRoutes = require("./routes/users")
const bookRoutes = require("./routes/books")

const app = express()

const PORT = 8081

app.use(express.json())

app.get("/" , (req , res)=>{
  res.status(200).json({
    message : "Home Page :-)"
  })
})

app.use("/users" , userRoutes)
app.use("/books" , bookRoutes)






// app.all("*" , (req , res)=>{
//   res.status(500).json({
//     message : "Not Built Yet"
//   })
// })

app.listen(PORT , ()=>{
  console.log(`Server is up and running on http://localhost:${PORT}`)
})