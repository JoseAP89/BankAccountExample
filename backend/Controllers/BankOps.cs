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
}
