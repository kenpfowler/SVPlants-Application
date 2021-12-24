using System;

namespace SVPlants
{
    public class Plant
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public DateTime WateredDate { get; set; }

        public bool NeedsWater { get; set; }
    }
}