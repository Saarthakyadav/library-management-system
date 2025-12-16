# library-management-system
This is a LMS API backend for the management of users and the books

# Routes and the Endpoints 

## /users
GET: Get all the list of users in the system
POST: Create/Register a new user

## /users/{id}
GET: Get a user by their ID
PUT: Updating a user by their ID
DELETE: Deleting a user by their ID(Check if the user still has an issued book) && (is there any fine/penalty to be collected)

## /users/subscription-details/{id}
GET: Get a user subscription details by their ID
    >> Date of subscription
    >> Valid till ?
    >> Fine if any ?

## /books
GET: Get all the books in the system
POST: Add a new book to the system

## /books/{id}
GET: Get a book by its ID
PUT: Update a book by its ID
DELETE: Deleting a book by its ID

## /book/issued
GET: Get all the issued books

## /books/issued/withfine
GET: Get all issued books with their fine amount

### Subscription types
  >> Basic(3 months)
  >> Standard(6 months)
  >> Premium(12 months)

>> If a user misses the renewal date then the user should be fined with Rs 100

>> If a user misses his subscription then user is expected to pay Rs 100

>> If a user misses both renewal & subscription then the amount to be collected should be Rs 200

## commands:
npm init

npm i express

npm i nodemon --save-dev 

npm run dev

To restore node_modules and package-lock.json --> npm i/npm install



