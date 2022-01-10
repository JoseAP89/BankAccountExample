-- creating tables
DROP TABLE IF EXISTS operation;
DROP TABLE IF EXISTS transaction;
DROP TABLE IF EXISTS account;
DROP TABLE IF EXISTS client;

CREATE TABLE client (
    ClientID int PRIMARY KEY,
    FullName varchar(80),
    CreatedAt TIMESTAMP NOT NULL DEFAULT NOW(),
    ModifiedAt TIMESTAMP
);

CREATE TABLE Account (
    AccountID int PRIMARY KEY,
    TotalAmmount numeric(14,4),
    ClientID int NOT NULL,
    CreatedAt TIMESTAMP NOT NULL DEFAULT NOW(),
    ModifiedAt TIMESTAMP,
    FOREIGN KEY (ClientID)
        REFERENCES client (ClientID)
);

CREATE TABLE transaction (
    TransacionID SERIAL PRIMARY KEY,
    Name varchar(250),
    Description varchar(250),
    CreatedAt TIMESTAMP NOT NULL DEFAULT NOW(),
    ModifiedAt TIMESTAMP
);

CREATE TABLE operation (
    OperartionID SERIAL PRIMARY KEY,
    ClientID int NOT NULL,
    TransactionID int NOT NULL,
    Ammount numeric(9,4), -- ya que el maximo por transaccion son 20,000
    CreatedAt TIMESTAMP NOT NULL DEFAULT NOW(),
    ModifiedAt TIMESTAMP
);


-- filling state table

INSERT INTO transaction (Name, Description) VALUES
  ('Cliente', 'Se añadio un nuevo cliente'),
  ('Cuenta', 'Se añadio una nueva cuenta de ahorro'),
  ('Deposito', 'Se deposito efectivo a una cuenta de ahorros'),
  ('Retiro', 'Se retiro efectivo de la cuenta de ahorros'),
  ('Movimiento', 'Se solicitó una revisión de los movimientos de una cuenta');

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


INSERT INTO account (AccountID, ClientID, TotalAmmount) VALUES
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
