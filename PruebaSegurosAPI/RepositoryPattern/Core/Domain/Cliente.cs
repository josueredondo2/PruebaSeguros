using System;
using System.Collections.Generic;

namespace PruebaSeguros.RepositoryPattern.Core.Domain
{
    public partial class Cliente
    {
        public Cliente()
        {
            PolizaXCliente = new HashSet<PolizaXCliente>();
        }

        public int ClienteCedula { get; set; }
        public string ClienteNombre { get; set; }
        public string ClienteApellido { get; set; }
        public string ClienteEmail { get; set; }

        public virtual ICollection<PolizaXCliente> PolizaXCliente { get; set; }
    }
}
