using System;
using System.Collections.Generic;

namespace PruebaSeguros.RepositoryPattern.Core.Domain
{
    public partial class PolizaEncabezado
    {
        public PolizaEncabezado()
        {
            PolizaXCliente = new HashSet<PolizaXCliente>();
        }

        public int IdPoliza { get; set; }
        public string Nombre { get; set; }
        public string Descripcion { get; set; }
        public int PeriodoCoberturaMeses { get; set; }
        public decimal PrecioPoliza { get; set; }
        public int TipoRiesgo { get; set; }
        public int TipoPoliza { get; set; }

        public virtual TipoPoliza TipoPolizaNavigation { get; set; }
        public virtual TipoRiesgo TipoRiesgoNavigation { get; set; }
        public virtual ICollection<PolizaXCliente> PolizaXCliente { get; set; }
    }
}
