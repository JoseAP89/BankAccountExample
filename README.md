# Proyecto BankAccount

El caso de uso es el siguiente:

Actualmente se cuenta con un sistema que otorga créditos a nuestros clientes y ahora queremos ampliar la oferta a cuentas de ahorro. Cada cliente existente podrá APERTURAR una o varias cuentas de ahorro, o tal vez decida no aperturar ninguna. El cliente podrá solicitar a un usuario del sistema, realizar RETIROS (salida de dinero) o DEPÓSITOS (ingreso de dinero) en cualquiera de sus cuentas.

 

Se requiere:

   * Una pantalla de Alta de clientes. Atributos mínimos: Nombre Completo y Número de identificación.

   * Una pantalla de Apertura de Cuenta de Ahorro. Atributos mínimos: Número de cuenta y Saldo actual.

   * Una pantalla (o las que consideres) para realizar Depósitos y Retiros. Atributos mínimos: Monto de la transacción y número de la cuenta.

   * Alguna forma de ver un historial de estas transacciones, puede ser un reporte, o simplemente ver directamente en el repositorio de datos el cómo se van registrando y cómo se afecta el saldo de la cuenta.

## Diagrama de clases de la BD

![picture alt](https://github.com/JoseAP89/BankAccountExample/blob/main/img/diagrama_clases.png "diagrama")

## Instrucciones de instalación en local

* Descargar el proyecto usando git.
* Correr npm install en la carpeeta de front.
* Instalar Postgresql, ya que es la BD utilizada.
* Con tu usuario postgres, default, crear la base de datos 'savings' y al usuario 'bank' con la contraseña indicada en el _conectionString del archivo BankOps.cs.
* Después correr el archivo migrations.sql en la base de datos, que creará todas las tablas, procedimientos, triggers y otorgara los permisios necesarios al usuario 'bank'.
* Correr el back con el commando dotnet run y en la carpeta de front el comando npm run start.
* Ir a localhost:3000 para comenzar a usar la app.
