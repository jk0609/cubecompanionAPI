##Description##
An API that queries a MongoDB database for Magic the Gathering cards and collections of those cards. Will be hooked up to a React front-end app that sorts user collections.

##Steps to Use**
* Pending

##Endpoints##
* `/create` - Check's request body for card attributes then queries the official Magic the Gathering api. Creates instances of a Card model based on results. Currently only searches by card name.

* `/read` - Returns a list of Card objects currently stored in the database. Currently returns all cards, will eventually filter by user, card attributes, etc.

* `/:id/delete` - Removes Card with :id from database.