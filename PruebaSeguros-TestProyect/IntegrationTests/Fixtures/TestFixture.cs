//using Microsoft.AspNetCore.Hosting;
//using Microsoft.AspNetCore.TestHost;
//using PruebaSeguros;
//using System;
//using System.Collections.Generic;
//using System.IO;
//using System.Net.Http;
//using System.Text;

//namespace IntegrationTests.Fixtures
//{
//    public class TestFixture
//    {
//        public HttpClient _client { get; set; }
//        private TestServer _server { get; set; }

//        public TestFixture()
//        {
//            SetupClient();
//        }

//        private void SetupClient()
//        {

//            var testAssemblyPath = Path.GetDirectoryName(System.Reflection.Assembly.GetExecutingAssembly().Location);
//            // Remove the "\\bin\\Debug\\netcoreapp2.1"
//            var solutionPath = Directory.GetParent(testAssemblyPath.Substring(0, testAssemblyPath.LastIndexOf(@"\bin\", StringComparison.Ordinal))).FullName;
//            var clientReactPath = Path.Join(solutionPath, @"\PruebaSeguros\ClientApp");

//            // Important to ensure that npm loads and is pointing to correct directory
//            Directory.SetCurrentDirectory(clientReactPath);

//            var server = new TestServer(new WebHostBuilder()
//                .UseEnvironment("Development")
//                .UseWebRoot(clientReactPath)
//                .UseStartup<TestStartup>());

//            _client = server.CreateClient();

//            //_server = new TestServer(new WebHostBuilder().UseStartup<TestStartup>());
//            //_client = _server.CreateClient();
//        }
//    }
    
//}
