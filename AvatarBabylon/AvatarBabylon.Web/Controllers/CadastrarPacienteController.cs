using AvatarBabylon.Web.Models;
using AvatarBabylon.Web.Utils;
using Microsoft.AspNetCore.Mvc;
using RestSharp;

namespace AvatarBabylon.Controllers
{
    public class CadastrarPacienteController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> Cadastrar([FromBody] PacienteModel paciente)
        {
            RestClient client = APIHelper.ObtenhaClient();
            RestRequest requisicao = new("Paciente", Method.Put);
            requisicao.AddJsonBody(paciente);

            await client.ExecuteAsync(requisicao);
            return Ok(new { });
        }
    }
}