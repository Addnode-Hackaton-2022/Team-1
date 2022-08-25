using Microsoft.AspNetCore.Mvc;
using SSRSWebApi.Domain;
using SSRSWebApi.Models;
using DomainLogic;
using Microsoft.AspNetCore.Cors;

namespace SSRSWebApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class BoatController : ControllerBase
    {
        private readonly IInmemoryStorage _inmemoryStorage;
        public BoatController(IInmemoryStorage inmemoryStorage)
        {
            _inmemoryStorage = inmemoryStorage;
        }
        [HttpPost]
        [Route("update")]
        [DisableCors]
        public BoatModel BoatUpdate([FromBody] BoatModel model)
        {
            var useCase = new UpdateBoatUseCase(_inmemoryStorage);
            return useCase.UpdateBoat(model);
        }
        [HttpGet]
        [Route("all")]
        [DisableCors]
        public List<BoatModel> GetAllBoats()
        {
            return _inmemoryStorage.GetAll();
        }
    }
}
