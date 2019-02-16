using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Threading.Tasks;

namespace appIdiomas.Models
{
    public class Grupo
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public string Cidade { get; set; }
        public string Estado { get; set; }
        public string Descricao { get; set; }
        public int QuantidadeMembrosMaxima { get; set; }
        public int QuantidadeMembrosAtual { get; set; }
        public int CodigoUsuarioLider { get; set; }
        public int Nivel { get; set; }

        public ICollection<Foto> Fotos { get; set; }

        public ICollection<UsuariosGrupos> UsuariosGrupos { get; set; }

        public Grupo()
        {
            Fotos = new Collection<Foto>();
        }
    }
}
