using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PruebaSeguros.RepositoryPattern.Core.Domain;
using PruebaSeguros.RepositoryPattern.Persistance;

namespace PruebaSeguros.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class PolizaXClienteController : ControllerBase
    {
        private readonly UnitOfWork unitOfWork;

        public PolizaXClienteController(TestSegurosContext context)
        {

            unitOfWork = new UnitOfWork(context);
        }

        //// GET: api/PolizaXCliente/5
        [HttpGet("{id}", Name = "Get")]
        public ActionResult<IEnumerable<PolizaXCliente>> Get(int id)
        {
            try
            {
                return Ok(new DTOResponse { Correcto = false, Dato = unitOfWork.PolizaXCliente.ObtenerDetallePolizaXCliente(id) });

            }
            catch (Exception ex)
            {
                //LogException(e);
                return StatusCode(500, "Error interno del server: " + ex.Message);
            }
        }
    }
}