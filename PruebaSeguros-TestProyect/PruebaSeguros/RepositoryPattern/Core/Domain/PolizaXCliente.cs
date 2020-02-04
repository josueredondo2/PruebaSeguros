using System;
using System.Collections.Generic;

namespace PruebaSeguros.RepositoryPattern.Core.Domain
{
    public partial class PolizaXCliente
    {
        public int ClienteCedula { get; set; }
        public int IdPoliza { get; set; }
        public DateTime InicioVigencia { get; set; }

        public virtual Cliente ClienteCedulaNavigation { get; set; }
        public virtual PolizaEncabezado IdPolizaNavigation { get; set; }
    }
}
