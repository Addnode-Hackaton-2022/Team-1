using BoatAPI;

Console.WriteLine("Starting three boats, Ubåten, Tankaren and Soppatorsk");
var httpClient = new HttpClient();
var bac = new BoatAPIClient("https://ssrswebapi20220824153938.azurewebsites.net/", httpClient);

//Run forever
while (1 == 1)
{
    var fuel = 100;
    BoatModel ubaten = CreateBoat("Ubåten", fuel, 20);

    BoatModel tankaren = CreateBoat("Tankaren", (100 - fuel), 20);

    BoatModel soppatorsk = CreateBoat("Soppatorsk", 0, 1);

    bac.UpdateAsync(ubaten);
    bac.UpdateAsync(tankaren);
    bac.UpdateAsync(soppatorsk);

    while (fuel > 0)
    {
        //Lower fuellevel
        fuel--;

        //Update fuel and set timestamp
        var bAttribute = ubaten.BoatAttributes.Single(ba => ba.Type == BoatAttributeType._0);
        bAttribute.Value = fuel.ToString();
        bAttribute.Timestamp = DateTimeOffset.UtcNow;

        //Update fuel and set timestamp
        var tAttribute = tankaren.BoatAttributes.Single(ba => ba.Type == BoatAttributeType._0);
        tAttribute.Value = (100 - fuel).ToString();
        tAttribute.Timestamp = DateTimeOffset.UtcNow;

        //Set Timestamp without updating value, signal boat is active and values stable
        var sAttribute = soppatorsk.BoatAttributes.Single(ba => ba.Type == BoatAttributeType._0);
        sAttribute.Timestamp = DateTimeOffset.UtcNow;
        var sAttribute1 = soppatorsk.BoatAttributes.Single(ba => ba.Type == BoatAttributeType._1);
        sAttribute1.Timestamp = DateTimeOffset.UtcNow;

        bac.UpdateAsync(ubaten);
        bac.UpdateAsync(tankaren);
        bac.UpdateAsync(soppatorsk);

        Console.WriteLine("Fuellevel: " + fuel);
        Thread.Sleep(1000);
    }
}

static BoatModel CreateBoat(string boatId, int fuel, int alarmlevel)
{
    var b = new BoatModel();
    b.Id = boatId;
    b.BoatAttributes = new List<BoatAttribute>();
    b.BoatAttributes.Add(new BoatAttribute()
    {
        Timestamp = DateTimeOffset.UtcNow,
        Type = BoatAttributeType._0,
        Value = fuel.ToString()
    });

    b.BoatAttributes.Add(new BoatAttribute()
    {
        Timestamp = DateTimeOffset.UtcNow,
        Type = BoatAttributeType._1,
        Value = alarmlevel.ToString()
    });
    return b;
}