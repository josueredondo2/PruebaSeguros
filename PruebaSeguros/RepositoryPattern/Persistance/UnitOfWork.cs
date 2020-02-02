using PruebaSeguros.RepositoryPattern.Core.Domain;
using PruebaSeguros.RepositoryPattern.Core.Repositories;
using PruebaSeguros.RepositoryPattern.Persistance.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PruebaSeguros.RepositoryPattern.Persistance
{
    public class UnitOfWork
    {
        private readonly TestSegurosContext _context;

        public UnitOfWork(TestSegurosContext context)
        {
            _context = context;
            SeguridadLogins = new SeguridadLoginRepository(_context);

        }

        public ISeguridadLoginRepository SeguridadLogins { get; private set; }


        public int Complete()
        {
            return _context.SaveChanges();
        }

        public void Dispose()
        {
            _context.Dispose();
        }
    }
}
