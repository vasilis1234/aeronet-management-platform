
INSERT INTO ROLES (RoleID, RoleName) VALUES ('ADMIN_01', 'Administrator');
INSERT INTO ROLES (RoleID, RoleName) VALUES ('ENG_01', 'Engineer');

INSERT INTO EMPLOYEE (EmpID, FullName, JobTitle, Department, Email, RoleID) 
VALUES ('EMP_001', 'Γιάννης Παπαδόπουλος', 'Engineer', 'Maintenance', 'giannis@aeronet.gr', 'ADMIN_01');

INSERT INTO SUPPLIERS (Name, ContactEmail, Category) 
VALUES ('AirParts Ltd', 'sales@airparts.com', 'Hardware');

INSERT INTO PARTS (PartName, SKU, StockLevel) VALUES 
('Engine Bolt M10', 'EBM-100', 500),
('Wing Sensor v2', 'WSV-202', 12);


INSERT INTO ORDERS (PartID, SupplierID, Quantity) VALUES (1, 1, 200);


INSERT INTO SHIPMENTS (OrderID, Status, DeliveryDate) VALUES (1, 'In Transit', '2026-06-15');