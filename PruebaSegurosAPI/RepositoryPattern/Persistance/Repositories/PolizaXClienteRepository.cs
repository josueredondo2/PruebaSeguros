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

  
 
        public TestSegurosContext TestSegurosContext
        {
            get { return Context as TestSegurosContext; }
        }

        public IEnumerable<PolizaXCliente> ObtenerDetallePolizaXCliente(int Cedula)
        {
            return TestSegurosContext.PolizaXCliente.Where(x=>x.ClienteCedula.Equals(Cedula))
             .Select(x => new PolizaXCliente
             {
                 ClienteCedula = x.ClienteCedula,
                 InicioVigencia = x.InicioVigencia,
                 IdPoliza = x.IdPoliza,
                 IdPolizaNavigation = new PolizaEncabezado
                 {
                     IdPoliza = x.IdPolizaNavigation.IdPoliza,
                     Nombre = x.IdPolizaNavigation.Nombre,
                     Descripcion = x.IdPolizaNavigation.Descripcion,
                     PrecioPoliza = x.IdPolizaNavigation.PrecioPoliza,
                     PeriodoCoberturaMeses = x.IdPolizaNavigation.PeriodoCoberturaMeses,
                     TipoPoliza = x.IdPolizaNavigation.TipoPoliza,
                     TipoRiesgo = x.IdPolizaNavigation.TipoRiesgo,
                     TipoPolizaNavigation = new TipoPoliza { Nombre = x.IdPolizaNavigation.TipoPolizaNavigation.Nombre },
                     TipoRiesgoNavigation = new TipoRiesgo { Nombre = x.IdPolizaNavigation.TipoRiesgoNavigation.Nombre },
                 }
             }
             ).ToList();

        }
    }
}
