using System.Collections.Generic;
using System.Linq;

namespace API.Entities
{
    public class Basket
    {
        public int Id { get; set; }
        public string BuyerId { get; set; }
        public List<BasketItem> Items { get; set; } = new();

        public void AddItem(Product product, int quantity){
            if(Items.All(item=> item.ProductId != product.Id))
            {
                Items.Add(new BasketItem{Product=product,Quantity= quantity});
            }
            else
            {
                var item = Items.FirstOrDefault(p => p.ProductId==product.Id);
                item.Quantity+=quantity;
               // Items.Update(item);
            }
    }

      public void RemoveItem(Product product, int quantity){
              var item = Items.FirstOrDefault(p => p.ProductId==product.Id);
              if(item == null) return;

              item.Quantity-=quantity;
              if(item.Quantity == 0) Items.Remove(item); 
               // Items.Update(item);
            
    }

}
}