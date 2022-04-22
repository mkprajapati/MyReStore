using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace API.Controllers
{
    public class ProductsController : BaseApiController
    {
        private readonly StoreContext context;
        private readonly ILogger<ProductsController> logger;

        public ProductsController(StoreContext context,ILogger<ProductsController> logger)
        {
            this.context = context;
            this.logger = logger;
        }

      [HttpGet]
      public async Task<ActionResult<List<Product>>> GetProducts()
      {
          try
          {
              var products = await context.Products.ToListAsync();
              return Ok(products);
          }
          catch (Exception ex)
          {
              
              throw;
          }
      }


     [HttpGet("{id}")]
      public async Task<ActionResult<Product>> GetProduct(int id)
      {
          try
          {
              var product = await context.Products.FirstOrDefaultAsync(p => p.Id == id);
              if(product == null) return NotFound();
              return Ok(product);
          }
          catch (Exception ex)
          {
              
              throw;
          }
      }

    }
}