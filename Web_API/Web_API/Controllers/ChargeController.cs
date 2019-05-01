using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Stripe;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Web_API.Controllers.Base;
using Web_API.Models.DTO;

namespace Web_API.Controllers
{
    [Route("api/[controller]")]
    public class ChargeController : BaseSecuredController
    {
        readonly IConfiguration configuration;

        public ChargeController(IConfiguration configuration)
        {
            this.configuration = configuration;
        }

        [HttpPost]
        public ActionResult Create(Models.DTO.Charge charge, int amount)
        {
            StripeConfiguration.SetApiKey(configuration["SecretKey"]);

            var options = new ChargeCreateOptions
            {
                Amount = amount,
                Currency = "cad",
                Description = "Paiement pour " + charge.Email,
                SourceId = charge.StripeToken,
                ReceiptEmail = charge.Email
            };

            var service = new ChargeService();
            Stripe.Charge chargeStripe = service.Create(options);
            if(chargeStripe.Paid)
            {

            }
            return Ok();
        }
    }
}
