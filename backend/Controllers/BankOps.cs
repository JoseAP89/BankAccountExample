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

}
