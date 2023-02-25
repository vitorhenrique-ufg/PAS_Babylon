using AvatarBabylon.Web.Models;
using AvatarBabylon.Web.Utils;
using Microsoft.AspNetCore.Mvc;
using RestSharp;
using System.Text.Json;

namespace AvatarBabylon.Controllers
{
    public class VisualizarPacienteController : Controller
    {
        private readonly ILogger _logger;
        public VisualizarPacienteController(ILogger<PacienteModel> logger)
        {
            _logger = logger;
        }

        public async Task<IActionResult> Index(int id)
        {
            try
            {
                RestClient client = APIHelper.ObtenhaClient();
                RestRequest requisicao = new("Paciente", Method.Get);
                RestResponse<List<PacienteModel>> resposta = await client.ExecuteAsync<List<PacienteModel>>(requisicao);

                _logger.LogInformation($"Response Status Code: {JsonSerializer.Serialize(resposta.StatusCode)}\nResponse data: {resposta.Data}");

                PacienteModel model = resposta.Data!.First(p => p.Id == id);
                return View(model);
            }
            catch(Exception ex)
            {
                _logger.LogError($"Error: {ex}\nStackTrace: {ex.StackTrace}");
                return View();
            }
            
        }
    }
}