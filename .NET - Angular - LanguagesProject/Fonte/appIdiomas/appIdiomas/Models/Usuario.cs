using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace appIdiomas.Models
{
    public class Usuario
    {

        public int Id { get; set; }
        public string Nome { get; set; }
        public DateTime DataNascimento { get; set; }
        public string Genero { get; set; }
        public string Email { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
        public DateTime? CriadoEm { get; set; }
        public DateTime? VistoEm { get; set; }
        public string Cidade { get; set; }
        public string Estado { get; set; }
        public string Pais { get; set; }

        public ICollection<UsuariosGrupos> UsuariosGrupos { get; set; }

    }
}
