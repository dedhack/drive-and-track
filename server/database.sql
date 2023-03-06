CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users(
    id uuid DEFAULT uuid_generate_v4(),
    username VARCHAR(30) NOT NULL UNIQUE,
    email VARCHAR(30) NOT NULL UNIQUE,
    password TEXT NOT NULL,
    is_Admin BOOLEAN DEFAULT FALSE,
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
    'TRUE',
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
    datetime TIMESTAMP DEFAULT CURRENT_DATE,
    odometer NUMERIC(10,1) NOT NULL,
    price NUMERIC(10,2) NOT NULL,
    location VARCHAR(30) NOT NULL,
    fuel_grade VARCHAR(30) NOT NULL,
    fuel_amount NUMERIC(10,2) NOT NULL,
    is_full BOOLEAN NOT NULL,
    PRIMARY KEY(refuel_id),
    CONSTRAINT fk_veh_id
        FOREIGN KEY(veh_id)
        REFERENCES vehicles(veh_id)
);

CREATE TABLE service_type(
    type_id SERIAL PRIMARY KEY,
    type_name VARCHAR(30) UNIQUE NOT NULL
);


CREATE TABLE service_logs(
    service_id uuid DEFAULT uuid_generate_v4(),
    veh_id uuid NOT NULL REFERENCES vehicles(veh_id),
    datetime TIMESTAMP DEFAULT CURRENT_DATE,
    odometer NUMERIC(10,1) NOT NULL,
    price NUMERIC(10,2) NOT NULL,
    location VARCHAR(30) NOT NULL,
    service_type INT NOT NULL REFERENCES service_type(type_id),
    service_desc TEXT NOT NULL,
    PRIMARY KEY(service_id)
    -- TODO: Later need to edit this
    -- CONSTRAINT fk_veh_id, service_type
    --     FOREIGN KEY(veh_id, service_type)
    --     REFERENCES vehicles(veh_id), service_type(type_name)
);

-- Insert service type
INSERT INTO service_type(
    type_name
) VALUES (
    'Air filter'
), (
    'Air conditioning'
), (
    'Battery'
), (
    'Belting'
), (
    'BodyChassis'
), (
    'Brake Fluid'
), (
    'Brake Pad'
), (
    'Brakes replacement'
), (
    'Cabin Air Filter'
), (
    'Chain and Sprocket'
), (
    'Clutch Fluid'
), (
    'Clutch System'
), (
    'Cooling System'
), (
    'Engine Repair'
), (
    'Exhaust System'
), (
    'Fuel Filter'
), (
    'Fuel Pump'
), (
    'Gear Oil'
), (
    'Glass/Mirrors'
), (
    'Heating System'
), (
    'Horn'
), (
    'Inspection'
), (
    'Labor Cost'
), (
    'Lights'
), (
    'New Tires'
), (
    'Oil Change'
), (
    'Oil Filter'
), (
    'Radiator'
), (
    'Rollers'
), (
    'Rotate Tires'
), (
    'Seat Belt'
), (
    'Spark Plugs'
), (
    'Steering System'
), (
    'Suspension System'
), (
    'Technical Control'
), (
    'Tire Pressure'
), (
    'Transmission Fluid'
), (
    'Wheel Alignment'
), (
    'Windshield Wipers'
), (
    'Others'
);


Labour Cost
Lights
New Tires
Oil Change
Oil Filter
Radiator
Rollers
Rotate Tires
Seat Belt
Spark Plugs
Steering System
Suspension System
Technical Control
Tire Pressure
Transmission Fluid
Wheel Alignment
Windshield Wipers
Others

| type_id | type_name          |
| ------- | ------------------ |
| 1       | Air filter         |
| 2       | Air conditioning   |
| 3       | Battery            |
| 4       | Belting            |
| 5       | BodyChassis        |
| 6       | Brake Fluid        |
| 7       | Brake Pad          |
| 8       | Brakes replacement |
| 9       | Cabin Air Filter   |
| 10      | Chain and Sprocket |
| 11      | Clutch Fluid       |
| 12      | Clutch System      |
| 13      | Cooling System     |
| 14      | Engine Repair      |
| 15      | Exhaust System     |
| 16      | Fuel Filter        |
| 17      | Fuel Pump          |
| 18      | Gear Oil           |
| 19      | Glass/Mirrors      |
| 20      | Heating System     |
| 21      | Horn               |
| 22      | Inspection         |
| 23      | Labor Cost         |
| 24      | Lights             |
| 25      | New Tires          |
| 26      | Oil Change         |
| 27      | Oil Filter         |
| 28      | Radiator           |
| 29      | Rollers            |
| 30      | Rotate Tires       |
| 31      | Seat Belt          |
| 32      | Spark Plugs        |
| 33      | Steering System    |
| 34      | Suspension System  |
| 35      | Technical Control  |
| 36      | Tire Pressure      |
| 37      | Transmission Fluid |
| 38      | Wheel Alignment    |
| 39      | Windshield Wipers  |
| 40      | Others             |