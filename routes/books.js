const express = require("express")

//const books = require("../Data/books.json")
//const users = require("../Data/users.json")

const { getAllBooks, getSingleBookById, getAllIssuedBooks, addNewBook, UpdateAbookById, deleteBookById} = require("../controllers/book-controllers")

const router = express.Router()


/**
 * Route: /books
 * Method : GET
 * Descrition : Get all the list of books in the system
 * Access : Public
 * Params : None
 */

// router.get("/" , (req , res) =>{
//   res.status(200).json({
//     success : true,
//     data : books
//   })
// })

router.get("/" , getAllBooks)

/**
 * Route: /books/:id
 * Method : GET
 * Descrition : Get all the list of books in the system by their id
 * Access : Public
 * Params : ID
 */

// router.get("/:id" , (req , res) =>{
//   const {id} = req.params

//   const book = books.find((each) => each.id === id)
//   if(!book){
//    return res.status(404).json({
//       success : false,
//       message : `Book Not Found for id: ${id}`
//     })
//   }
//   res.status(200).json({
//     success : true,
//     data : books
//   })
// })

router.get("/:id" , getSingleBookById)

/**
 * Route: /books
 * Method : POST
 * Descrition : Create/Register a new book
 * Access : Public
 * Params : None
 */

// router.post("/" , (req , res)=>{
//   const {id , name , author , genre , price , publisher} = req.body;

//   if(!id || !name || !author || !genre || !price || !publisher){
//     return res.status(404).json({
//       success : false,
//       message : "Please provide all required fields"
//     })
//   }

//   const book = books.find((each) => each.id === id)
//   if(book){
//     return res.status(409).json({
//       success : false,
//       message : `Book already exists with id: ${id}`
//     })
//   }

//   books.push({
//     id , name , author , genre, price , publisher , 
//   })

//   res.status(201).json({
//     success : true,
//     message : `Book created successfully with id: ${id}`
//   })
// })

router.post("/" , addNewBook);


/**
 * Route: /books/:id
 * Method : PUT
 * Descrition : Updating a book by their id
 * Access : Public
 * Params : ID
 */

// router.put("/:id" , (req , res)=>{
//   const {id} = req.params
//   const {data} = req.body

//   const book = books.find((each) => each.id === id)

//   if(!book){
//     return res.status(404).json({
//       success : false,
//       message : `No book found for id: ${id}`
//     })
//   }

//   //Object.assign(user , data) // direct assignment

//   //assignmnet using spread operator
//   const updatedBook = books.map((each) => {
//     if(each.id === id){
//       return {
//         ...each, 
//         ...data,
//       }
//     }
//     return each
//   })

//   res.status(200).json({
//     success : true,
//     message : "Data updated successfully",
//     data : updatedBook
//   })
// })

router.put("./:id" , UpdateAbookById);





/**
 * Route: /books/:id
 * Method : DELETE
 * Descrition : Deleting book by their id
 * Access : Public
 * Params : ID
 */

// router.delete("/:id" , (req , res) =>{
//   const {id} = req.params;

//   const book = books.find((each) => each.id === id)

//   if(!book){
//     return res.status(400).json({
//       success : false,
//       message : `Book Not Found for id: ${id}`
//     })
//   }

//   const updatedBooks = books.filter((each) => each.id !== id)

//   // //2nd method
//   // const index = users.indexOf(user)
//   // users.splice(index , 1)

//   res.status(200).json({
//     success : true,
//     data : updatedBooks,
//     message : `Book delted successfully for id: ${id}`
//   })
// })

router.delete("/:id" , deleteBookById)


/**
 * Route: /books/issued
 * Method : GET
 * Descrition : Get all the list of books in the system by their id
 * Access : Public
 * Params : ID
 */

// router.get("/issued" , (req , res) =>{
//   //const {id} = req.params

//   const book = books.find((each) => each.id === id)
//   if(!book){
//    return res.status(404).json({
//       success : false,
//       message : `Book Not Found for id: ${id}`
//     })
//   }
//   res.status(200).json({
//     success : true,
//     data : books
//   })
// })



/**
 * Route: /books/issued/for-users
 * Method: GET
 * Decsription:  Get all issued books
 * Access: Public
 * Paramters: None
 */
// router.get('/issued/for-users', (req, res) => {
//    // const issuedBooks = books.filter((each) => each.issued === true);

//     const usersWithIssuedBooks = users.filter((each)=>{
//         if(each.issuedBook) {
//             return each;
//         }
//     })

//     const issuedBooks = [];
  
//     usersWithIssuedBooks.forEach((each)=>{
//         const book = books.find((book)=> book.id ===each.issuedBook);

//         book.issuedBy = each.name;
//         book.issuedDate = each.issuedDate;
//         book.returnDate = each.returnDate;

//         issuedBooks.push(book)
//     })

//     if(!issuedBooks === 0){
//         return res.status(404).json({
//             success: false,
//             message: "No Books issued yet"
//         })
//     }

//     res.status(200).json({
//         success: true,
//         data: issuedBooks
//     });
// });

router.get("/issued/for-users" , getAllIssuedBooks)


















module.exports = router;