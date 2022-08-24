using SSRSWebApi.Models;

namespace DomainLogic.Common
{
    public static class Extensions
    {
        public static bool IsReadOnly(this AttributeTypes attribute)
        {
            switch (attribute)
            {
                case AttributeTypes.TankLevel: return true;
                case AttributeTypes.AlarmLevel: return false;
                default: return false;
            }          
        }
        public static bool MergeAttribute(this BoatAttribute sourceAttribute, BoatAttribute newAttribute)
        {
            if (sourceAttribute.Timestamp < newAttribute.Timestamp)
            {
                sourceAttribute.Value = newAttribute.Value;
                sourceAttribute.Timestamp = newAttribute.Timestamp;
                return true;
            }
            return false;
        }
    }
}
