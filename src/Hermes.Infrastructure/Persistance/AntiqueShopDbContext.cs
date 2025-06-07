using Hermes.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Persistence
{
    public class AntiqueShopDbContext : DbContext
    {
        public DbSet<AntiqueShop> AntiqueShops { get; set; }
        public DbSet<Book> Books { get; set; }
        public DbSet<Author> Authors { get; set; }
        public DbSet<Address> Addresses { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderItem> OrderItems { get; set; }
        public DbSet<Publisher> Publishers { get; set; }
        public DbSet<User> Users { get; set; }

        public AntiqueShopDbContext(DbContextOptions<AntiqueShopDbContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<User>(entity =>
            {
                entity.HasKey(u => u.Id);

                entity.Property(u => u.Username)
                    .IsRequired()
                    .HasMaxLength(100);

                entity.HasIndex(u => u.Username)
                    .IsUnique();

                entity.Property(u => u.PasswordHash)
                    .IsRequired();

                entity.Property(u => u.Role)
                    .IsRequired();

                entity.Property(u => u.IsActive)
                    .IsRequired();

                entity.Property(u => u.AddressId)
                    .IsRequired(false);

                entity.HasMany(u => u.Orders)
                    .WithOne(o => o.User)
                    .HasForeignKey(o => o.UserId)
                    .OnDelete(DeleteBehavior.Restrict);
            });

            modelBuilder.Entity<Address>(entity =>
            {
                entity.HasKey(a => a.Id);

                entity.Property(a => a.Street)
                    .IsRequired()
                    .HasMaxLength(200);

                entity.Property(a => a.City)
                    .IsRequired()
                    .HasMaxLength(100);

                entity.Property(a => a.PostalCode)
                    .IsRequired()
                    .HasMaxLength(20);

                entity.Property(a => a.Country)
                    .IsRequired()
                    .HasMaxLength(100);

                entity.Property(a => a.StateOrRegion)
                    .HasMaxLength(100);

                entity.Property(a => a.ApartmentNumber)
                    .HasMaxLength(20);
            });

            modelBuilder.Entity<AntiqueShop>(entity =>
            {
                entity.HasKey(s => s.Id);

                entity.Property(s => s.Name)
                    .IsRequired()
                    .HasMaxLength(200);

                entity.HasIndex(s => s.Name)
                    .IsUnique();

                entity.Property(s => s.Description)
                    .IsRequired()
                    .HasMaxLength(1000);

                entity.Property(s => s.EmailAddress)
                    .HasMaxLength(200);

                entity.Property(s => s.PhoneNumber)
                    .HasMaxLength(50);

                entity.Property(s => s.IsActive)
                    .IsRequired();

                entity.HasMany(s => s.Books)
                    .WithOne(b => b.AntiqueShop)
                    .HasForeignKey(b => b.AntiqueShopId)
                    .OnDelete(DeleteBehavior.Restrict);
            });

            modelBuilder.Entity<Book>(entity =>
            {
                entity.HasKey(b => b.Id);

                entity.Property(b => b.Name)
                    .IsRequired()
                    .HasMaxLength(255);

                entity.Property(b => b.PublishYear)
                    .IsRequired();

                entity.Property(b => b.Price)
                    .IsRequired()
                    .HasColumnType("decimal(10,2)");

                entity.Property(b => b.Quantity)
                    .IsRequired();

                entity.Property(b => b.IsAvailable)
                    .IsRequired();

                entity.Property(b => b.Category)
                    .HasConversion<string>()
                    .IsRequired();

                entity.HasIndex(b => new { b.Name, b.AuthorId })
                    .IsUnique();

                entity.HasOne(b => b.Author)
                    .WithMany(a => a.Books)
                    .HasForeignKey(b => b.AuthorId)
                    .OnDelete(DeleteBehavior.Restrict);

                entity.HasOne(b => b.Publisher)
                    .WithMany(p => p.Books)
                    .HasForeignKey(b => b.PublisherId)
                    .OnDelete(DeleteBehavior.Restrict);

                entity.HasOne(b => b.AntiqueShop)
                    .WithMany(s => s.Books)
                    .HasForeignKey(b => b.AntiqueShopId)
                    .OnDelete(DeleteBehavior.Restrict);

                entity.HasMany(b => b.OrderItems)
                    .WithOne(oi => oi.Book)
                    .HasForeignKey(oi => oi.BookId)
                    .OnDelete(DeleteBehavior.Restrict);
            });

            modelBuilder.Entity<Author>(entity =>
            {
                entity.HasKey(a => a.Id);

                entity.Property(a => a.Name)
                    .IsRequired()
                    .HasMaxLength(100);

                entity.Property(a => a.Surname)
                    .IsRequired()
                    .HasMaxLength(100);

                entity.HasIndex(a => new { a.Name, a.Surname })
                    .IsUnique();

                entity.HasMany(a => a.Books)
                    .WithOne(b => b.Author)
                    .HasForeignKey(b => b.AuthorId)
                    .OnDelete(DeleteBehavior.Restrict);
            });

            modelBuilder.Entity<Publisher>(entity =>
            {
                entity.HasKey(p => p.Id);

                entity.Property(p => p.Name)
                    .IsRequired()
                    .HasMaxLength(200);

                entity.HasIndex(p => p.Name)
                    .IsUnique();

                entity.HasMany(p => p.Books)
                    .WithOne(b => b.Publisher)
                    .HasForeignKey(b => b.PublisherId)
                    .OnDelete(DeleteBehavior.Restrict);
            });

            modelBuilder.Entity<Order>(entity =>
            {
                entity.HasKey(o => o.Id);

                entity.Property(o => o.OrderDate)
                    .IsRequired();

                entity.HasOne(o => o.User)
                    .WithMany(u => u.Orders)
                    .HasForeignKey(o => o.UserId)
                    .OnDelete(DeleteBehavior.Restrict);

                entity.HasMany(o => o.OrderItems)
                    .WithOne(oi => oi.Order)
                    .HasForeignKey(oi => oi.OrderId)
                    .OnDelete(DeleteBehavior.Cascade);
            });

            modelBuilder.Entity<OrderItem>(entity =>
            {
                entity.HasKey(oi => oi.Id);

                entity.Property(oi => oi.Quantity)
                    .IsRequired();

                entity.Property(oi => oi.UnitPrice)
                    .HasColumnType("decimal(10,2)")
                    .IsRequired();

                entity.HasOne(oi => oi.Order)
                    .WithMany(o => o.OrderItems)
                    .HasForeignKey(oi => oi.OrderId)
                    .OnDelete(DeleteBehavior.Cascade);

                entity.HasOne(oi => oi.Book)
                    .WithMany(b => b.OrderItems)
                    .HasForeignKey(oi => oi.BookId)
                    .OnDelete(DeleteBehavior.Restrict);

                entity.HasIndex(oi => new { oi.OrderId, oi.BookId })
                    .IsUnique();
            });
        }
    }
}
