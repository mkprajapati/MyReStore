using System;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class BasketController : BaseApiController
    {
        private readonly StoreContext context;
        public BasketController(StoreContext context)
        {
            this.context = context;

        }

       [HttpGet(Name="GetBasket")]
       public async Task<ActionResult<BasketDto>> GetBasket()
       {
           var basket = await RetrieveBasket();

           if(basket == null) return NotFound();

           return MapBasketToDto(basket);
           

       }

       [HttpPost]
       public async Task<ActionResult>  AddItemToBasket(int productId,int quantity)
       {
            var basket = await RetrieveBasket();

           if(basket == null) basket = CreateBasket();
           var product = await context.Products.FindAsync(productId);
           if(product == null) return BadRequest(new ProblemDetails{Title="Product Not Found"});
           basket.AddItem(product,quantity);
           var result = await context.SaveChangesAsync()>0;

           if(result) return CreatedAtRoute("GetBasket", MapBasketToDto(basket) );
           return BadRequest(new ProblemDetails{Title="Problem saving item to basket"});
       }


       [HttpDelete]
       public async Task<ActionResult>  RemoveBasketItem(int productId,int quantity)
       {
         var basket = await RetrieveBasket();
          var product = await context.Products.FindAsync(productId);
           if(product == null) return  BadRequest(new ProblemDetails{Title="Product Not Found"});;
           basket.RemoveItem(product,quantity);
           var result = await context.SaveChangesAsync()>0;

           if(result) return Ok();
           return BadRequest(new ProblemDetails{Title="Problem saving item to basket"});
       }

     private async Task<Basket> RetrieveBasket()
        {
            // if (string.IsNullOrEmpty(buyerId))
            // {
            //     Response.Cookies.Delete("buyerId");
            //     return null;
            // }

            return await context.Baskets
                .Include(i => i.Items)
                .ThenInclude(p => p.Product)
                .FirstOrDefaultAsync(x => x.BuyerId == Request.Cookies["buyerId"]);
        }

        private Basket CreateBasket()
        {
            
            var buyerId = Guid.NewGuid().ToString();
            var cookieOptions = new CookieOptions { IsEssential = true, Expires = DateTime.Now.AddDays(30) };
            Response.Cookies.Append("buyerId", buyerId, cookieOptions);
            var basket = new Basket { BuyerId = buyerId };
            context.Baskets.Add(basket);
            return basket;
        }

        private BasketDto MapBasketToDto(Basket basket)
        {
          return  new BasketDto{
               Id= basket.Id,
               BuyerId = basket.BuyerId,
               Items = basket.Items.Select(it => new BasketItemDto{
                   ProductId = it.ProductId,
                   Name = it.Product.Name,
                   Price = it.Product.Price,
                   PictureUrl = it.Product.PictureUrl,
                    Type = it.Product.Type,
                   Brand = it.Product.Brand,
                   Quantity = it.Quantity

               }).ToList()
           };
        }

    }
}