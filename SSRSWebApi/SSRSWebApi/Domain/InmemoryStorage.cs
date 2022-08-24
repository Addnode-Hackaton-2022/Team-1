using SSRSWebApi.Models;

namespace SSRSWebApi.Domain
{
    public static class InmemoryStorage
    {
        public static Dictionary<string, BoatModel> Boats { get; set; } = new Dictionary<string, BoatModel>();
    }
}
