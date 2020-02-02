using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PruebaSeguros.RepositoryPattern.Core.Repositories;
namespace PruebaSeguros.RepositoryPattern.Core
{
    public interface IUnitOfWork : IDisposable
    {
        ISeguridadLoginRepository SeguridadLogin { get; }
        int Complete();
    }
}
