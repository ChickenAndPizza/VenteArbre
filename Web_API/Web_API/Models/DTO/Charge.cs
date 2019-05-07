using Stripe;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Web_API.Models.DTO
{
    public class Charge
    {
        public string CardName { get; set; }
        public string Email { get; set; }
        public string StripeToken { get; set; }
        public int Amount { get; set; }
    }
}
