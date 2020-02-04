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
            PolizaEncabezados = new PolizaEncabezadoRepository(_context);
            TipoPoliza = new TipoPolizaRepository(_context);
            TipoRiesgo = new TipoRiesgoRepository(_context);
            Cliente = new ClienteRepository(_context);
            PolizaXCliente = new PolizaXClienteRepository(_context);

        }

        public ISeguridadLoginRepository SeguridadLogins { get; private set; }
        public IPolizaEncabezadoRepository PolizaEncabezados { get; private set; }
        public ITipoPolizaRepository TipoPoliza { get; private set; }
        public ITipoRiesgoRepository TipoRiesgo { get; private set; }
        public IClienteRepository Cliente{ get; private set; }
        public IPolizaXClienteRepository PolizaXCliente { get; private set; }


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
