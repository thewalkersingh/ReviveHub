INSERT INTO vehicle (type, model, manufacturer, manufacturing_year, price)
VALUES 
('Car', 'Model S', 'Tesla', 2022, 79999.99),
('Bike', 'Street 750', 'Harley-Davidson', 2019, 8499.00),
('Car', 'Mustang', 'Ford', 2021, 55999.99),
('Bike', 'Ninja ZX-10R', 'Kawasaki', 2020, 16999.00),
('Car', 'A8', 'Audi', 2023, 85999.99),
('Bike', 'Intercepter', 'Royal Enfield', 2020, 17500),
('Bike', 'Jawa 42', 'Jawa', 2022, 13500);

INSERT INTO vehicle_image_urls (vehicle_id, image_urls) VALUES
(1, 'https://stimg.cardekho.com/images/carexteriorimages/930x620/Tesla/Model-S/5252/1611840999494/front-left-side-47.jpg'),
(2, 'https://cdn.bikedekho.com/processedimages/harley-davidson/harley-davidson-street/source/harley-davidson-street5e784057b7e0d.jpg'),
(3, 'https://media.assettype.com/evoindia%2Fimport%2F2019%2F06%2FFord-Mustang-Shelby-GT500.jpg?w=1024&auto=format%2Ccompress&fit=max'),
(4, 'https://cdn.bikedekho.com/processedimages/kawasaki/kawasaki-ninja-zx-10r/source/kawasaki-ninja-zx-10r674007054b5f8.jpg'),
(5, 'https://stat.overdrive.in/wp-content/uploads/2021/11/2021-audi-a8-l-02-900x506.png'),
(6, 'https://drive.google.com/file/d/1bWx3wfFkkSnsRr0sVYJc92xdBCybtFfU/view?usp=drive_link'),
(7, 'https://drive.google.com/file/d/1_9KRo6wvnv9vMmzIbJhACcBYuD44eKV5/view?usp=drive_link');



INSERT INTO booking (user_id, vehicle_id, type, status) VALUES
(1, 1, 'test-drive', 'pending'),
(2, 3, 'purchase', 'pending'),
(3, 2, 'test-drive', 'completed');

INSERT INTO user (username, password, email, role) VALUES
('john_doe', 'password123', 'john.doe@example.com', 'admin'),
('jane_smith', 'password456', 'jane.smith@example.com', 'customer'),
('alice_wonder', 'password789', 'alice.wonder@example.com', 'customer'),
('tom_holland', 'password542', 'tom.holland@example.com', 'customer');


INSERT INTO Service_record (customer_id, vehicle_id, service_type, service_description, service_cost, status, created_at) VALUES
(2, 1, 'Oil Change', 'Oil change and filter replacement', 100.00, 'COMPLETED', '2023-04-08 10:00:00'),
(3, 2, 'Brake Inspection', 'Brake inspection and replacement of brake pads', 150.00, 'PENDING', '2023-04-09 11:00:00'),
(2, 3, 'Battery Check', 'Battery check and replacement', 120.00, 'COMPLETED', '2023-04-10 09:30:00');

INSERT INTO Payment (customer_id, vehicle_id, amount, payment_method, status, created_at) VALUES
(2, 1, 100.00, 'Credit Card', 'COMPLETED', '2023-04-08 10:00:00'),
(3, 2, 150.00, 'Cash', 'PENDING', '2023-04-09 11:00:00'),
(2, 3, 200.00, 'EMI', 'FAILED', '2023-04-10 09:30:00');

CREATE TABLE vehicle_image_urls (
    vehicle_id BIGINT NOT NULL,
    image_urls VARCHAR(255),
    FOREIGN KEY (vehicle_id) REFERENCES vehicle(id) ON DELETE CASCADE
);