using Microsoft.AspNetCore.Mvc;
using SSRSWebApi.Common;
using SSRSWebApi.Domain;
using SSRSWebApi.Models;

namespace SSRSWebApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class MonitorController : ControllerBase
    {
        [HttpGet]
        public List<BoatModel> GetBoats([FromQuery] string boatIds)
        {
            var result = new List<BoatModel>();
            var idList = boatIds.Split(',').ToList();
            foreach(var id in idList)
            {
                if (InmemoryStorage.Boats.TryGetValue(id, out var boat))
                {
                    result.Add(boat);
                }
            }
            return result;
        }

        [HttpPost]
        [Route("setattribute")]
        public void SetValue([FromBody] SetAttributeRequest request)
        {
            if (!request.Attribute.Type.IsReadOnly())
            {
                if (InmemoryStorage.Boats.TryGetValue(request.BoatId, out var boat))
                {
                    var currentAttribute = boat.BoatAttributes.FirstOrDefault(x => x.Type == request.Attribute.Type);
                    if (currentAttribute?.Timestamp < request.Attribute.Timestamp && currentAttribute?.Value != request.Attribute.Value)
                    {
                        currentAttribute.Value = request.Attribute.Value;
                        currentAttribute.Timestamp = request.Attribute.Timestamp;
                    }
                }
            }
        }

    }
}
