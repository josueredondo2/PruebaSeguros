using System;
using System.Collections.Generic;

namespace PruebaSeguros.RepositoryPattern.Core.Domain
{
    public partial class TipoPoliza
    {
        public TipoPoliza()
        {
            PolizaEncabezado = new HashSet<PolizaEncabezado>();
        }

        public int IdTipo { get; set; }
        public string Nombre { get; set; }
        public decimal PorcentajeCubrimiento { get; set; }

        public virtual ICollection<PolizaEncabezado> PolizaEncabezado { get; set; }
    }
}
