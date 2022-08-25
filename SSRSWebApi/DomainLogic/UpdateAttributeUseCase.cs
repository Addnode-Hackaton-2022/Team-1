using DomainLogic.Common;
using SSRSWebApi.Domain;
using SSRSWebApi.Models;

namespace DomainLogic
{
    public class UpdateAttributeUseCase
    {
        private readonly IInmemoryStorage _inmemoryStorage;
        public UpdateAttributeUseCase(IInmemoryStorage inmemoryStorage)
        {
            _inmemoryStorage = inmemoryStorage;
        }
        public bool UpdateAttribute(SetAttributeRequest request)
        {
            if (request.Attribute == null) return false;
            if (!request.Attribute.Type.IsReadOnly())
            {
                if (_inmemoryStorage.Exists(request.BoatId))
                {
                    var boat = _inmemoryStorage.GetBoatModel(request.BoatId);
                    var currentAttribute = boat.BoatAttributes.FirstOrDefault(x => x.Type == request.Attribute.Type);
                    if (currentAttribute == null) return false;
                    if (currentAttribute.Timestamp < request.Attribute.Timestamp && currentAttribute?.Value != request.Attribute.Value && currentAttribute != null)
                    {
                        currentAttribute.Value = request.Attribute.Value;
                        currentAttribute.Timestamp = request.Attribute.Timestamp;
                        return true;
                    }
                    return false;
                }
            }
            return false;
        }
    }
}
