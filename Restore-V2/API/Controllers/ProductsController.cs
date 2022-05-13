using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Entities;
using API.Extensions;
using API.RequestHelpers;
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
      public async Task<ActionResult<List<Product>>> GetProducts([FromQuery] ProductParams productParams)
      {
          try
          {
            var query = context.Products
                .Sort(productParams.OrderBy)
                .Search(productParams.SearchTerm)
                .Filter(productParams.Brands, productParams.Types)
                .AsQueryable();

            var products = await PagedList<Product>.ToPagedList(query,
                productParams.PageNumber, productParams.PageSize);

            Response.AddPaginationHeader(products.MetaData);

            return products;
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

       [HttpGet("filters")]
        public async Task<IActionResult> GetFilters()
        {
            var brands = await context.Products.Select(p => p.Brand).Distinct().ToListAsync();
            var types = await context.Products.Select(p => p.Type).Distinct().ToListAsync();

            return Ok(new { brands, types });
        }

    }
}