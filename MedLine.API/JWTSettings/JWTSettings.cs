﻿namespace MedLine.API.JWTSettings
{
    public class JWTSettings
    {
        public string SecretKey{ get; set; }
        public string Issuer { get; set; }
        public string Audience { get; set; }
    }
}
