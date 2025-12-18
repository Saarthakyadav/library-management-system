const express = require("express")

const data = require("../Data/users.json")

let users = data.users

const router = express.Router()
/**
 * Route: /users
 * Method : GET
 * Descrition : Get all the list of users in the system
 * Access : Public
 * Params : None
 */

router.get("/" , (req , res) =>{
  res.status(200).json({
    success : true,
    data : users
  })
})


/**
 * Route: /users/:id
 * Method : GET
 * Descrition : Get all the list of users in the system by their id
 * Access : Public
 * Params : ID
 */

router.get("/:id" , (req , res) =>{
  const {id} = req.params

  const user = users.find((each) => each.id === id)
  if(!user){
   return res.status(404).json({
      success : false,
      message : `User Not Found for ${id}`
    })
  }
  res.status(200).json({
    success : true,
    data : user
  })
})


/**
 * Route: /users
 * Method : POST
 * Descrition : Create/Register a new user
 * Access : Public
 * Params : None
 */

router.post("/" , (req , res)=>{
  const {id , name , surname , email , subscriptionType , subscriptionDate} = req.body;

  if(!id || !name || !surname || !email || !subscriptionDate || !subscriptionType){
    return res.status(404).json({
      success : false,
      message : "Please provide all required fields"
    })
  }

  const user = users.find((each) => each.id === id)
  if(user){
    return res.status(409).json({
      success : false,
      message : `User already exists with ${id}`
    })
  }

  users.push({
    id , name , surname , email , subscriptionDate , subscriptionType
  })

  res.status(201).json({
    success : true,
    message : `User created successfully with ${id}`
  })
})

/**
 * Route: /users/:id
 * Method : PUT
 * Descrition : Updating user by their id
 * Access : Public
 * Params : ID
 */

router.put("/:id" , (req , res)=>{
  const {id} = req.params
  const {data} = req.body

  const user = users.find((each) => each.id === id)

  if(!user){
    return res.status(404).json({
      success : false,
      message : `No user found for ${id}`
    })
  }

  // Object.assign(book , data) // direct assignment

  //assignmnet using spread operator
  const updatedUser = users.map((each) => {
    if(each.id === id){
      return {
        ...each, 
        ...data,
      }
    }
    return each
  })

  res.status(200).json({
    success : true,
    data : updatedUser,
    message : "Data updated successfully"
  })
})

/**
 * Route: /users/:id
 * Method : DELETE
 * Descrition : Deleting user by their id
 * Access : Public
 * Params : ID
 */

router.delete("/:id" , (req , res) =>{
  const {id} = req.params;

  const user = users.find((each) => each.id === id)

  if(!user){
    return res.status(400).json({
      success : false,
      message : `User Not Found for ${id}`
    })
  }

  const updatedUsers = users.filter((each) => each.id !== id)

  // //2nd method
  // const index = users.indexOf(user)
  // users.splice(index , 1)

  res.status(200).json({
    success : true,
    data : updatedUsers,
    message : `User delted successfully for ${id}`
  })
})


/**
 * Route: /users/subscription-details/:id
 * Method: GET
 * Decsription:  Get all the subscription details of a user by their ID
 * Access: Public
 * Paramters: ID
 */
router.get('/subscription-details/:id', (req, res) => {
    const { id } = req.params;

    // Find the user by ID
    const user = users.find((each) => each.id === id);
    if (!user) {
        return res.status(404).json({
            success: false,
            message: `User Not Found for id: ${id}`
        });
    }

    // Extract the subscription details
    const getDateInDays = (data = '') =>{
        let date;
        if(data){
            date = new Date(data);
        }else{
            date = new Date();
        }
        let days = Math.floor( date/ (1000 * 60 * 60 * 24));
        return days;
    }

    const subscriptionType = (date) => {
        if(user.subscriptionType === "Basic"){
            date = date + 90
        }else if(user.subscriptionType === "Standard"){
            date = date + 180
    }else if(user.subscriptionType === "Premium"){
            date = date + 365
        }
        return date;
    }

    // Subscription Expiration Calculation 
    // January 1, 1970 UTC // milliseconds

    let returnDate = getDateInDays(user.returnDate);
    let currentDate = getDateInDays();
    let subscriptionDate = getDateInDays(user.subscriptionDate);
    let subscriptionExpiration = subscriptionType(subscriptionDate);

    const data = {
        ...user,
        subscriptionExpired: subscriptionExpiration < currentDate,
        subscriptionDaysLeft: subscriptionExpiration - currentDate,
        daysLeftForExpiration: returnDate - currentDate,
        returnDate: returnDate < currentDate ? "Book is overdue" : returnDate,
        fine: returnDate < currentDate ? subscriptionExpiration <= currentDate ? 200 : 100 : 0
    }

    res.status(200).json({
        success: true,
        data
    });
});



module.exports = router;