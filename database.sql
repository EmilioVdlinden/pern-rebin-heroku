-- Database initialisation --

CREATE DATABASE Rebin; 

CREATE TABLE customers(
  customer_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_name VARCHAR(255) NOT NULL,
  customer_removed BOOLEAN DEFAULT false
);

CREATE TABLE users(
  user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_name VARCHAR(255) NOT NULL,
  user_email VARCHAR(255) NOT NULL,
  user_password VARCHAR(255) NOT NULL,
  customer_id UUID REFERENCES customers(customer_id)
);

CREATE TABLE bins(
  bin_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  bin_latitude REAL NOT NULL,
  bin_longitude REAL NOT NULL,
  bin_adress TEXT NOT NULL, 
  bin_removed BOOLEAN DEFAULT false,
  customer_id UUID NOT NULL REFERENCES customers(customer_id),
  bin_type_id UUID NOT NULL REFERENCES bin_types(bin_type_id)
);

CREATE TABLE bin_types(
  bin_type_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  bin_type_name VARCHAR(255) NOT NULL,
  bin_type_height SMALLINT NOT NULL,
  bin_type_width SMALLINT NOT NULL,
  bin_type_length SMALLINT NOT NULL
);

CREATE TABLE sensors(
  sensor_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  sensor_credential VARCHAR(255) NOT NULL,
  sensor_battery_level SMALLINT,
  sensor_fill_level SMALLINT,
  sensor_temperature SMALLINT,
  sensor_full VARCHAR(255),
  sensor_last_seen TIMESTAMP,
  sensor_low_battery BOOLEAN NOT NULL DEFAULT false,
  bin_id UUID NOT NULL REFERENCES bins(bin_id)
);

CREATE TABLE sensor_readings(
  sensor_reading_id PRIMARY KEY DEFAULT uuid_generate_v4(),
  sensor_reading_battery_level SMALLINT NOT NULL,
  sensor_reading_fill_level SMALLINT NOT NULL,
  sensor_reading_temperature SMALLINT NOT NULL,
  sensor_reading_time_stamp TIMESTAMP NOT NULL,
  sensor_id NOT NULL REFERENCES sensors(sensor_id)
);



-- Generate customer
INSERT INTO customers(customer_name) VALUES ('Vanheede Environmental Logistics');

-- Generate bintype
INSERT INTO bin_types(bin_type_name, bin_type_height, bin_type_width, bin_type_length) VALUES ('Peukenzuil', 61, 20, 5);

-- Generate bin
INSERT INTO bins(bin_latitude, bin_longitude, bin_adress, customer_id, bin_type_id) VALUES (50.806805, 3.119332, 'WZC Andante papier', 'f5c96aaf-6c6b-4213-9822-b2bbd98adbaa', '7f9c3283-7c29-4319-ac0c-68aa3ac2ab24');

-- Generate sensor
INSERT INTO sensors(sensor_credential, bin_id) VALUES ('C564D2', 'ab7fb1dd-ffa3-4489-a31c-11870d949c81');


