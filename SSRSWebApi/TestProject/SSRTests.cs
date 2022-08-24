using DomainLogic;
using SSRSWebApi.Domain;
using SSRSWebApi.Models;
using Xunit;

namespace TestProject
{
    public class SSRTests
    {
        [Fact]
        public void UpdateNonExistingBoat_ShallSucceed()
        {
            var storage = GetStorage();
            storage.Clear();
            var model = CreateMock();
            var subject = new UpdateBoatUseCase(storage);
            var result = subject.UpdateBoat(model);
            Assert.Equal("boat 12", result.Id);
            Assert.Equal("10", result.BoatAttributes.Last().Value);
        }
        [Fact]
        public void UpdateNonExistingBoat_ShallReturnOneAttribute()
        {
            var storage = GetStorage();
            storage.Clear();
            var model = CreateMock();
            var subject = new UpdateBoatUseCase(storage);
            var result = subject.UpdateBoat(model);
            Assert.Equal("boat 12", result.Id);
            Assert.Single(result.BoatAttributes);
        }
        [Fact]
        public void UpdateExistingBoat_ShallSucceed()
        {
            var storage = GetStorage();
            storage.Clear();
            var model = CreateMock();
            var subject = new UpdateBoatUseCase(storage);
            var _ = subject.UpdateBoat(model);
            model.BoatAttributes.Last().Value = "30";
            model.BoatAttributes.Last().Timestamp = DateTimeOffset.Now.AddSeconds(10);
            var result = subject.UpdateBoat(model);

            Assert.Equal("boat 12", result.Id);
            Assert.Equal("30", result.BoatAttributes.Last().Value);
        }
        [Fact]
        public void UpdateReadOnlyAttribute_ShallFail()
        {
            var storage = GetStorage();
            storage.Clear();
            var model = CreateMock();
            var updateBoatUseCase = new UpdateBoatUseCase(storage);
            var _ = updateBoatUseCase.UpdateBoat(model);
            var updateRequest = new SetAttributeRequest
            {                
                Attribute = new BoatAttribute
                {
                    Type = AttributeTypes.TankLevel,
                    Value = "80",
                    Timestamp = DateTimeOffset.Now
                },
                BoatId = "boat 12"
            };
            var subject = new UpdateAttributeUseCase(storage);
            var result = subject.UpdateAttribute(updateRequest);
            Assert.False(result);
        }
        [Fact]
        public void UpdateReadOnlyAttribute_ShallSucceed()
        {
            var storage = GetStorage();
            storage.Clear();
            var model = CreateMock();
            var updateBoatUseCase = new UpdateBoatUseCase(storage);
            var _ = updateBoatUseCase.UpdateBoat(model);
            var updateRequest = new SetAttributeRequest
            {
                Attribute = new BoatAttribute
                {
                    Type = AttributeTypes.AlarmLevel,
                    Value = "80",
                    Timestamp = DateTimeOffset.Now
                },
                BoatId = "boat 12"
            };
            var subject = new UpdateAttributeUseCase(storage);
            var result = subject.UpdateAttribute(updateRequest);
            Assert.True(result);
        }

        [Fact]
        public void UpdateReadOnlyAttributeWithOldTimestamp_ShallFail()
        {
            var storage = GetStorage();
            storage.Clear();
            var model = CreateMock();
            var updateBoatUseCase = new UpdateBoatUseCase(storage);
            var _ = updateBoatUseCase.UpdateBoat(model);
            var updateRequest = MockRequest(DateTimeOffset.Now.AddMinutes(-20));
            var subject = new UpdateAttributeUseCase(storage);
            var result = subject.UpdateAttribute(updateRequest);
            Assert.False(result);
        }
        [Fact]
        public void UpdateAttribute_ShallSucceed()
        {
            var storage = GetStorage();
            storage.Clear();
            var model = CreateMock();
            var updateBoatUseCase = new UpdateBoatUseCase(storage);
            var _ = updateBoatUseCase.UpdateBoat(model);
            var updateRequest = MockRequest(DateTimeOffset.Now.AddMinutes(20));
            var subject = new UpdateAttributeUseCase(storage);
            var result = subject.UpdateAttribute(updateRequest);
            Assert.True(result);
        }
        [Fact]
        public void UpdateAttributeWithOldTimestamp_ShallFail()
        {
            var storage = GetStorage();
            storage.Clear();
            var model = CreateMock();
            var updateBoatUseCase = new UpdateBoatUseCase(storage);
            var _ = updateBoatUseCase.UpdateBoat(model);
            var updateRequest = MockRequest(DateTimeOffset.Now.AddMinutes(-20));
            var subject = new UpdateAttributeUseCase(storage);
            var result = subject.UpdateAttribute(updateRequest);
            Assert.False(result);
        }
        [Fact]
        public void AddModelWithDuplicatedAttributes_ShallFilterAttributes()
        {
            var storage = GetStorage();
            storage.Clear();
            var model = CreateMock();
            model.BoatAttributes.Add(new BoatAttribute
            {
                Type = AttributeTypes.AlarmLevel,
                Value = "30",
                Timestamp = DateTimeOffset.Now
            });
            var updateBoatUseCase = new UpdateBoatUseCase(storage);
            var result = updateBoatUseCase.UpdateBoat(model);
            Assert.Single(result.BoatAttributes);
        }


        private BoatModel CreateMock()
        {
            var model = new BoatModel
            {
                Id = "boat 12",
                BoatAttributes = new List<BoatAttribute>
                {
                    new BoatAttribute
                    {
                        Type = AttributeTypes.TankLevel,
                        Value = "20",
                        Timestamp = DateTime.Now,
                    },
                    new BoatAttribute
                    {
                        Type = AttributeTypes.AlarmLevel,
                        Value = "10",
                        Timestamp = DateTime.Now,
                    },
                }
            };
            return model;
        }

        private SetAttributeRequest MockRequest(DateTimeOffset date)
        {
            var updateRequest = new SetAttributeRequest
            {
                Attribute = new BoatAttribute
                {
                    Type = AttributeTypes.AlarmLevel,
                    Value = "80",
                    Timestamp = date
                },
                BoatId = "boat 12"
            };
            return updateRequest;
        }

        private IInmemoryStorage GetStorage() => new InmemoryStorage();
    }
}