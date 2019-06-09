//dependencies//
var mysql = require("mysql");
var inquirer = require("inquirer");
require("console.table");

//variable for database credentials//
var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "yourRootPassword",
    database: "bamazon"
});
//connect to database//
connection.connect(function (err) {
    if (err) throw err;
    //display products(table)// 
    display();
});
//display products function//
//select all data from db//
//display the data in the terminal//

function display() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        console.table(res);
        selectItem(res)
    })
}

function selectItem(res) {
    console.table(res);
    //prompt the customer for an item//
    //customer selects an item//
//use inquire to select an item by item_id//
    inquirer
        .prompt({
            name: "choice",
            type: "input",
        message: "What would you like to purchase?",
///////////////////////////// todo validate input as a integer/////////////
        })
        .then(function(answer) {
            var choiceId = parseInt(answer.choice);
            var product = checkInventory(choiceId, res);
    //if/else statement to see if product exists with id// 
    //in else statement alert customer that item doesn't exist//
        if (product) {
             //if so, want to ask how many to buy//
            howMany(product)
        }else {
            console.log ("nothing in inventory");
            //rerun display function (for valid item_id)//
            display()
        } 
           });
   
}
  
//use inquire to ask customer how many//
function howMany(product) {
    console.log ("product",product);
    inquirer
    .prompt({
        name: "quantity",
        type: "input",
        messsage: "How many would you like?", 
//validate quantity is greater than 0!//
    }) 
    .then(function(answer){   
        console.log ("item",product);
        console.log ("does it work?", answer)
        var quantityWanted =  parseInt(answer.quantity);
        var inventoryQuantity = parseInt(product.stock_quantity);
        console.log (quantityWanted, inventoryQuantity);
        //if/else statement: if there is not enough of selected item, notify customer//
////if the quantity wanted is less than or equal to inventory quantity than move to purchase function//
        //else notify customer & rerun display function//
    if (quantityWanted <= inventoryQuantity) {
        purchase(quantityWanted, product)
        //else statement: run a purchase function//
    }else {
        console.log ("don't have enough stock");
        //rerun display function//
        display()
    }
    });
}
//since quantityWanted was valid, customer can move on to purchasing items//
function purchase(quantityWanted, product) {
    //console.log (quantityWanted, product);
        connection.query(
          "UPDATE products SET stock_quantity = stock_quantity - ? WHERE item_id = ?",
          //update query on sql database//
          [quantityWanted, product.item_id],
          function(err, res) {
            // Let the user know the purchase was successful, re-run loadProducts
            console.log("\nYou have purchased " + quantityWanted+ " " + product.product_name + "'s!");
            display();
          }
        );
      }
    

    //inform the user that purchase was successful//

    //rerun display again//


function checkInventory(choiceId, inventory) {
    console.log (choiceId, inventory)
    //for loop to loop through inventory//
    for (var i=0; i < inventory.length; i++) {
            //if statement: if selected item matches item id in db, return the inventory//
        if (inventory[i].item_id === choiceId){
            return inventory[i]
        }else{
             //else: return null//
            return null;
        }
    }
}