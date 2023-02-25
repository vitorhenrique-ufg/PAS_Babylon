using RestSharp;

namespace AvatarBabylon.Web.Utils
{
    public static class APIHelper
    {
        //private static readonly RestClient _client = new("https://localhost:7208/");
        //private static readonly RestClient _client = new("http://localhost:5208/");
        private static readonly RestClient _client = new("http://host.docker.internal:5208/");

        public static RestClient ObtenhaClient() => _client;
    }
}
