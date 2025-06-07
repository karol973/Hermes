namespace Hermes.Domain.Entities
{
    public class OrderItem : BaseEntity
    {
        public int Id { get; init; }
        public int OrderId { get; init; }
        public Order Order { get; init; }   
        public int BookId { get; init; }
        public Book Book { get; init; }
        public int Quantity {  get; init; }
        public decimal UnitPrice { get; init; }
    }
}
