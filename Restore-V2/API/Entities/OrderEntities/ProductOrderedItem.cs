using Microsoft.EntityFrameworkCore;

namespace API.Entities.OrderEntities
{
    [Owned]
    public class ProductItemOrdered
    {
        public int ProductId { get; set; }       
        public string Name { get; set; }
        public string PictureUrl { get; set; }
    }
}