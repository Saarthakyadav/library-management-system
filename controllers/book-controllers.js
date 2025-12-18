const {BookModel , UserModel} = require("../models")

const IssuedBook = require("../dtos/book-dtos")

// router.get("/" , (req , res) =>{
//   res.status(200).json({
//     success : true,
//     data : books
//   })
// })

exports.getAllBooks = async (req , res) => {
  const books = await BookModel.find()

  if(books.length === 0){
    return res.status(404).json({
      success : false,
      message : "No Books in the system"
    })
  }

  res.status(200).json({
    success : true,
    message : "Books found in the DB",
    data : books 
  })
}


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

exports.getSingleBookById = async (req , res) => {
  const {id} = req.params

  const book = await BookModel.findById(id)

  if(!book){
   return res.status(404).json({
      success : false,
      message : `Book Not Found for id: ${id}`
    })
  }
  res.status(200).json({
    success : true,
    data : book
  })
}

// router.get('/issued/for-users', (req, res) => {
//     // const issuedBooks = books.filter((each) => each.issued === true);

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

exports.getAllIssuedBooks = async (req , res) =>{
   const users = await UserModel.find({
    issuedBook: {$exists : true}
   }).populate("issuedBook")

   const issuedBooks = users.map((each) =>{
      return IssuedBook(each);
   })

   if(issuedBooks.length === 0){
    return res.status(404).json({
      success : false,
      message : "No Books issued yet"
    })
   }
   res.status(200).json({
    success : true,
    data : issuedBooks
   })
}

exports.addNewBook = async(req , res) =>{
   const {data} = req.body;

   if(!data || Object.keys(data).length === 0){
    return res.status(400).json({
      success : false,
      message : "Please Provide Data for the New Book"
    })
   }

   await BookModel.create(data);

   const allBooks = await BookModel.find()

   res.status(200).json({
    success : true,
    message : "Book Added Successfully",
    data : allBooks
   })
}


exports.UpdateAbookById = async (req , res) =>{
  // const {id} = req.params
  // const {data} = req.body

  // if(!data || Object.keys(data).length === 0){
  //   return res.status(400).json({
  //     success : false,
  //     message : "Please provide the data for updation"
  //   })
  // }

  // const book = await BookModel.findById(id)

  // if(!book){
  //   return res.status(400).json({
  //     success : false,
  //     message : `No book found for id : ${id}`
  //   })
  // }

  // Object.assign(book , data)

  // await book.save()

  // res.status(200).json({
  //   success : true,
  //   message : `Book details updated successfully`,
  //   data : book
  // })

  const upadtedBook = await BookModel.findOneAndUpdate(
    {_id : id},
    data,
    {new : true}
  );

  if(!upadtedBook){
      return res.status(400).json({
       success : false,
       message : `No book found for id : ${id}`
    })
  }

  res.status(200).json({
    success : true,
    message : "Book Updated Successfully",
    data : upadtedBook
  })
}

exports.deleteBookById = async (req , res) => {
  const {id} = req.params

  const book = await BookModel.findById(id)

  if(!book){
    return res.status(400).json({
      success : false,
      message : `Book not found for id: ${id}`
    })
  }

  await BookModel.findByIdAndDelete(id)

  res.status(200).json({
    success : true,
    message : "Book deleted successfully"
  })
}































// separately exporting is difficult
// module.exports = {
//   getAllBooks,
//   getSingleBookById
// }