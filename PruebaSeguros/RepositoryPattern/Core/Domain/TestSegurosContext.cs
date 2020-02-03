using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace PruebaSeguros.RepositoryPattern.Core.Domain
{
    public partial class TestSegurosContext : DbContext
    {
        public TestSegurosContext()
        {
        }

        public TestSegurosContext(DbContextOptions<TestSegurosContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Cliente> Cliente { get; set; }
        public virtual DbSet<PolizaEncabezado> PolizaEncabezado { get; set; }
        public virtual DbSet<PolizaXCliente> PolizaXCliente { get; set; }
        public virtual DbSet<SeguridadLogin> SeguridadLogin { get; set; }
        public virtual DbSet<TipoPoliza> TipoPoliza { get; set; }
        public virtual DbSet<TipoRiesgo> TipoRiesgo { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer("Server=DESKTOP-IRCRH06\\SQLEXPRESS; Database= TestSeguros; Trusted_Connection=True;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Cliente>(entity =>
            {
                entity.HasKey(e => e.ClienteCedula);

                entity.ToTable("cliente");

                entity.Property(e => e.ClienteCedula)
                    .HasColumnName("cliente_cedula")
                    .ValueGeneratedNever();

                entity.Property(e => e.ClienteApellido)
                    .IsRequired()
                    .HasColumnName("cliente_apellido")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.ClienteEmail)
                    .IsRequired()
                    .HasColumnName("cliente_email")
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.Property(e => e.ClienteNombre)
                    .IsRequired()
                    .HasColumnName("cliente_nombre")
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<PolizaEncabezado>(entity =>
            {
                entity.HasKey(e => e.IdPoliza)
                    .HasName("PK_poliza_encabezado_1");

                entity.ToTable("poliza_encabezado");

                entity.HasIndex(e => e.Nombre)
                    .HasName("IX_poliza_encabezado")
                    .IsUnique();

                entity.Property(e => e.IdPoliza).HasColumnName("id_poliza");

                entity.Property(e => e.Descripcion)
                    .IsRequired()
                    .HasColumnName("descripcion")
                    .HasMaxLength(500)
                    .IsUnicode(false);

                entity.Property(e => e.Nombre)
                    .IsRequired()
                    .HasColumnName("nombre")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.PeriodoCoberturaMeses).HasColumnName("periodo_cobertura_meses");

                entity.Property(e => e.PrecioPoliza)
                    .HasColumnName("precio_poliza")
                    .HasColumnType("numeric(18, 2)");

                entity.Property(e => e.TipoPoliza).HasColumnName("tipo_poliza");

                entity.Property(e => e.TipoRiesgo).HasColumnName("tipo_riesgo");

                entity.HasOne(d => d.TipoPolizaNavigation)
                    .WithMany(p => p.PolizaEncabezado)
                    .HasForeignKey(d => d.TipoPoliza)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_poliza_encabezado_poliza_tipo");

                entity.HasOne(d => d.TipoRiesgoNavigation)
                    .WithMany(p => p.PolizaEncabezado)
                    .HasForeignKey(d => d.TipoRiesgo)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_poliza_encabezado_poliza_riesgo");
            });

            modelBuilder.Entity<PolizaXCliente>(entity =>
            {
                entity.HasKey(e => new { e.ClienteCedula, e.IdPoliza });

                entity.ToTable("poliza_x_cliente");

                entity.Property(e => e.ClienteCedula).HasColumnName("cliente_cedula");

                entity.Property(e => e.IdPoliza).HasColumnName("id_poliza");

                entity.Property(e => e.InicioVigencia)
                    .HasColumnName("inicio_vigencia")
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("('1900-01-01')");

                entity.HasOne(d => d.ClienteCedulaNavigation)
                    .WithMany(p => p.PolizaXCliente)
                    .HasForeignKey(d => d.ClienteCedula)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_poliza_x_cliente_cliente");

                entity.HasOne(d => d.IdPolizaNavigation)
                    .WithMany(p => p.PolizaXCliente)
                    .HasForeignKey(d => d.IdPoliza)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_poliza_x_cliente_poliza");
            });

            modelBuilder.Entity<SeguridadLogin>(entity =>
            {
                entity.HasKey(e => e.Usuario);

                entity.ToTable("seguridad_login");

                entity.Property(e => e.Usuario)
                    .HasColumnName("usuario")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Pass)
                    .IsRequired()
                    .HasColumnName("pass")
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<TipoPoliza>(entity =>
            {
                entity.HasKey(e => e.IdTipo);

                entity.ToTable("tipo_poliza");

                entity.HasIndex(e => e.Nombre)
                    .HasName("IX_tipo_poliza")
                    .IsUnique();

                entity.Property(e => e.IdTipo).HasColumnName("id_tipo");

                entity.Property(e => e.Nombre)
                    .IsRequired()
                    .HasColumnName("nombre")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.PorcentajeCubrimiento)
                    .HasColumnName("porcentaje_cubrimiento")
                    .HasColumnType("numeric(9, 2)");
            });

            modelBuilder.Entity<TipoRiesgo>(entity =>
            {
                entity.HasKey(e => e.IdRiesgo);

                entity.ToTable("tipo_riesgo");

                entity.HasIndex(e => e.Nombre)
                    .HasName("IX_tipo_riesgo")
                    .IsUnique();

                entity.Property(e => e.IdRiesgo).HasColumnName("id_riesgo");

                entity.Property(e => e.Nombre)
                    .IsRequired()
                    .HasColumnName("nombre")
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
