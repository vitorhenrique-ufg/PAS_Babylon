using AvatarBabylon.Web.Models;
using AvatarBabylon.Web.Utils;
using Microsoft.AspNetCore.Mvc;
using RestSharp;
using System.Text.Json;

namespace AvatarBabylon.Controllers
{
    public class CadastrarPacienteController : Controller
    {
        private readonly ILogger _logger;
        public CadastrarPacienteController(ILogger<PacienteModel> logger)
        {
            _logger = logger;
        }

        public IActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> Cadastrar([FromBody] PacienteModel paciente)
        {
            try
            {
                RestClient client = APIHelper.ObtenhaClient();
                RestRequest requisicao = new("Paciente", Method.Put);
                requisicao.AddJsonBody(paciente);

                RestResponse resposta = await client.ExecuteAsync(requisicao);
                _logger.LogInformation($"Response Status Code: {JsonSerializer.Serialize(resposta.StatusCode)}");
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error: {ex}\nStackTrace: {ex.StackTrace}");
            }

            return Ok(new { });
        }
    }
}