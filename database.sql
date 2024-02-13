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
INSERT INTO customers(customer_name) VALUES ('Ateljee vzw');

-- Generate bintype
INSERT INTO bin_types(bin_type_name, bin_type_height, bin_type_width, bin_type_length) VALUES ('kledingcontainer', 1920, 1200, 1000);

-- Generate bin
INSERT INTO bins(bin_latitude, bin_longitude, bin_adress, customer_id, bin_type_id) VALUES (51.0712, 3.71477, 'Ateljee vzw depot', '96a29102-7785-416e-a865-f1e6169df313', 'a6fb2dd0-c66b-441b-9fd0-13751fc3404b');

-- Generate user
INSERT INTO users(user_name, user_email, user_password, customer_id) VALUES ('Nathalie', 'nathalie.deschampheleire@ateljeevzw.be', '$2b$10$9YOvHWPjVnxjRrISH5r5D.OcT8DRwB.vBADqHVUHPARhkSs7.9UsG', '96a29102-7785-416e-a865-f1e6169df313');

-- Generate sensor
INSERT INTO sensors(sensor_credential, bin_id) VALUES ('C3A3E9', 'da528553-e413-4967-91b7-3bdfc6db51af');


