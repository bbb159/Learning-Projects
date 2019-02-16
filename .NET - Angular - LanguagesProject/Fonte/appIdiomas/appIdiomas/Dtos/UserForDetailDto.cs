using appIdiomas.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace appIdiomas.Dtos
{
    public class UserForDetailDto
    {

        public int Id { get; set; }
        public string Nome { get; set; }
        public int Idade { get; set; }
        public char? Genero { get; set; }
        public string Email { get; set; }
        public DateTime? CriadoEm { get; set; }
        public DateTime? VistoEm { get; set; }
        public string Cidade { get; set; }
        public string Estado { get; set; }
        public string Pais { get; set; }

        public ICollection<UserGroupDto> UsuariosGrupos { get; set; }

    }
}
