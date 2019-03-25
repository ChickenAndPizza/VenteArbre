﻿using Web_API.Models.Base;

namespace Web_API.Models
{
    public class ConnectionValidation : BaseModel
    {
        public string Username { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string Password { get; set; }
        public bool IsAdmin { get; set; }
        public string token { get; set; }
    }
}
