using PruebaSeguros.RepositoryPattern.Core.Domain;
using System.Collections.Generic;

namespace PruebaSeguros.RepositoryPattern.Core.Repositories
{
    public interface IPolizaXClienteRepository : IRepository<PolizaXCliente>
    {
        IEnumerable<PolizaXCliente> ObtenerDetallePolizaXCliente(int Cedula);
    }
}