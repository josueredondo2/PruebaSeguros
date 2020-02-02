using PruebaSeguros.RepositoryPattern.Core.Domain;


namespace PruebaSeguros.RepositoryPattern.Core.Repositories
{
    public interface ISeguridadLoginRepository : IRepository<SeguridadLogin>
    {
        SeguridadLogin ValidarLogin(string user, string pass);
    }
}