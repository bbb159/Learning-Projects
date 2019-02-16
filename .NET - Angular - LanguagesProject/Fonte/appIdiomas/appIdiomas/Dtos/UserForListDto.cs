using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace appIdiomas.Dtos
{
    public class UserForListDto
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public string Email { get; set; }
        public int Idade { get; set; }
        public char? Genero { get; set; }        
        public DateTime? CriadoEm { get; set; }
        public DateTime? VistoEm { get; set; }
        public string Cidade { get; set; }
    }
}
