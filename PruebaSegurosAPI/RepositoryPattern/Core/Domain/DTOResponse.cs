using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PruebaSeguros.RepositoryPattern.Core.Domain
{
    public class DTOResponse
    {
        public bool Correcto { get; set; }
        public object Dato{ get; set; }
    }
}
