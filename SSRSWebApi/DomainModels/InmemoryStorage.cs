using SSRSWebApi.Models;
using System.Collections.Concurrent;

namespace SSRSWebApi.Domain
{
    public interface IInmemoryStorage
    {
        bool Exists(string id);
        BoatModel? GetBoatModel(string id);
        void UpsertBoat(BoatModel model);
        void Clear();
        List<BoatModel> GetAll();

    }
    public class InmemoryStorage : IInmemoryStorage
    {
        private ConcurrentDictionary<string, BoatModel> Boats { get; set; } = new ConcurrentDictionary<string, BoatModel>();

        public bool Exists(string id)
        {
            return Boats.ContainsKey(id);
        }
        public BoatModel? GetBoatModel(string id)
        {
            if (Boats.ContainsKey(id)) return Boats[id];
            return null;
        }
        public void UpsertBoat(BoatModel model)
        {
            Boats[model.Id] = model;
        }
        public void Clear()
        {
            Boats.Clear();
        }
        public List<BoatModel> GetAll()
        {
            return Boats.Values.ToList();
        }
    }
}
