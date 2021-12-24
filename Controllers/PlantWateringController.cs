using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SVPlants.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PlantWateringController : ControllerBase
    {
        private static readonly string[] Names = new[]
        {
            "Agave", "Aloe vera", "Ball Cactus", "Crown of Thorns", "Jade Plant", "Easter Lily", "Burro's Tail", "Christmas Cactus", "Bunny Ear Cactus", "Jelly Bean Cactus"
        };

        private readonly ILogger<PlantWateringController> _logger;

        public PlantWateringController(ILogger<PlantWateringController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public IEnumerable<Plant> Get()
        {
            var rng = new Random();
            return Enumerable.Range(1, 5).Select(index => new Plant
            {
                Id = index,
                WateredDate = DateTime.Now.AddHours(-index * 2),
                NeedsWater = DateTime.Now.AddHours(-index * 2) <= DateTime.Now.AddHours(-6),
                Name = Names[rng.Next(Names.Length)]
            })
            .ToArray();
        }
    }
}