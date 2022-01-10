using Dapper;
using Microsoft.AspNetCore.Mvc;
using Npgsql;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class BankOpsController : ControllerBase
{
    private readonly ILogger<BankOpsController> _logger;
    private readonly string _stringConection;

    public BankOpsController(ILogger<BankOpsController> logger)
    {
        _logger = logger;
        _stringConection = "Server=127.0.0.1;Port=5432;Database=savings;User Id=bank;Password=test123456;";
    }


    // GET: api/BankOps/client/5
    [HttpGet("client/{clientid}")]
    public async Task<ActionResult<Client>> GetClient(long clientid)
    {
        try
        {
            using (var connection = new NpgsqlConnection(_stringConection))
            {
                connection.Open();
                var client = await connection.QueryFirstAsync<Client>($"Select * From client WHERE ClientID ={clientid}").ConfigureAwait(false); 
                if (client == null)
                {
                   return NoContent(); 
                }
                return client;
            }
        }
        catch (System.Exception ex)
        {
            return BadRequest(ex.Message);
        }

    }

    // POST: api/BankOps/client
    [HttpPost("client")]
    public async Task<IActionResult> CreateClient(Client client)
    {
        try
        {
            using (var connection = new NpgsqlConnection(_stringConection))
            {
                connection.Open();

                string sqlQuery = "Insert Into client (ClientID, FullName) Values(@ClientID, @FullName)";
                int rowsAffected = await connection.ExecuteAsync(sqlQuery, new {ClientID= client.ClientID, FullName= client.FullName}).ConfigureAwait(false);
                if (rowsAffected == 0)
                {
                   return NoContent(); 
                }
                return CreatedAtAction(
                    nameof(GetClient),
                    new { clientid = client.ClientID },
                    client
                );

            }
            
        }
        catch (System.Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    // GET: api/BankOps/account/5
    [HttpGet("account/{accountid}")]
    public async Task<ActionResult<Account>> GetAccount(long accountid)
    {
        try
        {
            using (var connection = new NpgsqlConnection(_stringConection))
            {
                connection.Open();
                var account = await connection.QueryFirstAsync<Account>($"Select * From account WHERE accountID ={accountid}").ConfigureAwait(false); 
                if (account == null)
                {
                   return NoContent(); 
                }
                return account;
            }
        }
        catch (System.Exception ex)
        {
            return BadRequest(ex.Message);
        }

    }

    // POST: api/BankOps/account
    [HttpPost("account")]
    public async Task<IActionResult> CreateAccount(Account account)
    {
        try
        {
            using (var connection = new NpgsqlConnection(_stringConection))
            {
                connection.Open();
                var count = await connection.QueryFirstAsync<long>($"Select count(*) From client WHERE clientID ={account.ClientID}").ConfigureAwait(false); 
                if (count == 0)
                {
                    return BadRequest("No existe el cliente con id " + account.ClientID + ". Solo se pueden crear cuentas de ahorro para clientes existentes.");
                }
                string sqlQuery = "Insert Into account (AccountID, ClientID, TotalAmount) Values(@AccountID, @ClientID, @TotalAmount)";
                int rowsAffected = await connection.ExecuteAsync(sqlQuery,
                    new {
                        AccountID = account.AccountID,
                        ClientID= account.ClientID,
                        TotalAmount = account.TotalAmount
                    }
                ).ConfigureAwait(false);
                if (rowsAffected == 0)
                {
                   return NoContent(); 
                }
                return CreatedAtAction(
                    nameof(GetAccount),
                    new { accountid = account.AccountID },
                    account
                );

            }
            
        }
        catch (System.Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    // PUT: api/BankOps/account/5
    [HttpPut("account/{accountid}")]
    public async Task<IActionResult> UpdateAccount(Account account)
    {   // account en este context representa una cuenta temporal que se sumara (+/-) a la cuenta destino
        try
        {
            using (var connection = new NpgsqlConnection(_stringConection))
            {
                connection.Open();
                var totalAmount = await connection.QueryFirstAsync<decimal>($"Select totalAmount From account WHERE accountID ={account.AccountID}").ConfigureAwait(false); 
                decimal newAmount = totalAmount + account.TotalAmount ;
                if(newAmount < 0){
                    return BadRequest("La cuenta no tiene los recursos suficientes para realizar el retiro.");
                }
                string sqlQuery = "UPDATE account SET totalAmount=@NewAmount WHERE accountID=@AccountID";
                int rowsAffected = await connection.ExecuteAsync(sqlQuery,
                    new {
                        AccountID = account.AccountID,
                        NewAmount = newAmount
                    }
                ).ConfigureAwait(false);
                if (rowsAffected == 0)
                {
                   return NoContent(); 
                }
                return CreatedAtAction(
                    nameof(GetAccount),
                    new { accountid = account.AccountID },
                    account
                );

            }
            
        }
        catch (System.Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    // GET: api/BankOps/movements/5/6
    [HttpGet("movements/{clientid}/{accountid}")]
    public async Task<ActionResult<IEnumerable<OperationReport>>> GetAccount(long clientid, long accountid)
    {
        try
        {
            using (var connection = new NpgsqlConnection(_stringConection))
            {
                connection.Open();
                var query = await connection.QueryMultipleAsync(@$"
                    select o.operationid, o.clientid, a.accountid ,c.fullname, 
                    t.name as transaction, o.amount, o.createdat from operation o 
                    join transaction t on t.transactionid=o.transactionid 
                    join client c on c.clientid=o.clientid 
                    join account a on a.clientid=c.clientid 
                    where a.accountid={accountid} and c.clientid={clientid}
                    order  by o.createdat desc").ConfigureAwait(false); 
                var report= query.Read<OperationReport>().ToArray();
                if (report == null)
                {
                   return NoContent(); 
                }
                return report;
            }
        }
        catch (System.Exception ex)
        {
            return BadRequest(ex.Message);
        }

    }


}
// select o.clientid, c.fullname, o.transactionid, t.name, o.amount from operation o join transaction t on t.transactionid=o.transactionid join client c on c.clientid=o.clientid order  by o.createdat;