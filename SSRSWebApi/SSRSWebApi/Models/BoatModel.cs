namespace SSRSWebApi.Models
{
    public enum AttributeTypes : int
    {
        TankLevel = 0,
        AlarmLevel = 1,
        Reserved = 2,
    }

    public class BoatAttribute
    {
        public AttributeTypes Type { get; set; }
        public string Value { get; set; }
        public DateTimeOffset Timestamp { get; set; }

        internal bool IsReadonly()
        {
            throw new NotImplementedException();
        }
    }
    public class BoatModel
    {
        public string Id { get; set; }
        public List<BoatAttribute> BoatAttributes { get; set; }
    }
}
