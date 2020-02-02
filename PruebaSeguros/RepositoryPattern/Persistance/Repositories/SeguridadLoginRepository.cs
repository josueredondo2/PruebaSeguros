using PruebaSeguros.RepositoryPattern.Core.Domain;
using PruebaSeguros.RepositoryPattern.Core.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PruebaSeguros.RepositoryPattern.Persistance.Repositories
{
    public class SeguridadLoginRepository : Repository<SeguridadLogin>, ISeguridadLoginRepository
    {
        public SeguridadLoginRepository(TestSegurosContext context) : base(context)
        {
        }

        public SeguridadLogin ValidarLogin(string user, string pass)
        {
            return TestSegurosContext.SeguridadLogin.Where(x => x.Usuario.Equals(user)&& x.Pass.Equals(pass) ).FirstOrDefault();
        }
        public TestSegurosContext TestSegurosContext
        {
            get { return Context as TestSegurosContext; }
        }

    }
}
