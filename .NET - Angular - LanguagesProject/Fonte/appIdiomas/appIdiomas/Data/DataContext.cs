using appIdiomas.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace appIdiomas.Data
{
    public class DataContext : DbContext
    {

        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        public DbSet<Usuario> Usuarios { get; set; }

        public DbSet<Grupo> Grupos { get; set; }

        public DbSet<Foto> Fotos { get; set; }

        public DbSet<UsuariosGrupos> UsuariosGrupos { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<UsuariosGrupos>()
                .HasKey(ug => new { ug.UsuarioId, ug.GrupoId });

            builder.Entity<UsuariosGrupos>()
                .HasOne(ug => ug.Usuario)
                .WithMany(u => u.UsuariosGrupos)
                .HasForeignKey(ug => ug.UsuarioId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.Entity<UsuariosGrupos>()
                .HasOne(ug => ug.Grupo)
                .WithMany(g => g.UsuariosGrupos)
                .HasForeignKey(ug => ug.GrupoId)
                .OnDelete(DeleteBehavior.Restrict);
        }

    }
}
