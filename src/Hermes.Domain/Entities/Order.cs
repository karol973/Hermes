namespace Hermes.Domain.Entities
{
    public class Order
    {
        public int Id { get; init; }
        public DateTime OrderDate { get; init; }
        public int UserId { get; init; }
        public User User { get; init; }
        public ICollection<OrderItem> OrderItems { get; init; } = new List<OrderItem>();

    }
}
