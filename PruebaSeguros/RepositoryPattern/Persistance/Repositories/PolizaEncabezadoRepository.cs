using Microsoft.EntityFrameworkCore;
using PruebaSeguros.RepositoryPattern.Core.Domain;
using PruebaSeguros.RepositoryPattern.Core.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PruebaSeguros.RepositoryPattern.Persistance.Repositories
{
    public class PolizaEncabezadoRepository : Repository<PolizaEncabezado>, IPolizaEncabezadoRepository
    {
        public PolizaEncabezadoRepository(TestSegurosContext context) : base(context)
        {
        }

        public TestSegurosContext TestSegurosContext
        {
            get { return Context as TestSegurosContext; }
        }

    }
}
