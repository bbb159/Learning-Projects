using appIdiomas.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace appIdiomas.Dtos
{
    public class GroupForDetailDto
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public string Cidade { get; set; }
        public string Estado { get; set; }
        public string Descricao { get; set; }
        public int QuantidadeMembrosMaxima { get; set; }
        public int QuantidadeMembrosAtual { get; set; }

        public string UrlFoto { get; set; }
        public ICollection<PhotosForDetailDto> Fotos { get; set; }
    }
}
