public class Account
{
    public long AccountID { get; set; }
    public long ClientID { get; set; }
    public decimal TotalAmount { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime ModifiedAt { get; set; }
}