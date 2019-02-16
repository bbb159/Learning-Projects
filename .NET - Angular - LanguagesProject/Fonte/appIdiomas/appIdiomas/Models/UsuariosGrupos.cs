using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace appIdiomas.Models
{
    public class UsuariosGrupos
    {
        public int UsuarioId { get; set; }
        public int GrupoId { get; set; }

        public Usuario Usuario { get; set; }
        public Grupo Grupo { get; set; }

    }
}
