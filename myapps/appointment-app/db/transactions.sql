INSERT INTO customer(name, mobile, password, location)
VALUES(?,?,?,?);

SELECT * FROM customer WHERE mobile=?;

INSERT INTO appointment(customer_id, car_name, model,
	appointment_date, service_type)
VALUES(?,?,?,
	?,?);
	
SELECT * FROM appointment WHERE (status = 1);
/* JOIN with customer also */

SELECT * FROM appointment WHERE (status = ?) OR (? = 4 AND status IN(2,3));
/* JOIN with customer also */
	/*
	1? = 2 for ACCEPTED, 3-for CANCELLED
	2? = 4 for BOTH 
	*/
	
UPDATE 	appointment SET staff = ? WHERE (id = ?); -- CONFIRM APPOINTMENT 

UPDATE 	appointment SET cancel_reason = ? WHERE (id = ?); -- CANCEL APPOINTMENT

SELECT * FROM admin WHERE username=?;

