using PruebaSeguros.RepositoryPattern.Core.Domain;
using PruebaSeguros.RepositoryPattern.Core.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PruebaSeguros.RepositoryPattern.Persistance.Repositories
{
    public class TipoRiesgoRepository : Repository<TipoRiesgo>, ITipoRiesgoRepository
    {
        public TipoRiesgoRepository(TestSegurosContext context) : base(context)
        {
        }

        public TestSegurosContext TestSegurosContext
        {
            get { return Context as TestSegurosContext; }
        }

    }
}
