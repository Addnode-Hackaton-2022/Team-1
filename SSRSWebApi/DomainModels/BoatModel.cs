using System.ComponentModel.DataAnnotations;

namespace SSRSWebApi.Models
{
    public enum AttributeTypes : int
    {
        /// <summary>
        /// TankLevel
        /// </summary>
        TankLevel = 0,
        /// <summary>
        /// AlarmLevel
        /// </summary>
        AlarmLevel = 1,
        /// <summary>
        /// Reserved
        /// </summary>
        Reserved = 2,
    }

    public class BoatAttribute
    {
        [EnumDataType(typeof(AttributeTypes))]
        public AttributeTypes Type { get; set; }
        [Required]
        public string Value { get; set; } = string.Empty;
        public DateTimeOffset Timestamp { get; set; }
    }
    public class BoatModel
    {
        [Required]
        public string Id { get; set; } = string.Empty;
        public List<BoatAttribute> BoatAttributes { get; set; } = new List<BoatAttribute>();
        public DateTimeOffset Timestamp { get; set; }
    }
}
