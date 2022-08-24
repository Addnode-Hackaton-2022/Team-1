using DomainLogic.Common;
using SSRSWebApi.Domain;
using SSRSWebApi.Models;

namespace DomainLogic
{
    public class UpdateBoatUseCase
    {
        private readonly IInmemoryStorage _inmemoryStorage;
        public UpdateBoatUseCase(IInmemoryStorage inmemoryStorage)
        {
            _inmemoryStorage = inmemoryStorage;
        }
        public BoatModel UpdateBoat(BoatModel model)
        {
            if (_inmemoryStorage.Exists(model.Id))
            {
                var boat = _inmemoryStorage.GetBoatModel(model.Id);
                foreach (var attr in model.BoatAttributes)
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
                var cloned = new BoatModel
                {
                    Id = model.Id,
                    BoatAttributes = new List<BoatAttribute>()
                };
                foreach(var attr in model.BoatAttributes)
                {
                    if (cloned.BoatAttributes.FirstOrDefault(x => x.Type == attr.Type) == null)
                    {
                        cloned.BoatAttributes.Add(new BoatAttribute
                        {
                            Type = attr.Type,
                            Value = attr.Value,
                            Timestamp = attr.Timestamp
                        });
                    }
                }
                _inmemoryStorage.UpsertBoat(cloned);
            }
            var sourceBoat = _inmemoryStorage.GetBoatModel(model.Id);
            var result = new BoatModel
            {
                Id = model.Id,
                BoatAttributes = sourceBoat.BoatAttributes.Where(x => !x.Type.IsReadOnly()).ToList()
            };
            return result;
        }
    }
}