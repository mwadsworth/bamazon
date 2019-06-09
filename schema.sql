DROP database IF EXISTS bamazon;

CREATE database bamazon;

USE bamazon;

CREATE TABLE products(
    item_id INT AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(100) NULL,
    department_name VARCHAR(100) NULL,
    price DECIMAL(10,2) NULL,
    stock_quantity INT(10) NULL,
    PRIMARY KEY (item_id) 
);

 INSERT INTO products (product_name, department_name, price, stock_quantity)
 VALUES ("banana chips", "snacks", 1.00, 10),
 ("sneakers", "footwear", 65.00, 3),
 ("tumbler", "houseware", 10.00, 10),
 ("cherries", "produce", 4.00, 3),
 ("bagels", "bakery", 2.00, 5),
 ("cream cheese", "dairy", 3.00, 5),
 ("socks", "clothing", 2.00, 15),
 ("markers", "supplies", 1.00, 8),
 ("shampoo", "beauty", 13.00, 5),
 ("conditioner", "beauty", 15.00, 2);

  SELECT * FROM products;