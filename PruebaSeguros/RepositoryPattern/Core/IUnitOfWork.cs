﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PruebaSeguros.RepositoryPattern.Core.Repositories;
namespace PruebaSeguros.RepositoryPattern.Core
{
    public interface IUnitOfWork : IDisposable
    {
        ISeguridadLoginRepository SeguridadLogin { get; }
        IPolizaEncabezadoRepository PolizaEncabezado { get; }
        ITipoPolizaRepository TipoPoliza{ get; }
        ITipoRiesgoRepository TipoRiesgo{ get; }
        IClienteRepository Cliente{ get; }
        IPolizaXClienteRepository PolizaXCliente { get; }
        int Complete();
    }
}
