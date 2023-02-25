namespace AvatarBabylon.Web.Models
{
    public class PacienteModel
    {
        public int Id { get; set; }

        public string? Nome { get; set; }

        public DateTime DataNascimento { get; set; }

        public decimal Altura { get; set; }

        public decimal Peso { get; set; }
    }
}
