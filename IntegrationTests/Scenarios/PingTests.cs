using FluentAssertions;
using IntegrationTests.Fixtures;
using System;
using System.Collections.Generic;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace IntegrationTests.Scenarios
{
    [Collection("SystemCollection")]
    public class PingTests
    {
        public readonly TestContext Context;

        public PingTests(TestContext context)
        {
            Context = context;
        }

        [Fact]
        public async Task PingReturnsOkResponse()
        {
            var response = await Context.Client.GetAsync("/ping");

            response.EnsureSuccessStatusCode();

            response.StatusCode.Should().Be(HttpStatusCode.OK);
        }
    }
}
