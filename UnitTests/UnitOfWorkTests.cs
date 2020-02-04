using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using PruebaSeguros.RepositoryPattern.Core;
using PruebaSeguros.RepositoryPattern.Core.Domain;
using PruebaSeguros.RepositoryPattern.Core.Repositories;
using System;
using System.Collections.Generic;
using System.Text;

namespace UnitTests
{
    [TestClass()]
    public class UnitOfWorkTests
    {

        public UnitOfWorkTests()
        {
            

        }

        [TestMethod]
        public void TestReglaDeNegocio()
        {
         IUnitOfWork _unitOfWork;

        List<Cliente> lst = new List<Cliente>();
            lst.Add(new Cliente { ClienteCedula = 2, ClienteApellido = "", ClienteEmail = "", ClienteNombre = "", PolizaXCliente = new List<PolizaXCliente>() });
            lst.Add(new Cliente { ClienteCedula = 3, ClienteApellido = "", ClienteEmail = "", ClienteNombre = "", PolizaXCliente = new List<PolizaXCliente>() });


            var mockTipoRiesgo = new Mock<ITipoRiesgoRepository>();
            mockTipoRiesgo.Setup(sep => sep.Get(1)).Returns(new TipoRiesgo { IdRiesgo = 1, Nombre = "Bajo" });
            mockTipoRiesgo.Setup(sep => sep.Get(2)).Returns(new TipoRiesgo { IdRiesgo = 2, Nombre = "Alto" });


            var mock2 = new Mock<IUnitOfWork>();
            mock2.Setup(setp => setp.TipoRiesgo).Returns(mockTipoRiesgo.Object);

            _unitOfWork = mock2.Object; 


            //Cambiar este valor para realizar la validacion
            TipoRiesgo TipoRiezgo1 = _unitOfWork.TipoRiesgo.Get(1);
            //TipoRiesgo TipoRiezgo2 = _unitOfWork.TipoRiesgo.Get(2);

            Assert.AreEqual(TipoRiezgo1.Nombre, "Alto", "No se puede agregar una poliza con tipo de riegzo alto");

        }
    }
}
