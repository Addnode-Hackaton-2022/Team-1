using DomainLogic;
using DomainLogic.Common;
using Microsoft.AspNetCore.Mvc;
using SSRSWebApi.Domain;
using SSRSWebApi.Models;

namespace SSRSWebApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class MonitorController : ControllerBase
    {
        private readonly IInmemoryStorage _inmemoryStorage;
        public MonitorController(IInmemoryStorage inmemoryStorage)
        {
            _inmemoryStorage = inmemoryStorage;
        }
        [HttpGet]
        public List<BoatModel> GetBoats([FromQuery] string boatIds)
        {
            var result = new List<BoatModel>();
            var idList = boatIds.Split(',').ToList();
            foreach(var id in idList)
            {
                if (_inmemoryStorage.Exists(id))
                {
                    result.Add(_inmemoryStorage.GetBoatModel(id));
                }
            }
            return result;
        }

        [HttpPost]
        [Route("setattribute")]
        public bool SetValue([FromBody] SetAttributeRequest request)
        {
            var updateAttributeUseCase = new UpdateAttributeUseCase(_inmemoryStorage);
            var result = updateAttributeUseCase.UpdateAttribute(request);
            //if (!result)
            //{
            //    throw new BadRequestObjectResult ("Cannot update a read-only property");
            //}
            return result;
        }

    }
}
