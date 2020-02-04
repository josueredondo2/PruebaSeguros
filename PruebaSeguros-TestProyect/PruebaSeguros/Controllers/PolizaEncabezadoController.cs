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
                return Ok(new DTOResponse { Correcto = true, Dato = unitOfWork.PolizaEncabezados.GetAll() } );

            }
            catch (Exception ex)
            {
                //LogException(e);
                return Ok(new DTOResponse { Correcto = false, Dato = ex.InnerException.Message });
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
                var tipoRiesgo = unitOfWork.TipoRiesgo.Get(value.TipoRiesgo);
                if (tipoRiesgo.Nombre.Equals("Alto"))
                {
                    if (!unitOfWork.TipoPoliza.ValidaReglaNegocio(value.TipoPoliza))
                    {
                        return Ok(new DTOResponse { Correcto = false, Dato = "No se puede guardar una póliza de cobertura mayor a 50% y que su riesgo sea alto." });
                    }
                }
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
        [HttpPut]
        public ActionResult Put([FromBody] PolizaEncabezado value)
        {
            try
            {
                var tipoRiesgo = unitOfWork.TipoRiesgo.Get(value.TipoRiesgo);
                if (tipoRiesgo.Nombre.Equals("Alto"))
                {
                    if (!unitOfWork.TipoPoliza.ValidaReglaNegocio(value.TipoPoliza))
                    {
                        return Ok(new DTOResponse { Correcto = false, Dato = "No se puede guardar una póliza de cobertura mayor a 50% y que su riesgo sea alto." });
                    }
                }
                unitOfWork.PolizaEncabezados.Update(value);
                int resultado = unitOfWork.Complete();
                if (resultado == 1)
                {
                    return Ok(new DTOResponse { Correcto = true });
                }
                else
                {
                    return Ok(new DTOResponse { Correcto = false, Dato = "No se modifico objeto" });
                }

            }
            catch (Exception ex)
            {
                //LogException(e);
                return Ok(new DTOResponse { Correcto = false, Dato = ex.InnerException.Message });
            }
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            try
            {
                PolizaEncabezado valueDelete = new PolizaEncabezado { IdPoliza = id };
                unitOfWork.PolizaEncabezados.Remove(valueDelete);
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
