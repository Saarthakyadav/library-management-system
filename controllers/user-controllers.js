const {BookModel , UserModel} = require("../models")


exports.getAllUsers = async (req , res) =>{
  const users = await UserModel.find()

  if(users.length === 0){
    return res.status(404).json({
      success : false,
      message : "No Users in the system"
    })
  }

  res.status(200).json({
    success : true,
    message : "Users found in the DB",
    data : users
  })
}

exports.getUserById = async (req , res) =>{
  const {id} = req.params

  const user = UserModel.findById(id)

  if(!user){
    return res.status(400).json({
      success : true,
      message : `No user found for id: ${id}`
    })
  }

  res.status(200).json({
    success : true,
    message : `User found for id: ${id}`,
    data : user
  })
}

exports.createUser = async (req ,res) => {
  const {data} = req.body;

   if(!data || Object.keys(data).length === 0){
    return res.status(400).json({
      success : false,
      message : "Please Provide Data for the New Book"
    })
   }

   await UserModel.create(data);

   const users = await UserModel.find()

   res.status(200).json({
    success : true,
    message : "User Added Successfully",
    data : users
   })
}


exports.UpdateUserById = async (req ,res) =>{
    const upadtedUser = await UserModel.findOneAndUpdate(
    {_id : id},
    data,
    {new : true}
  );

  if(!upadtedUser){
      return res.status(400).json({
       success : false,
       message : `No User found for id : ${id}`
    })
  }

  res.status(200).json({
    success : true,
    message : "User Updated Successfully",
    data : upadtedUser
  })
}

exports.deleteBookById = async (req , res) =>{
  const {id} = req.params

  const user = await UserModel.findById(id)

  if(!user){
    return res.status(400).json({
      success : false,
      message : `User not found for id: ${id}`
    })
  }

  await UserModel.findByIdAndDelete(id)

  res.status(200).json({
    success : true,
    message : "User deleted successfully"
  })
}

exports.getSubscriptionDetailsById = async (req  , res) =>{
  const {id} = req.params

  const user = await UserModel.findById(id)

  if(!user){
    return res.status(404).json({
      success : false,
      message : `User Not found for ${id}`
    })
  }

  const getDateInDays = (data = '') =>{
    let date;

    if(data){
      date = new Date(data)
    }
    else{
      date = new Date()
    }

    let days = Math.floor(date / 1000 * 60 * 60 * 24)

    return days
  }

  const subscriptionType = (date) =>{
    if(user.subscriptionType === "Basic") date = date + 90
    else if(user.subscriptionType === "Standard" ) date = date + 180
    else date = date + 365

    return date
  }

  let returnDate = getDateInDays(user.returnDate)
  let currentDate = getDateInDays()
  let subscriptionDate = getDateInDays(user.subscriptionDate)
  let subscriptionExpiration = subscriptionType(subscriptionDate)

  const data = {
    ...user._doc,
    subscriptionExpiration : subscriptionExpiration < currentDate,
    subscriptionDaysLeft : subscriptionExpiration - currentDate,
    daysLeftForExpiration : returnDate - currentDate,
    returnDate : returnDate < currentDate ? "Book is overdue" : returnDate,
    fine : returnDate < currentDate ? subscriptionExpiration <= currentDate ? 200 : 100 : 0
  }

  res.status(200).json({
    success : true,
    data : data
  })
}

