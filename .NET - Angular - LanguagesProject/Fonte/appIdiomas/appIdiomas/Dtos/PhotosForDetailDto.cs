using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace appIdiomas.Dtos
{
    public class PhotosForDetailDto
    {
        public int Id { get; set; }
        public string Url { get; set; }
        public string Description { get; set; }
        public DateTime AdicionadoEm { get; set; }
        public bool FotoPrincipal { get; set; }
    }
}
