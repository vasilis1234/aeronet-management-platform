
INSERT INTO ROLES (RoleID, RoleName) VALUES ('ADMIN_01', 'Administrator');
INSERT INTO ROLES (RoleID, RoleName) VALUES ('ENG_01', 'Engineer');

INSERT INTO EMPLOYEE (EmpID, FullName, JobTitle, Department, Email, RoleID) 
VALUES ('EMP_001', 'Γιάννης Παπαδόπουλος', 'Engineer', 'Maintenance', 'giannis@aeronet.gr', 'ADMIN_01');

INSERT INTO SUPPLIERS (Name, ContactEmail, Category) 
VALUES ('AirParts Ltd', 'sales@airparts.com', 'Hardware');