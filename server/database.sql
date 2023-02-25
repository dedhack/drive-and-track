CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users(
    id uuid DEFAULT uuid_generate_v4(),
    username VARCHAR(30) NOT NULL,
    email VARCHAR(30) NOT NULL,
    password TEXT NOT NULL,
    is_Admin INT DEFAULT 0,
    PRIMARY KEY (id)
);

-- Create table for vehicle log
CREATE TABLE vehicle(
    veh_id uuid DEFAULT uuid_generate_v4(),
    veh_name VARCHAR(30) NOT NULL,
    capacity NUMERIC(5,2) NOT NULL,
    

)
