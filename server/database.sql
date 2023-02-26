CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users(
    id uuid DEFAULT uuid_generate_v4(),
    username VARCHAR(30) NOT NULL UNIQUE,
    email VARCHAR(30) NOT NULL UNIQUE,
    password TEXT NOT NULL,
    is_Admin INT DEFAULT 0,
    PRIMARY KEY (id)
);

-- Insert admin user
INSERT INTO users(
    username,
    email,
    password,
    is_Admin
) VALUES (
    'admin',
    'admin@test.com',
    -- '12345678', -- password needs to be encrypted with bcrypt
    1
)

-- | id                                   | username | email          | password                                                     | is_admin |
-- | ------------------------------------ | -------- | -------------- | ------------------------------------------------------------ | -------- |
-- | 679460b7-84f8-44be-bb1b-50d3a50c04cc | admin    | admin@test.com | $2b$12$BiiEix7cBBacXbNOkR3QReraMM0RPiMeo0ozBOrCYCE1ByFLYQRfW | 0        |
-- | 5d7f10e0-01cc-4dda-9c7a-5e667b6d0aef | test     | test@test.com  | $2b$12$vv6hJ83YzMhFp3QA/PL6oOf9A5ingl6ojE4gPXvu3xA2AiTTsiy5O | 0        |

-- Create table for vehicles
CREATE TABLE vehicles(
    veh_id uuid DEFAULT uuid_generate_v4(),
    veh_name VARCHAR(30) NOT NULL,
    capacity NUMERIC(5,2) NOT NULL,
    user_id uuid NOT NULL,
    PRIMARY KEY(veh_id),
    CONSTRAINT fk_user_id
        FOREIGN KEY(user_id)
        REFERENCES users(id)
);

-- Create table for vehicle logs
CREATE TABLE vehicle_logs(
    log_id uuid DEFAULT uuid_generate_v4(),
    veh_desc TEXT NOT NULL,
    make VARCHAR(30) NOT NULL,
    model VARCHAR(30) NOT NULL,
    year NUMERIC(4,0) NOT NULL,
    vin VARCHAR(30) NOT NULL,
    ins_pol VARCHAR(30) NOT NULL,
    veh_id uuid NOT NULL,
    PRIMARY KEY(log_id),
    CONSTRAINT fk_veh_id
        FOREIGN KEY(veh_id)
        REFERENCES vehicles(veh_id)
);


-- Insert vehicle
INSERT INTO vehicles(
    veh_name,
    capacity,
    user_id
) VALUES (
    'Toyota',
    40,
    '679460b7-84f8-44be-bb1b-50d3a50c04cc'
);

-- | veh_id                               | veh_name | capacity | user_id                              |
-- | ------------------------------------ | -------- | -------- | ------------------------------------ |
-- | c3e75ff9-b8e4-4b7b-82d5-2f80f102104b | Toyota   | 40.00    | 679460b7-84f8-44be-bb1b-50d3a50c04cc |



-- Create refuel_logs table
CREATE TABLE refuel_logs(
    refuel_id uuid DEFAULT uuid_generate_v4(),
    veh_id uuid NOT NULL,
    datetime DATE DEFAULT CURRENT_DATE,
    odometer NUMERIC(10,1) NOT NULL,
    price NUMERIC(10,2) NOT NULL,
    location VARCHAR(30) NOT NULL,
    fuel_grade VARCHAR(30) NOT NULL,
    fuel_amount NUMERIC(10,2) NOT NULL,
    is_full INT NOT NULL,
    PRIMARY KEY(refuel_id),
    CONSTRAINT fk_veh_id
        FOREIGN KEY(veh_id)
        REFERENCES vehicles(veh_id)
)
