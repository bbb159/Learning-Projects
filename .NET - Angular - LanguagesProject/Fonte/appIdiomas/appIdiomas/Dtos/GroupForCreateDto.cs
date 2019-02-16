using appIdiomas.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace appIdiomas.Dtos
{
    public class GroupForCreateDto
    {
        [Required]
        public string Nome { get; set; }

        [Required]
        public string Cidade { get; set; }

        [Required]
        public string Estado { get; set; }

        [Required]
        public string Descricao { get; set; }

        [Required]
        public int QuantidadeMembrosMaxima { get; set; }

        [Required]
        public int QuantidadeMembrosAtual { get; set; }

        [Required]
        public int CodigoUsuarioLider { get; set; }

        [Required]
        public int Nivel { get; set; }

        public ICollection<Foto> Fotos { get; set; }
    }
}
