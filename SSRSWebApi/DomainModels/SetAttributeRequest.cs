namespace SSRSWebApi.Models
{
    public class SetAttributeRequest
    {
        public string BoatId { get; set; }
        public BoatAttribute Attribute { get; set; }
    }
}
