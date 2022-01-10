-- creating tables
DROP PROCEDURE IF EXISTS proc_client;
DROP TRIGGER IF EXISTS update_operation_on_account ON account;
DROP TRIGGER IF EXISTS update_operation_on_client ON client;
DROP TABLE IF EXISTS operation;
DROP TABLE IF EXISTS transaction;
DROP TABLE IF EXISTS account;
DROP TABLE IF EXISTS client;

CREATE TABLE client (
    ClientID int PRIMARY KEY,
    FullName varchar(80) NOT NULL,
    CreatedAt TIMESTAMP NOT NULL DEFAULT NOW(),
    ModifiedAt TIMESTAMP
);

CREATE TABLE Account (
    AccountID int PRIMARY KEY,
    TotalAmount numeric(14,4) NOT NULL,
    ClientID int NOT NULL,
    CreatedAt TIMESTAMP NOT NULL DEFAULT NOW(),
    ModifiedAt TIMESTAMP,
    FOREIGN KEY (ClientID)
        REFERENCES client (ClientID)
);

CREATE TABLE transaction (
    TransactionID SERIAL PRIMARY KEY,
    Name varchar(250),
    Description varchar(250),
    CreatedAt TIMESTAMP NOT NULL DEFAULT NOW(),
    ModifiedAt TIMESTAMP
);

CREATE TABLE operation (
    OperationID SERIAL PRIMARY KEY,
    ClientID int NOT NULL,
    TransactionID int NOT NULL,
    Amount numeric(9,4),-- ya que hay un limite de 20,000 por transaccion  de efectivo 
    CreatedAt TIMESTAMP NOT NULL DEFAULT NOW(),
    ModifiedAt TIMESTAMP
);

GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO bank;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO bank;

-- funcion para cambiar la tabla operation al agregarse un cliente
CREATE OR REPLACE FUNCTION func_add_client()
  RETURNS trigger AS
$func$
BEGIN
    insert into operation(clientID, transactionID, amount)
        values(NEW.clientID, 1, 0);

   RETURN NEW; -- optional for AFTER trigger
END
$func$  LANGUAGE plpgsql;

-- trigger para actualizar tabla operacion al haber inserciones en la tabla client
CREATE TRIGGER update_operation_on_client
    AFTER INSERT ON client
    FOR EACH ROW
    EXECUTE PROCEDURE func_add_client();

-- funcion para cambiar la tabla operation al agregarse una cuenta de ahorro
CREATE OR REPLACE FUNCTION func_add_account()
  RETURNS trigger AS
$func$
BEGIN
    insert into operation(clientID, transactionID, amount)
        values(NEW.clientID, 2, NEW.totalAmount);

   RETURN NEW; -- optional for AFTER trigger
END
$func$  LANGUAGE plpgsql;

-- trigger para actualizar tabla operacion al haber inserciones en la tabla account
CREATE TRIGGER update_operation_on_account
    AFTER INSERT ON account
    FOR EACH ROW
    EXECUTE PROCEDURE func_add_account();

-- funcion para cambiar la tabla operation al haber transferencias de dinero
CREATE OR REPLACE FUNCTION func_changed_account()
  RETURNS trigger AS
$func$
DECLARE
    difference numeric(14,4) := NEW.totalAmount - OLD.totalAmount;
    transactionID int := 0;
BEGIN
    if difference > 0.0 then
        transactionID := 3; -- se deposito dinero 
    else 
        transactionID := 4; -- se retiro dinero 
    end if;
    insert into operation(clientID, transactionID, amount)
        values(NEW.clientID, transactionID, difference);

   RETURN NEW; -- optional for AFTER trigger
END
$func$  LANGUAGE plpgsql;

-- trigger para actualizar tabla operacion al haber transferencias o cambios en los montos de la cuenta
CREATE TRIGGER update_operation_on_transactions
    AFTER UPDATE ON account
    FOR EACH ROW
    WHEN ( ABS(NEW.totalAmount - OLD.totalAmount) > 0.00001)
    EXECUTE PROCEDURE func_changed_account();

-- filling state table

INSERT INTO transaction (Name, Description) VALUES
  ('Cliente', 'Se añadio un nuevo cliente'), --1
  ('Cuenta', 'Se añadio una nueva cuenta de ahorro'),
  ('Deposito', 'Se deposito efectivo a una cuenta de ahorros'),
  ('Retiro', 'Se retiro efectivo de la cuenta de ahorros'),
  ('Movimiento', 'Se solicitó una revisión de los movimientos de una cuenta');  --5

INSERT INTO client (ClientID, FullName) VALUES
  (1, 'José Alvarez Pumarino'),
  (615503, 'North Symers'),
  (38327, 'Appolonia Leece'),
  (777593, 'Jenni Allcorn'),
  (628506, 'Moyra Teasell'),
  (892322, 'Oralla Dulling'),
  (873389, 'Olav Fenner'),
  (801754, 'Lissie Prangley'),
  (406553, 'Stu Logesdale'),
  (118625, 'Carlen Nigh');


INSERT INTO account (AccountID, ClientID, TotalAmount) VALUES
  (1,1, 10600.56),
  (891108,615503, 14617.43),
  (379187,38327, 8317.61),
  (519537,777593, 1232.58),
  (333827,628506, 10089.06),
  (424340,892322, 4022.19),
  (32681,873389, 3960.45),
  (244325,801754, 17438.56),
  (293019,406553, 19092.8),
  (952676,118625, 12680.84);
