using DomainLogic;
using DomainLogic.Common;
using Microsoft.AspNetCore.Cors;
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
        [DisableCors]
        public List<BoatModel> GetBoats([FromQuery] string boatIds)
        {
            var result = new List<BoatModel>();
            var idList = boatIds.Split(',').ToList();
            foreach(var id in idList)
            {
                var trimmedId = id.Trim();
                if (_inmemoryStorage.Exists(trimmedId))
                {
                    result.Add(_inmemoryStorage.GetBoatModel(trimmedId));
                }
            }
            return result;
        }

        [HttpPost]
        [Route("setattribute")]
        [DisableCors]
        public bool SetValue([FromBody] SetAttributeRequest request)
        {
            var updateAttributeUseCase = new UpdateAttributeUseCase(_inmemoryStorage);
            var result = updateAttributeUseCase.UpdateAttribute(request);
            if (!result)
            {
                throw new BadHttpRequestException("Cannot update a read-only property");
            }
            return result;
        }

    }
}
