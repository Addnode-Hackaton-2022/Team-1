﻿// See https://aka.ms/new-console-template for more information
using BoatAPI;

Console.WriteLine("Starting two boats, Ubåten and Tankaren");
var httpClient = new HttpClient();
var bac = new BoatAPIClient("https://ssrswebapi20220824153938.azurewebsites.net/", httpClient);

//Run forever
while (1 == 1)
{
    var fuel = 100;
    var b = new BoatModel();
    b.Id = "Ubåten";
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
        Value = "20"
    });

    var t = new BoatModel();
    t.Id = "Tankaren";
    t.BoatAttributes = new List<BoatAttribute>();
    t.BoatAttributes.Add(new BoatAttribute()
    {
        Timestamp = DateTimeOffset.UtcNow,
        Type = BoatAttributeType._0,
        Value = (100 - fuel).ToString()
    });

    t.BoatAttributes.Add(new BoatAttribute()
    {
        Timestamp = DateTimeOffset.UtcNow,
        Type = BoatAttributeType._1,
        Value = "20"
    });

    bac.UpdateAsync(b);
    bac.UpdateAsync(t);

    while (fuel > 0)
    {
        //Lower fuellevel
        fuel--;

        var bAttribute = b.BoatAttributes.Single(ba => ba.Type == BoatAttributeType._0);
        bAttribute.Value = fuel.ToString();
        bAttribute.Timestamp = DateTimeOffset.UtcNow;
        var tAttribute = t.BoatAttributes.Single(ba => ba.Type == BoatAttributeType._0);
        tAttribute.Value = (100 - fuel).ToString();
        tAttribute.Timestamp = DateTimeOffset.UtcNow;
        bac.UpdateAsync(b);
        bac.UpdateAsync(t);
        Console.WriteLine(fuel);
        Thread.Sleep(1000);
    }
}