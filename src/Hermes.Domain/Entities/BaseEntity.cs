namespace Hermes.Domain.Entities
{
    public class BaseEntity
    {
        public DateTime CreateDate { get; init; }
        public Guid CreatedById { get; init; }
        public User CreatedBy { get; init; }
        public DateTime? ModifyDate { get; set; }
        public Guid? ModifiedById { get; set; }
        public User? ModifiedBy { get; set; }
    }
}
