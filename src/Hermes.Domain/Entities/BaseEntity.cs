namespace Hermes.Domain.Entities
{
    public class BaseEntity
    {
        public DateTime CreateDate { get; init; }
        public DateTime? ModifyDate { get; set; }
    }
}
