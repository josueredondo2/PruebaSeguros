using PruebaSeguros.RepositoryPattern.Core.Domain;
using PruebaSeguros.RepositoryPattern.Core.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PruebaSeguros.RepositoryPattern.Persistance.Repositories
{
    public class TipoPolizaRepository : Repository<TipoPoliza>, ITipoPolizaRepository
    {
        public TipoPolizaRepository(TestSegurosContext context) : base(context)
        {
        }

        public TestSegurosContext TestSegurosContext
        {
            get { return Context as TestSegurosContext; }
        }

        public bool ValidaReglaNegocio(int tipo_poliza)
        {
            TipoPoliza tipo = new TipoPoliza();
            tipo = TestSegurosContext.TipoPoliza.Where(x => x.IdTipo.Equals(tipo_poliza)).FirstOrDefault();
            if (tipo!=null)
            {
                if (tipo.PorcentajeCubrimiento > 50)
                {
                    return false;
                }
                return true;
            }
            else
            {
                return false;
            }
        }
    }
}
