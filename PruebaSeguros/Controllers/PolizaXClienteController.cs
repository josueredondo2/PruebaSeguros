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


        [HttpPost]
        public ActionResult Post([FromBody] PolizaXCliente value)
        {
            try
            {
                PolizaXCliente Existe = unitOfWork.PolizaXCliente.Find(x => x.ClienteCedula.Equals(value.ClienteCedula) && x.IdPoliza.Equals(value)).FirstOrDefault();

                if (Existe!= null)
                {
                    return Ok(new DTOResponse { Correcto = false, Dato = "El cliente ya tiene asignada la póliza seleccionada." });
                }
                unitOfWork.PolizaXCliente.Add(value);
                int resultado = unitOfWork.Complete();
                if (resultado == 1)
                {
                    return Ok(new DTOResponse { Correcto = true });
                }
                else
                {
                    return Ok(new DTOResponse { Correcto = false, Dato = "No se inserto objeto" });
                }

            }
            catch (Exception ex)
            {
                //LogException(e);
                return Ok(new DTOResponse { Correcto = false, Dato = ex.InnerException.Message });
            }
        }

        // DELETE: api/ApiWithActions/5
        [HttpPost("DeletePost")]
        public ActionResult DeletePost(PolizaXCliente value)
        {
            try
            {
            
                unitOfWork.PolizaXCliente.Remove(value);
                int resultado = unitOfWork.Complete();
                if (resultado == 1)
                {
                    return Ok(new DTOResponse { Correcto = true });
                }
                else
                {
                    return Ok(new DTOResponse { Correcto = false, Dato = "No se elimino objeto" });
                }

            }
            catch (Exception ex)
            {
                //LogException(e);
                return Ok(new DTOResponse { Correcto = false, Dato = ex.InnerException.Message });
            }
        }
    }
}