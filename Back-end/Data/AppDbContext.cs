using Microsoft.EntityFrameworkCore;
using BlueCode.Models;

namespace BlueCode.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {

        }

        public DbSet<Usuario> Usuarios { get; set; }
        public DbSet<Almoxarifado> Almoxarifado { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configurações adicionais (se necessário)
            modelBuilder.Entity<Usuario>()
                .HasKey(u => u.IdUsuario); // Definindo explicitamente a chave primária
        }
    }
}
