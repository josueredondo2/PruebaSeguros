using PruebaSeguros.RepositoryPattern.Core.Domain;


namespace PruebaSeguros.RepositoryPattern.Core.Repositories
{
    public interface ITipoPolizaRepository : IRepository<TipoPoliza>
    {
        bool ValidaReglaNegocio(int tipo_poliza);
    }
}