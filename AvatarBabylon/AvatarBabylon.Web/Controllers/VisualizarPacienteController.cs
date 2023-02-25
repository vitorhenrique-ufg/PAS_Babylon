using AvatarBabylon.Web.Models;
using AvatarBabylon.Web.Utils;
using Microsoft.AspNetCore.Mvc;
using RestSharp;

namespace AvatarBabylon.Controllers
{
    public class VisualizarPacienteController : Controller
    {
        public async Task<IActionResult> Index(int id)
        {
            RestClient client = APIHelper.ObtenhaClient();
            RestRequest requisicao = new("Paciente", Method.Get);
            RestResponse<List<PacienteModel>> resposta = await client.ExecuteAsync<List<PacienteModel>>(requisicao);

            PacienteModel model = resposta.Data!.First(p => p.Id == id);
            return View(model);
        }
    }
}