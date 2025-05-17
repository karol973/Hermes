namespace Hermes.Domain.Entities
{
    public class OrderItem : BaseEntity
    {
        public Guid Id { get; init; }
        public Guid OrderId { get; init; }
        public Order Order { get; init; }   
        public Guid BookId { get; init; }
        public Book Book { get; init; }
        public int Quantity {  get; init; }
        public decimal UnitPrice { get; init; }
    }
}
