public class OperationReport
{
    public long OperationID { get; set; }
    public long ClientID { get; set; }
    public long AccountID { get; set; }
    public string? FullName { get; set; }
    public string? Transaction { get; set; }
    public decimal Amount { get; set; }
    public DateTime CreatedAt { get; set; }

    
}