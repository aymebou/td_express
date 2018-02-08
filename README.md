# td_express

Tables :
* Product
    * brand the key of the product : text
    * price (in pennies) int
    * volume (ml) of the bottle
    * stock 
    
* users
    * username 
    * authorization (0 for root, positive int for others)
    * password (hashed)
    
* Implemented functions :
    * Patch stock input : json (product name (brand), value to increase)
    * add product to the table
    * update authorization of user
    