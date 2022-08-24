using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

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
        public AttributeTypes Type { get; set; }
        [Required]
        public string Value { get; set; }
        public DateTimeOffset Timestamp { get; set; }
    }
    public class BoatModel
    {
        [Required]
        public string Id { get; set; }
        public List<BoatAttribute> BoatAttributes { get; set; }
    }
}
