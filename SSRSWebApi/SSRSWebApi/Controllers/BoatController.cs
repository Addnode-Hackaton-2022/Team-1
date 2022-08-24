using Microsoft.AspNetCore.Mvc;
using SSRSWebApi.Common;
using SSRSWebApi.Domain;
using SSRSWebApi.Models;

namespace SSRSWebApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class BoatController : ControllerBase
    {
        [HttpPost]
        [Route("update")]
        public BoatModel BoatUpdate([FromBody] BoatModel model)
        {
            if (InmemoryStorage.Boats.TryGetValue(model.Id, out var boat))
            {
                foreach(var attr in model.BoatAttributes)
                {
                    var sourceAttr = boat.BoatAttributes.FirstOrDefault(x => x.Type == attr.Type);
                    if (sourceAttr == null)
                    {
                        boat.BoatAttributes.Add(new BoatAttribute
                        {
                            Type = attr.Type,
                            Value = attr.Value,
                            Timestamp = attr.Timestamp
                        });
                    }
                    else
                    {
                        sourceAttr.MergeAttribute(attr);
                    }
                }
            }
            else
            {
                InmemoryStorage.Boats[model.Id] = model;
            }
            var sourceBoat = InmemoryStorage.Boats[model.Id];
            var result = new BoatModel
            {
                Id = model.Id,
                BoatAttributes = sourceBoat.BoatAttributes.Where(x => !x.Type.IsReadOnly()).ToList()
            };
            return result;
        }
        [HttpGet]
        [Route("all")]
        public List<BoatModel> GetAllBoats()
        {
            return InmemoryStorage.Boats.Values.ToList();
        }
    }
}
