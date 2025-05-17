namespace Hermes.Domain.Entities
{
    public class Order
    {
        public Guid Id { get; init; }
        public DateTime OrderDate { get; init; }
        public Guid UserId { get; init; }
        public User User { get; init; }
        public ICollection<OrderItem> OrderItems { get; init; } = new List<OrderItem>();

    }
}
