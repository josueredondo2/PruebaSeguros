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
    public class PolizaEncabezadoController : ControllerBase
    {

        
        private readonly UnitOfWork unitOfWork;

        public PolizaEncabezadoController(TestSegurosContext context)
        {
        
            unitOfWork = new UnitOfWork(context);
        }

       
        // GET: api/PolizaEncabezado
        [HttpGet]
        public ActionResult<IEnumerable<PolizaEncabezado>> Get()
        {
            try
            {
                return Ok(unitOfWork.PolizaEncabezados.GetAll() );
                
            }
            catch (Exception ex)
            {
                //LogException(e);
                return StatusCode(500, "Error interno del server: " + ex.Message);
            }
        }

        //// GET: api/PolizaEncabezado/5
        //[HttpGet("{id}", Name = "Get")]
        //public string Get(int id)
        //{
        //    return "value";
        //}

        // POST: api/PolizaEncabezado
        [HttpPost]
        public ActionResult Post([FromBody] PolizaEncabezado value)
        {
            try
            {
                unitOfWork.PolizaEncabezados.Add(value);
                int resultado = unitOfWork.Complete();
                if (resultado == 1)
                {
                    return Ok(new DTOResponse { Correcto = true});
                }
                else
                {
                    return Ok(new DTOResponse { Correcto = false,Dato ="No se inserto objeto" });
                }
         
            }
            catch (Exception ex)
            {
                //LogException(e);
                return Ok(new DTOResponse {Correcto=false,Dato=ex.InnerException.Message } );
            }
        }

        // PUT: api/PolizaEncabezado/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
