using PruebaSeguros.RepositoryPattern.Core.Domain;
using PruebaSeguros.RepositoryPattern.Core.Repositories;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace PruebaSeguros.RepositoryPattern.Persistance.Repositories
{
    public class PolizaXClienteRepository : Repository<PolizaXCliente>, IPolizaXClienteRepository
    {
        public PolizaXClienteRepository(TestSegurosContext context) : base(context)
        {
        }

  
        public IEnumerable<PolizaXCliente> ObtenerDetallePolizaXCliente(int Cedula)
        {
            return TestSegurosContext.PolizaXCliente.Include(a => a.IdPolizaNavigation).Where(x => x.ClienteCedula.Equals(Cedula)).ToList();
        }

        public TestSegurosContext TestSegurosContext
        {
            get { return Context as TestSegurosContext; }
        }

    }
}
