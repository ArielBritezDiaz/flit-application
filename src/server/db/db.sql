-- /* Creation DB */
-- CREATE DATABASE flit_db;

-- /* Select DB */
-- USE flit_db;

-- /* Creation tables */
-- CREATE TABLE User(
--     id_user INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
--     name VARCHAR(20) NOT NULL,
--     email VARCHAR(100) NOT NULL,
--     passw VARCHAR(255) NOT NULL,
--     profile_picture VARCHAR(255) NOT NULL
-- );

-- CREATE TABLE Category(
--     id_category INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
--     name VARCHAR(20) NOT NULL,
--     icon VARCHAR(255)
-- );

-- CREATE TABLE MoneyRegistry(
--     id_moneyregistry INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
--     total_amount DECIMAL(19, 4) NOT NULL,
--     entered_amount DECIMAL(19, 4) NOT NULL,
--     gain_expense VARCHAR(255) NOT NULL,
--     note VARCHAR(50),
--     id_user INT,
--     id_category INT,
--     date DATETIME NOT NULL,
--     FOREIGN KEY (id_user) REFERENCES User(id_user),
--     FOREIGN KEY (id_category) REFERENCES Category(id_category)
-- );

-- ALTER TABLE MoneyRegistry
-- ADD CONSTRAINT fk_category
-- FOREIGN KEY (id_category) REFERENCES TemporalCategory(id_temporalcategory);


-- CREATE TABLE TemporalCategory(
--     id_temporalcategory INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
--     image VARCHAR(255) NOT NULL,
--     hexColor VARCHAR(255) NOT NULL,
--     styles_icon VARCHAR(255) NOT NULL,
--     nameCategory VARCHAR(255) NOT NULL
-- )

-- /* Insert data */
-- INSERT INTO TemporalCategory(image, hexColor, styles_icon, nameCategory) VALUES
--     ('{"key":null,"ref":null,"props":{},"_owner":null,"_store":{}}', '#C10B0B', '{"elevation":30,"padding":10,"borderRadius":50}', 'Salud'),
--     ('{"key":null,"ref":null,"props":{},"_owner":null,"_store":{}}', '#23BC12', '{"elevation":30,"padding":10,"borderRadius":50}', 'Hogar'),
--     ('{"key":null,"ref":null,"props":{},"_owner":null,"_store":{}}', '#083ea7', '{"elevation":30,"padding":10,"borderRadius":50}', 'Familia'),
--     ('{"key":null,"ref":null,"props":{},"_owner":null,"_store":{}}', '#621BBA', '{"elevation":30,"padding":10,"borderRadius":50}', 'Educación'),
--     ('{"key":null,"ref":null,"props":{},"_owner":null,"_store":{}}', '#C76204', '{"elevation":30,"padding":10,"borderRadius":50}', 'Comida'),
--     ('{"key":null,"ref":null,"props":{},"_owner":null,"_store":{}}', '#A504B3', '{"elevation":30,"padding":10,"borderRadius":50}', 'Compras'),
--     ('{"key":null,"ref":null,"props":{},"_owner":null,"_store":{}}', '#C7B204', '{"elevation":30,"padding":10,"borderRadius":50}', 'Transporte'),
--     ('{"key":null,"ref":null,"props":{},"_owner":null,"_store":{}}', '#2C3335', '{"elevation":30,"padding":10,"borderRadius":50}', 'Gimansio'),
--     ('{"key":null,"ref":null,"props":{},"_owner":null,"_store":{}}', '#C7046D', '{"elevation":30,"padding":10,"borderRadius":50}', 'Regalos'),
--     ('{"key":null,"ref":null,"props":{},"_owner":null,"_store":{}}', '#36A507', '{"elevation":30,"padding":10,"borderRadius":50}', 'Ocio'),
--     ('{"key":null,"ref":null,"props":{},"_owner":null,"_store":{}}', '#0780A4', '{"elevation":30,"padding":10,"borderRadius":50}', 'Servicios'),
--     ('{"key":null,"ref":null,"props":{},"_owner":null,"_store":{}}', '#D9D50A', '{"elevation":30,"padding":10,"borderRadius":50}', 'Viajes');

-- INSERT INTO User(name, email, passw, profile_picture) VALUES(
--     "Ariel", "arielbrtz@gmail.com", "1234", "abcd"
-- );


-- -- 
-- /* Creation DB */
-- CREATE DATABASE flit_db;

-- /* Select DB */
-- USE flit_db;

-- /* Creation tables */
-- CREATE TABLE User(
--     id_user INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
--     name VARCHAR(20) NOT NULL,
--     email VARCHAR(100) NOT NULL,
--     passw VARCHAR(255) NOT NULL,
--     profile_picture VARCHAR(255) NOT NULL
-- );

-- CREATE TABLE MoneyRegistry(
--     id_moneyregistry INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
--     total_amount DECIMAL(19, 4) NOT NULL,
--     entered_amount DECIMAL(19, 4) NOT NULL,
--     gain_expense VARCHAR(255) NOT NULL,
--     note VARCHAR(50),
--     id_user INT,
--     id_category INT,
--     date DATETIME NOT NULL,
--     FOREIGN KEY (id_user) REFERENCES User(id_user),
--     FOREIGN KEY (id_category) REFERENCES Category(id_category)
-- );

-- CREATE TABLE Category(
--     id_category INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
--     image VARCHAR(255) NOT NULL,
--     hexColor VARCHAR(255) NOT NULL,
--     styles_icon VARCHAR(255) NOT NULL,
--     nameCategory VARCHAR(255) NOT NULL
-- );

-- /* Insert data */
-- INSERT INTO Category(svg, hexColor, styles_icon, nameCategory) VALUES
-- ('{"key":null,"ref":null,"props":{},"_owner":null,"_store":{}}', '#C10B0B', '{"elevation":30,"padding":10,"borderRadius":50}', 'Salud'),
-- ('{"key":null,"ref":null,"props":{},"_owner":null,"_store":{}}', '#23BC12', '{"elevation":30,"padding":10,"borderRadius":50}', 'Hogar'),
-- ('{"key":null,"ref":null,"props":{},"_owner":null,"_store":{}}', '#083ea7', '{"elevation":30,"padding":10,"borderRadius":50}', 'Familia'),
-- ('{"key":null,"ref":null,"props":{},"_owner":null,"_store":{}}', '#621BBA', '{"elevation":30,"padding":10,"borderRadius":50}', 'Educación'),
-- ('{"key":null,"ref":null,"props":{},"_owner":null,"_store":{}}', '#C76204', '{"elevation":30,"padding":10,"borderRadius":50}', 'Comida'),
-- ('{"key":null,"ref":null,"props":{},"_owner":null,"_store":{}}', '#A504B3', '{"elevation":30,"padding":10,"borderRadius":50}', 'Compras'),
-- ('{"key":null,"ref":null,"props":{},"_owner":null,"_store":{}}', '#C7B204', '{"elevation":30,"padding":10,"borderRadius":50}', 'Transporte'),
-- ('{"key":null,"ref":null,"props":{},"_owner":null,"_store":{}}', '#2C3335', '{"elevation":30,"padding":10,"borderRadius":50}', 'Gimansio'),
-- ('{"key":null,"ref":null,"props":{},"_owner":null,"_store":{}}', '#C7046D', '{"elevation":30,"padding":10,"borderRadius":50}', 'Regalos'),
-- ('{"key":null,"ref":null,"props":{},"_owner":null,"_store":{}}', '#36A507', '{"elevation":30,"padding":10,"borderRadius":50}', 'Ocio'),
-- ('{"key":null,"ref":null,"props":{},"_owner":null,"_store":{}}', '#0780A4', '{"elevation":30,"padding":10,"borderRadius":50}', 'Servicios'),
-- ('{"key":null,"ref":null,"props":{},"_owner":null,"_store":{}}', '#D9D50A', '{"elevation":30,"padding":10,"borderRadius":50}', 'Viajes');

-- INSERT INTO User(name, email, passw, profile_picture) VALUES(
--     "Ariel", "arielbrtz@gmail.com", "1234", "abcd"
-- );




-- 
/* Creation DB */
CREATE DATABASE flit_db;

/* Select DB */
USE flit_db;

/* Creation tables */
CREATE TABLE User(
    id_user INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user VARCHAR(20) NOT NULL,
    email VARCHAR(100) NOT NULL,
    passw VARCHAR(255) NOT NULL,
    token VARCHAR(255) NOT NULL,
    isValidToken BOOLEAN NOT NULL
);

CREATE TABLE MoneyRegistry(
    id_moneyregistry INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    total_amount DECIMAL(19, 4) NOT NULL,
    entered_amount DECIMAL(19, 4) NOT NULL,
    gain_expense VARCHAR(255) NOT NULL,
    note VARCHAR(50),
    id_user INT,
    id_category INT,
    date DATETIME NOT NULL,
    FOREIGN KEY (id_user) REFERENCES User(id_user),
    FOREIGN KEY (id_category) REFERENCES Category(id_category)
);

CREATE TABLE Category(
    id_category INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    svg MEDIUMTEXT NOT NULL,
    hexColor VARCHAR(255) NOT NULL,
    styles_icon VARCHAR(255) NOT NULL,
    nameCategory VARCHAR(255) NOT NULL
);

/* Insert data */
INSERT INTO Category(svg, hexColor, styles_icon, nameCategory) VALUES
('<?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
<svg width="50px" height="50px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M18.5 9.00002H16.5M16.5 9.00002L14.5 9.00002M16.5 9.00002L16.5 7M16.5 9.00002L16.5 11" stroke="#f5f5fa" stroke-width="1.5" stroke-linecap="round"/>
<path d="M8.96173 19.3786L9.43432 18.7963L8.96173 19.3786ZM12 5.57412L11.4522 6.08635C11.594 6.23803 11.7923 6.32412 12 6.32412C12.2077 6.32412 12.406 6.23803 12.5478 6.08635L12 5.57412ZM15.0383 19.3787L15.5109 19.961L15.0383 19.3787ZM12 21L12 20.25L12 21ZM2.65159 13.6821C2.86595 14.0366 3.32705 14.1501 3.68148 13.9358C4.03591 13.7214 4.14946 13.2603 3.9351 12.9059L2.65159 13.6821ZM6.53733 16.1707C6.24836 15.8739 5.77352 15.8676 5.47676 16.1566C5.18 16.4455 5.17369 16.9204 5.46267 17.2171L6.53733 16.1707ZM2.75 9.3175C2.75 6.41289 4.01766 4.61731 5.58602 4.00319C7.15092 3.39043 9.34039 3.82778 11.4522 6.08635L12.5478 5.06189C10.1598 2.50784 7.34924 1.70187 5.0391 2.60645C2.73242 3.50967 1.25 5.99209 1.25 9.3175H2.75ZM15.5109 19.961C17.0033 18.7499 18.7914 17.1268 20.2127 15.314C21.6196 13.5196 22.75 11.4354 22.75 9.31747H21.25C21.25 10.9289 20.3707 12.6814 19.0323 14.3884C17.7084 16.077 16.0156 17.6197 14.5657 18.7963L15.5109 19.961ZM22.75 9.31747C22.75 5.99208 21.2676 3.50966 18.9609 2.60645C16.6508 1.70187 13.8402 2.50784 11.4522 5.06189L12.5478 6.08635C14.6596 3.82778 16.8491 3.39042 18.414 4.00319C19.9823 4.6173 21.25 6.41287 21.25 9.31747H22.75ZM8.48914 19.961C9.76058 20.9928 10.6423 21.75 12 21.75L12 20.25C11.2771 20.25 10.8269 19.9263 9.43432 18.7963L8.48914 19.961ZM14.5657 18.7963C13.1731 19.9263 12.7229 20.25 12 20.25L12 21.75C13.3577 21.75 14.2394 20.9928 15.5109 19.961L14.5657 18.7963ZM3.9351 12.9059C3.18811 11.6708 2.75 10.455 2.75 9.3175H1.25C1.25 10.8297 1.82646 12.3179 2.65159 13.6821L3.9351 12.9059ZM9.43432 18.7963C8.51731 18.0521 7.49893 17.1582 6.53733 16.1707L5.46267 17.2171C6.47548 18.2572 7.53996 19.1908 8.48914 19.961L9.43432 18.7963Z" fill="#f5f5fa"/>
</svg>', '#C10B0B', '{"elevation":30,"padding":10,"borderRadius":50}', 'Salud'),
('<?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
<svg width="50px" height="50px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M22 22L2 22" stroke="#f5f5fa" stroke-width="1.5" stroke-linecap="round"/>
<path d="M2 11L6.06296 7.74968M22 11L13.8741 4.49931C12.7784 3.62279 11.2216 3.62279 10.1259 4.49931L9.34398 5.12486" stroke="#f5f5fa" stroke-width="1.5" stroke-linecap="round"/>
<path d="M15.5 5.5V3.5C15.5 3.22386 15.7239 3 16 3H18.5C18.7761 3 19 3.22386 19 3.5V8.5" stroke="#f5f5fa" stroke-width="1.5" stroke-linecap="round"/>
<path d="M4 22V9.5" stroke="#f5f5fa" stroke-width="1.5" stroke-linecap="round"/>
<path d="M20 9.5V13.5M20 22V17.5" stroke="#f5f5fa" stroke-width="1.5" stroke-linecap="round"/>
<path d="M15 22V17C15 15.5858 15 14.8787 14.5607 14.4393C14.1213 14 13.4142 14 12 14C10.5858 14 9.87868 14 9.43934 14.4393M9 22V17" stroke="#f5f5fa" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M14 9.5C14 10.6046 13.1046 11.5 12 11.5C10.8954 11.5 10 10.6046 10 9.5C10 8.39543 10.8954 7.5 12 7.5C13.1046 7.5 14 8.39543 14 9.5Z" stroke="#f5f5fa" stroke-width="1.5"/>
</svg>', '#23BC12', '{"elevation":30,"padding":10,"borderRadius":50}', 'Hogar'),
('<?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
<svg fill="#f5f5fa" width="50px" height="50px" viewBox="0 0 32 32" id="icon" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <style>
      .cls-1 {
        fill: none;
      }
    </style>
  </defs>
  <path d="M20,30H17a2.0021,2.0021,0,0,1-2-2V23h2v5h3V23h2V19a1.0011,1.0011,0,0,0-1-1H12.2793l-2-6H4a1.0011,1.0011,0,0,0-1,1v6H5v9H9V21h2v7a2.0021,2.0021,0,0,1-2,2H5a2.0021,2.0021,0,0,1-2-2V21a2.0021,2.0021,0,0,1-2-2V13a3.0033,3.0033,0,0,1,3-3h6.2793a1.998,1.998,0,0,1,1.8975,1.3674L13.7207,16H21a3.0033,3.0033,0,0,1,3,3v4a2.0021,2.0021,0,0,1-2,2v3A2.0021,2.0021,0,0,1,20,30Z"/>
  <path d="M28,30H26V19h3V13a1.0011,1.0011,0,0,0-1-1H24V10h4a3.0033,3.0033,0,0,1,3,3v6a2.0021,2.0021,0,0,1-2,2H28Z"/>
  <path d="M7,9a4,4,0,1,1,4-4A4.0045,4.0045,0,0,1,7,9ZM7,3A2,2,0,1,0,9,5,2.0021,2.0021,0,0,0,7,3Z"/>
  <path d="M25,9a4,4,0,1,1,4-4A4.0045,4.0045,0,0,1,25,9Zm0-6a2,2,0,1,0,2,2A2.0021,2.0021,0,0,0,25,3Z"/>
  <path d="M18.5,15A3.5,3.5,0,1,1,22,11.5,3.5041,3.5041,0,0,1,18.5,15Zm0-5A1.5,1.5,0,1,0,20,11.5,1.5017,1.5017,0,0,0,18.5,10Z"/>
  <rect id="_Transparent_Rectangle_" data-name="&lt;Transparent Rectangle&gt;" class="cls-1" width="32" height="32"/>
</svg>', '#083ea7', '{"elevation":30,"padding":10,"borderRadius":50}', 'Familia'),
('<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">

<!-- Uploaded to: SVG Repo, www.svgrepo.com, Transformed by: SVG Repo Mixer Tools -->
<svg width="50px" height="50px" viewBox="0 0 800 800" enable-background="new 0 0 800 800" id="GUIDE" version="1.1" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:cc="http://creativecommons.org/ns#" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd" xmlns:svg="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#f5f5fa" stroke="#f5f5fa">

<g id="SVGRepo_bgCarrier" stroke-width="0"/>

<g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>

<g id="SVGRepo_iconCarrier"> <g> <path d="M573.209,268.504l6.092,2.619c2.576,1.108,5.254,1.631,7.891,1.631c7.75,0,15.127-4.533,18.383-12.104 c4.363-10.147-0.326-21.911-10.473-26.273l-6.092-2.62c-10.148-4.363-21.91,0.326-26.273,10.473 C558.373,252.378,563.063,264.141,573.209,268.504z"/> <path d="M748.934,428.852V313.685c0-11.046-8.953-20-20-20H386.189c-11.046,0-20,8.954-20,20s8.954,20,20,20h245.586 L386.189,439.268L94.083,313.685l292.106-125.583l131.116,56.369c10.148,4.362,21.91-0.327,26.273-10.475 c4.361-10.147-0.328-21.911-10.475-26.273l-139.015-59.766c-5.043-2.168-10.756-2.168-15.799,0L35.545,295.311 c-7.342,3.157-12.101,10.382-12.101,18.374s4.759,15.218,12.101,18.374L378.29,479.411c2.521,1.084,5.211,1.626,7.899,1.626 s5.378-0.542,7.899-1.626l188.64-81.101l0.004,138.395c-110.08,101.846-283.009,101.846-393.086-0.001l0.001-35.302 c0-11.046-8.954-20.001-20-20.001l0,0c-11.045,0-20,8.955-20,19.999l-0.001,43.873c0,5.373,2.163,10.521,6.001,14.283 c61.922,60.689,143.796,94.112,230.541,94.112c86.746,0,168.621-33.423,230.542-94.11c3.838-3.762,6.002-8.91,6.002-14.285 l-0.004-164.159l86.205-37.062v84.799c-16.293,7.572-27.623,24.086-27.623,43.204c0,19.62,14.643,71.239,47.623,71.239 c32.979,0,47.621-51.619,47.621-71.239C776.555,452.938,765.227,436.425,748.934,428.852z M728.934,497.887 c-3.885-7.633-7.623-19.427-7.623-25.831c0-4.203,3.42-7.623,7.623-7.623s7.621,3.42,7.621,7.623 C736.555,478.46,732.816,490.254,728.934,497.887z"/> <path d="M169.648,460.571c11.046,0,20-8.954,20-20v-6.655c0-11.046-8.954-20-20-20s-20,8.954-20,20v6.655 C149.648,451.617,158.602,460.571,169.648,460.571z"/> </g> </g>

</svg>', '#621BBA', '{"elevation":30,"padding":10,"borderRadius":50}', 'Educación'),
('<?xml version="1.0" encoding="utf-8"?>

<!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
<svg fill="#f5f5fa" width="50px" height="50px" viewBox="0 -0.5 122.88 122.88" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"  style="enable-background:new 0 0 122.88 121.87" xml:space="preserve">

<g>

<path d="M97.34,0.74c0.86-0.93,2.3-0.99,3.23-0.13c0.93,0.86,0.99,2.3,0.13,3.23L81.98,24.1l-0.03,0.04 c-2.29,2.77-3.86,5.33-4.56,7.67c-0.62,2.07-0.53,3.95,0.39,5.59c0.49,0.88,0.33,1.96-0.32,2.67l0,0l-8.89,9.62 c-0.87-0.95-1.56-1.72-2.02-2.22c-0.21-0.28-0.45-0.55-0.7-0.81l-0.02,0.02c-0.12-0.13-0.25-0.25-0.38-0.37l7.6-8.23 c-0.89-2.38-0.88-4.91-0.06-7.6c0.88-2.92,2.75-6.03,5.44-9.27c0.06-0.08,0.11-0.16,0.18-0.23L97.32,0.72L97.34,0.74L97.34,0.74z M57.13,55.01c-0.84-0.94-0.76-2.39,0.18-3.23c0.94-0.84,2.39-0.76,3.23,0.18c9.41,10.54,38.5,41.73,46.56,53.39 c10.63,15.05-5.83,19.79-11.29,14.31c-13.64-13.19-42.6-46.82-55.33-61.08c-4.58,1.94-9.03,2.24-13.5,0.96 c-4.81-1.37-9.52-4.58-14.3-9.51l-0.06-0.06c-3.64-3.84-6.49-7.63-8.55-11.38c-2.11-3.86-3.4-7.68-3.86-11.47 c-0.49-4.08-0.11-7.88,0.99-11.25c1.29-3.96,3.58-7.31,6.58-9.8c3.02-2.5,6.73-4.12,10.87-4.62c3.44-0.41,7.19-0.06,11.07,1.21 c5.37,1.75,11.63,6.1,16.82,11.68c3.83,4.11,7.11,8.92,9.06,13.87c2.03,5.16,2.65,10.5,1.02,15.5c-0.96,2.96-2.7,5.74-5.4,8.25 c-0.93,0.86-2.37,0.8-3.23-0.12c-0.86-0.93-0.8-2.37,0.12-3.23c2.09-1.95,3.43-4.08,4.16-6.33c1.26-3.87,0.73-8.16-0.93-12.38 c-1.74-4.42-4.69-8.74-8.15-12.45c-4.68-5.02-10.23-8.91-14.91-10.44c-3.21-1.04-6.28-1.34-9.09-1c-3.26,0.4-6.18,1.65-8.51,3.6 c-2.34,1.95-4.13,4.58-5.16,7.71c-0.89,2.73-1.2,5.87-0.79,9.26c0.39,3.2,1.5,6.47,3.32,9.81c1.91,3.43,4.53,6.9,7.9,10.45 l0.02,0.03c4.22,4.35,8.27,7.15,12.28,8.29c3.79,1.08,7.65,0.66,11.68-1.35c0.92-0.53,2.11-0.35,2.84,0.47 c12.42,13.91,42.63,48.92,56.01,61.89c5.81,2.37,9.03-0.55,6.25-5.7C100.7,102.43,63.5,62.17,57.13,55.01L57.13,55.01L57.13,55.01z M45.07,75.12l-29.16,31.55c-0.06,0.06-0.11,0.12-0.18,0.18c-4.26,4.6,3.28,11.3,7.96,6.82l28.32-30.65l3.04,3.45l-28.1,30.41l0,0 c-0.06,0.07-0.12,0.13-0.2,0.2c-1.68,1.41-3.37,2.33-5.08,2.71c-1.76,0.4-3.49,0.22-5.15-0.56c-0.28-0.11-0.54-0.25-0.77-0.46 l-4.03-3.73l0,0c-0.06-0.06-0.12-0.11-0.18-0.18c-1.56-1.8-2.3-3.72-2.1-5.75c0.19-1.92,1.21-3.79,3.14-5.59l29.44-31.86 L45.07,75.12L45.07,75.12z M75.63,57.46l1.73-1.87c0.86-0.93,2.31-0.99,3.23-0.13s0.99,2.3,0.13,3.23l-2,2.16L75.63,57.46 L75.63,57.46z M104.45,7.43c0.86-0.93,2.3-0.99,3.23-0.13c0.93,0.86,0.99,2.3,0.13,3.23L91.4,28.3c-0.86,0.93-2.3,0.99-3.23,0.13 c-0.93-0.86-0.99-2.3-0.13-3.23L104.45,7.43L104.45,7.43L104.45,7.43z M111.55,14c0.86-0.93,2.3-0.99,3.23-0.13 c0.93,0.86,0.99,2.3,0.13,3.23L98.51,34.86c-0.86,0.93-2.3,0.99-3.23,0.13c-0.93-0.86-0.99-2.3-0.13-3.23L111.55,14L111.55,14 L111.55,14z M118.91,20.83c0.86-0.93,2.3-0.99,3.23-0.13c0.93,0.86,0.99,2.31,0.13,3.23L103.55,44.2c-0.07,0.07-0.14,0.13-0.21,0.2 c-4.26,4.1-8.33,6.47-12.22,7.14c-4.22,0.73-8.09-0.47-11.64-3.57c-0.95-0.83-1.04-2.28-0.22-3.22c0.83-0.95,2.28-1.04,3.22-0.22 c2.45,2.14,5.07,2.98,7.84,2.49c2.98-0.51,6.26-2.48,9.84-5.93l0.02-0.02l18.71-20.25L118.91,20.83L118.91,20.83z"/>

</g>

</svg>', '#C76204', '{"elevation":30,"padding":10,"borderRadius":50}', 'Comida'),
('<?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
<svg width="50px" height="50px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2 2H3.30616C3.55218 2 3.67519 2 3.77418 2.04524C3.86142 2.08511 3.93535 2.14922 3.98715 2.22995C4.04593 2.32154 4.06333 2.44332 4.09812 2.68686L4.57143 6M4.57143 6L5.62332 13.7314C5.75681 14.7125 5.82355 15.2031 6.0581 15.5723C6.26478 15.8977 6.56108 16.1564 6.91135 16.3174C7.30886 16.5 7.80394 16.5 8.79411 16.5H17.352C18.2945 16.5 18.7658 16.5 19.151 16.3304C19.4905 16.1809 19.7818 15.9398 19.9923 15.6342C20.2309 15.2876 20.3191 14.8247 20.4955 13.8988L21.8191 6.94969C21.8812 6.62381 21.9122 6.46087 21.8672 6.3335C21.8278 6.22177 21.7499 6.12768 21.6475 6.06802C21.5308 6 21.365 6 21.0332 6H4.57143ZM10 21C10 21.5523 9.55228 22 9 22C8.44772 22 8 21.5523 8 21C8 20.4477 8.44772 20 9 20C9.55228 20 10 20.4477 10 21ZM18 21C18 21.5523 17.5523 22 17 22C16.4477 22 16 21.5523 16 21C16 20.4477 16.4477 20 17 20C17.5523 20 18 20.4477 18 21Z" stroke="#f5f5fa" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>', '#A504B3', '{"elevation":30,"padding":10,"borderRadius":50}', 'Compras'),
('<?xml version="1.0" encoding="iso-8859-1"?>
<!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
<svg fill="#f5f5fa" height="50px" width="50px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
	 viewBox="0 0 502 502" xml:space="preserve">
<g>
	<g>
		<g>
			<path d="M366.475,40.357h-230.22c-5.523,0-10,4.477-10,10v35.972c0,5.523,4.477,10,10,10h230.22c5.522,0,10-4.477,10-10V50.357
				C376.475,44.834,371.997,40.357,366.475,40.357z M356.475,76.329h-210.22V60.357h210.22V76.329z"/>
			<path d="M89.492,165.874h143.887c5.523,0,10-4.477,10-10s-4.477-10-10-10H89.492c-5.523,0-10,4.477-10,10
				S83.969,165.874,89.492,165.874z"/>
			<path d="M274.146,165.874h17.986c5.522,0,10-4.477,10-10s-4.478-10-10-10h-17.986c-5.522,0-10,4.477-10,10
				S268.624,165.874,274.146,165.874z"/>
			<path d="M117.945,386.881c17.42,0,31.593-14.172,31.593-31.592c0-17.42-14.172-31.593-31.593-31.593
				s-31.593,14.172-31.593,31.593C86.352,372.709,100.524,386.881,117.945,386.881z M117.945,343.696
				c6.392,0,11.593,5.201,11.593,11.593c0,6.392-5.201,11.592-11.593,11.592c-6.392,0-11.593-5.2-11.593-11.592
				C106.352,348.897,111.553,343.696,117.945,343.696z"/>
			<path d="M384.055,386.881c17.42,0,31.593-14.172,31.593-31.592c0-17.42-14.173-31.593-31.593-31.593
				s-31.592,14.172-31.592,31.593C352.463,372.709,366.635,386.881,384.055,386.881z M384.055,343.696
				c6.393,0,11.593,5.201,11.593,11.593c0,6.392-5.2,11.592-11.593,11.592c-6.392,0-11.592-5.2-11.592-11.592
				C372.463,348.897,377.663,343.696,384.055,343.696z"/>
			<path d="M492,187.135h-30.393V58.326c0-27.533-22.399-49.933-49.933-49.933H90.326c-27.533,0-49.933,22.4-49.933,49.933v128.809
				H10c-5.523,0-10,4.477-10,10v90.375c0,5.523,4.477,10,10,10h30.393v123.355c0,5.523,4.477,10,10,10h7.751v29.361
				c0,18.407,14.975,33.381,33.382,33.381h5.995c18.407,0,33.382-14.975,33.382-33.381v-29.361h240.195v29.361
				c0,18.407,14.975,33.381,33.382,33.381h5.995c18.407,0,33.382-14.975,33.382-33.381v-29.361h7.751c5.522,0,10-4.477,10-10V297.51
				H492c5.522,0,10-4.477,10-10v-90.375C502,191.612,497.522,187.135,492,187.135z M40.167,277.51H20v-70.375h20.167V277.51z
				 M110.902,460.227c0,7.378-6.003,13.381-13.382,13.381h-5.995c-7.379,0-13.382-6.003-13.382-13.381v-29.361h32.759
				C110.902,430.866,110.902,460.227,110.902,460.227z M423.856,460.227c0,7.378-6.003,13.381-13.382,13.381h-5.995
				c-7.379,0-13.382-6.003-13.382-13.381v-29.361h32.759V460.227z M441.608,410.866H60.393V297.771h381.215V410.866z
				 M441.608,277.771h-0.001h-44.019c-0.53-0.284-1.088-0.531-1.681-0.721l-127.099-40.769c-5.261-1.688-10.891,1.209-12.577,6.468
				c-1.686,5.259,1.209,10.89,6.468,12.576l69.977,22.445H230.919l-128.781-41.489c-5.261-1.688-10.89,1.208-12.576,6.468
				c-1.687,5.259,1.209,10.89,6.468,12.576l69.977,22.445H60.393V128.703h381.215V277.771z M441.608,108.703H60.393V58.326
				c0-16.505,13.428-29.933,29.933-29.933h321.349c16.505,0,29.933,13.428,29.933,29.933V108.703z M482,277.51h-20.167v-70.375H482
				V277.51z"/>
		</g>
	</g>
</g>
</svg>', '#C7B204', '{"elevation":30,"padding":10,"borderRadius":50}', 'Transporte'),
('<?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
<svg width="50px" height="50px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.31885 12.1982L12.1989 8.31823M15.3029 11.4222L11.4229 15.3023" stroke="#f5f5fa" stroke-width="1.5"/>
<path d="M7.14342 19.3312L8.3807 20.5684C9.28489 21.4726 9.73699 21.9247 10.2891 21.9892C10.4123 22.0036 10.5368 22.0036 10.6601 21.9892C11.2121 21.9247 11.6642 21.4726 12.5684 20.5684C13.4726 19.6642 13.9247 19.2121 13.9892 18.6601C14.0036 18.5368 14.0036 18.4123 13.9892 18.2891C13.9247 17.737 13.4726 17.2849 12.5684 16.3807L7.6193 11.4316C6.71511 10.5274 6.26301 10.0753 5.71092 10.0108C5.58768 9.9964 5.46318 9.9964 5.33994 10.0108C4.78785 10.0753 4.33575 10.5274 3.43156 11.4316C2.52737 12.3358 2.07528 12.7879 2.0108 13.3399C1.9964 13.4632 1.9964 13.5877 2.0108 13.7109C2.07528 14.263 2.52737 14.7151 3.43157 15.6193L4.05021 16.2379" stroke="#f5f5fa" stroke-width="1.5" stroke-linecap="round"/>
<path d="M16.8566 4.66885L15.6193 3.43156C14.7151 2.52737 14.263 2.07528 13.7109 2.0108C13.5877 1.9964 13.4632 1.9964 13.3399 2.0108C12.7879 2.07528 12.3358 2.52737 11.4316 3.43156C10.5274 4.33575 10.0753 4.78785 10.0108 5.33994C9.9964 5.46318 9.9964 5.58768 10.0108 5.71092C10.0753 6.26301 10.5274 6.71511 11.4316 7.6193L16.3807 12.5684C17.2849 13.4726 17.737 13.9247 18.2891 13.9892C18.4123 14.0036 18.5368 14.0036 18.6601 13.9892C19.2121 13.9247 19.6642 13.4726 20.5684 12.5684C21.4726 11.6642 21.9247 11.2121 21.9892 10.6601C22.0036 10.5368 22.0036 10.4123 21.9892 10.2891C21.9247 9.73699 21.4726 9.28489 20.5684 8.3807L19.9498 7.76206" stroke="#f5f5fa" stroke-width="1.5" stroke-linecap="round"/>
<path d="M18.0188 2.49805L21.1228 5.60206" stroke="#f5f5fa" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M2.49756 18.0186L5.60157 21.1226" stroke="#f5f5fa" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>', '#2C3335', '{"elevation":30,"padding":10,"borderRadius":50}', 'Gimansio'),
('<?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
<svg width="50px" height="50px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5 10.0802V20.0802H19V14M5 10.0802H4V7.0802H20V10.0802H5ZM12 7.0802C12.8333 5.24687 14.9999 1.5802 16.9999 3.5802C18.9999 5.5802 14.5 6.91353 12 7.0802ZM12 7.0802C11.1667 5.24687 8.99999 1.5802 6.99999 3.5802C4.99999 5.5802 9.5 6.91353 12 7.0802Z" stroke="#f5f5fa" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>', '#C7046D', '{"elevation":30,"padding":10,"borderRadius":50}', 'Regalos'),
('<?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
<svg fill="#f5f5fa" width="50px" height="50px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M1,19V5A3,3,0,0,1,4,2H20a1,1,0,0,1,0,2H4A1,1,0,0,0,4,6H20a1,1,0,0,1,1,1v3a1,1,0,0,1-2,0V8H4a2.966,2.966,0,0,1-1-.184V19a1,1,0,0,0,1,1h8a1,1,0,0,1,0,2H4A3,3,0,0,1,1,19Zm22-2a5,5,0,1,1-5-5A5.006,5.006,0,0,1,23,17Zm-2,0a3,3,0,1,0-3,3A3,3,0,0,0,21,17Z"/></svg>', '#36A507', '{"elevation":30,"padding":10,"borderRadius":50}', 'Ocio'),
('<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">

<!-- Uploaded to: SVG Repo, www.svgrepo.com, Transformed by: SVG Repo Mixer Tools -->
<svg width="50px" height="50px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#f5f5fa">

<g id="SVGRepo_bgCarrier" stroke-width="0"/>

<g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>

<g id="SVGRepo_iconCarrier"> <path d="M22 12C22 14.7578 20.8836 17.2549 19.0782 19.064M19.1414 5.00003C19.987 5.86255 20.6775 6.87759 21.1679 8.00006M5 19.1415C3.14864 17.3265 2 14.7974 2 12C2 9.235 3.12222 6.73208 4.93603 4.92188" stroke="#f5f5fa" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> <path d="M6 11.9822C6 10.4266 6.67333 9.01843 7.76162 8M16.2849 8.04397C17.3458 9.05877 18 10.4488 18 11.9822C18 13.5338 17.3302 14.9386 16.2469 15.9564M7.8 16C7.47294 15.6994 7.18244 15.3639 6.93531 15" stroke="#f5f5fa" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> <circle cx="12" cy="12" r="2" stroke="#f5f5fa" stroke-width="1.5"/> </g>

</svg>', '#0780A4', '{"elevation":30,"padding":10,"borderRadius":50}', 'Servicios'),
('<?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
<svg fill="#f5f5fa" width="50px" height="50px" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M426.667 460.8c-4.267-4.267-12.8-8.533-17.067-12.8l-55.467-59.733c-17.067-17.067-38.4-21.333-55.467-17.067l-17.067 4.267c-12.8 4.267-25.6 12.8-29.867 25.6s0 25.6 4.267 38.4L354.132 588.8c17.067 21.333 42.667 38.4 72.533 38.4h12.8l21.333-4.267 93.867-25.6L511.998 704c-4.267 17.067-4.267 29.867 4.267 42.667 8.533 8.533 17.067 12.8 25.6 12.8h12.8l38.4-12.8c21.333-4.267 46.933-25.6 59.733-46.933l85.333-149.333 153.6-42.667c25.6-8.533 42.667-34.133 34.133-59.733-17.067-59.733-76.8-93.867-136.533-81.067l-81.067 17.067-98.133-64c-17.067-12.8-42.667-17.067-64-17.067-8.533 0-17.067 4.267-25.6 4.267h-8.533c-17.067 4.267-25.6 12.8-29.867 25.6s0 29.867 12.8 38.4l46.933 51.2-98.133 25.6c-8.533 12.8-12.8 12.8-17.067 12.8zm192 209.067c-4.267 8.533-21.333 21.333-29.867 25.6L563.2 704l46.933-123.733 72.533-21.333-64 110.933zm-89.6-315.734c8.533-4.267 12.8-4.267 21.333-4.267 12.8 0 25.6 0 34.133 8.533l64 42.667-59.733 17.067-59.733-64zm277.333 51.2c34.133-8.533 72.533 12.8 81.067 46.933 0 0 0 4.267-4.267 4.267L430.933 576c-17.067 0-29.867-4.267-38.4-17.067l-98.133-140.8 12.8-4.267c4.267 0 8.533 0 12.8 4.267l59.733 64c8.533 8.533 17.067 12.8 25.6 21.333 0 0 4.267 4.267 12.8 4.267h8.533c12.8 0 21.333-4.267 29.867-4.267L806.4 405.333z"/><path d="M554.667 42.667c-226.133 0-418.133 162.133-460.8 379.733C25.6 465.067-12.8 524.8 0 567.467c8.533 38.4 46.933 64 102.4 72.533 17.067 4.267 38.4 4.267 55.467 4.267 38.4 0 81.067-4.267 123.733-17.067 12.8-4.267 17.067-17.067 17.067-25.6-4.267-12.8-17.067-17.067-25.6-17.067-59.733 17.067-115.2 21.333-157.867 12.8-38.4-8.533-64-21.333-68.267-42.667-4.267-17.067 8.533-46.933 42.667-72.533V512c0 17.067 0 38.4 4.267 55.467 0 12.8 12.8 21.333 25.6 21.333S140.8 576 140.8 563.2c0-17.067-4.267-34.133-4.267-51.2C132.266 277.333 320 85.333 554.666 85.333s422.4 192 422.4 422.4c0 234.667-192 422.4-422.4 422.4-170.667 0-324.267-102.4-388.267-256-4.267-12.8-17.067-17.067-29.867-12.8s-17.067 17.067-12.8 29.867c72.533 170.667 243.2 285.867 430.933 285.867 256 0 469.333-209.067 469.333-469.333S810.665 42.667 554.665 42.667z"/></svg>', '#D9D50A', '{"elevation":30,"padding":10,"borderRadius":50}', 'Viajes');

INSERT INTO User(name, email, passw, profile_picture) VALUES(
    "Ariel", "arielbrtz@gmail.com", "1234", "abcd"
);

UPDATE Category SET svg='<?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
<svg fill="#f5f5fa" width="50px" height="50px" viewBox="0 0 32 32" id="icon" xmlns="http://www.w3.org/2000/svg">
  <path d="M20,30H17a2.0021,2.0021,0,0,1-2-2V23h2v5h3V23h2V19a1.0011,1.0011,0,0,0-1-1H12.2793l-2-6H4a1.0011,1.0011,0,0,0-1,1v6H5v9H9V21h2v7a2.0021,2.0021,0,0,1-2,2H5a2.0021,2.0021,0,0,1-2-2V21a2.0021,2.0021,0,0,1-2-2V13a3.0033,3.0033,0,0,1,3-3h6.2793a1.998,1.998,0,0,1,1.8975,1.3674L13.7207,16H21a3.0033,3.0033,0,0,1,3,3v4a2.0021,2.0021,0,0,1-2,2v3A2.0021,2.0021,0,0,1,20,30Z"/>
  <path d="M28,30H26V19h3V13a1.0011,1.0011,0,0,0-1-1H24V10h4a3.0033,3.0033,0,0,1,3,3v6a2.0021,2.0021,0,0,1-2,2H28Z"/>
  <path d="M7,9a4,4,0,1,1,4-4A4.0045,4.0045,0,0,1,7,9ZM7,3A2,2,0,1,0,9,5,2.0021,2.0021,0,0,0,7,3Z"/>
  <path d="M25,9a4,4,0,1,1,4-4A4.0045,4.0045,0,0,1,25,9Zm0-6a2,2,0,1,0,2,2A2.0021,2.0021,0,0,0,25,3Z"/>
  <path d="M18.5,15A3.5,3.5,0,1,1,22,11.5,3.5041,3.5041,0,0,1,18.5,15Zm0-5A1.5,1.5,0,1,0,20,11.5,1.5017,1.5017,0,0,0,18.5,10Z"/>
  <rect id="_Transparent_Rectangle_" class="cls-1"/>
</svg>' WHERE id_category='3';
