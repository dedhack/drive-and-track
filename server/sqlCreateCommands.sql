CREATE TABLE users (
  id uuid DEFAULT uuid_generate_v4(),
  username VARCHAR(30) NOT NULL UNIQUE,
  email VARCHAR(30) NOT NULL UNIQUE,
  password TEXT NOT NULL,
  is_admin BOOLEAN DEFAULT FALSE,
  PRIMARY KEY (id)
);

CREATE TABLE vehicles (
  veh_id uuid DEFAULT uuid_generate_v4(),
  veh_name VARCHAR(30) NOT NULL,
  capacity NUMERIC(5,2) NOT NULL,
  user_id uuid NOT NULL,
  PRIMARY KEY(veh_id),
  CONSTRAINT fk_user_id
    FOREIGN KEY(user_id)
    REFERENCES users(id)
    ON DELETE CASCADE
);

CREATE TABLE vehicle_logs (
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
    ON DELETE CASCADE
);

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
        ON DELETE CASCADE
);


CREATE TABLE service_type (
  type_id SERIAL PRIMARY KEY,
  type_name VARCHAR(30) UNIQUE NOT NULL
);

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


CREATE TABLE service_logs (
  service_id uuid DEFAULT uuid_generate_v4(),
  veh_id uuid NOT NULL,
  datetime DATE DEFAULT CURRENT_DATE,
  odometer NUMERIC(10,1) NOT NULL,
  price NUMERIC(10,2) NOT NULL,
  location VARCHAR(30) NOT NULL,
  service_type INT NOT NULL,
  service_desc TEXT NOT NULL,
  PRIMARY KEY(service_id),
  CONSTRAINT fk_veh_id
    FOREIGN KEY(veh_id)
    REFERENCES vehicles(veh_id)
    ON DELETE CASCADE,
  CONSTRAINT fk_service_type
    FOREIGN KEY(service_type)
    REFERENCES service_type(type_id)
    ON DELETE CASCADE
);


--FIXME:
-- modifications done to these tables to allow for cascading
-- will need to edit the original sql commands
-- ALTER TABLE vehicle_logs
-- DROP CONSTRAINT fk_veh_id,
-- ADD CONSTRAINT fk_veh_id
--     FOREIGN KEY(veh_id)
--     REFERENCES vehicles(veh_id)
--     ON DELETE CASCADE;


-- ALTER TABLE vehicles
-- DROP CONSTRAINT fk_user_id,
-- ADD CONSTRAINT fk_user_id
--     FOREIGN KEY(user_id)
--     REFERENCES users(id)
--     ON DELETE CASCADE;
