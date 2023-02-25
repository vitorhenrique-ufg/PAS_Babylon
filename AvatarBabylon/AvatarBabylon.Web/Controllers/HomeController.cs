using AvatarBabylon.Web.Models;
using AvatarBabylon.Web.Utils;
using Microsoft.AspNetCore.Mvc;
using RestSharp;

namespace AvatarBabylon.Controllers
{
    public class HomeController : Controller
    {
        public async Task<IActionResult> Index()
        {
            RestClient client = APIHelper.ObtenhaClient();
            RestRequest requisicao = new("Paciente", Method.Get);
            RestResponse<List<PacienteModel>> resposta = await client.ExecuteAsync<List<PacienteModel>>(requisicao);

            HomeModel model = new()
            {
                Pacientes = resposta.IsSuccessful ? resposta.Data! : new()
            };

            return View(model);
        }
    }
}