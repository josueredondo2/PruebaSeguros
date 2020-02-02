using System;
using System.Collections.Generic;

namespace PruebaSeguros.RepositoryPattern.Core.Domain
{
    public partial class TipoRiesgo
    {
        public TipoRiesgo()
        {
            PolizaEncabezado = new HashSet<PolizaEncabezado>();
        }

        public int IdRiesgo { get; set; }
        public string IdNombre { get; set; }

        public virtual ICollection<PolizaEncabezado> PolizaEncabezado { get; set; }
    }
}
