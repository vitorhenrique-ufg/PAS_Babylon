using RestSharp;

namespace AvatarBabylon.Web.Utils
{
    public static class APIHelper
    {
        private static readonly RestClient _client = new("https://localhost:7208/");

        public static RestClient ObtenhaClient() => _client;
    }
}
