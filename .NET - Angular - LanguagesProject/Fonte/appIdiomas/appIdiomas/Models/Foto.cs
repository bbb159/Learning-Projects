using System;

namespace appIdiomas.Models
{
    public class Foto
    {
        public int Id { get; set; }
        public string Url { get; set; }
        public string Description { get; set; }
        public DateTime AdicionadoEm { get; set; }
        public bool FotoPrincipal { get; set; }

        public Grupo Grupo { get; set; }
        public int GrupoId { get; set; }
    }
}