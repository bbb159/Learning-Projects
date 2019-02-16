using appIdiomas.Dtos;
using appIdiomas.Models;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace appIdiomas.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<Usuario, UserForListDto>()
                .ForMember(dest => dest.Idade, opt =>
                {
                    opt.ResolveUsing(d => d.DataNascimento.CalculateAge());
                });
                
            CreateMap<Usuario, UserForDetailDto>()
                .ForMember(dest => dest.Idade, opt =>
                {
                    opt.ResolveUsing(d => d.DataNascimento.CalculateAge());
                });

            CreateMap<Foto, PhotosForDetailDto>();

            CreateMap<Grupo, GroupForListDto>()
                .ForMember(dest => dest.UrlFoto, opt =>
                {
                    opt.MapFrom(src => src.Fotos.FirstOrDefault(f => f.FotoPrincipal).Url);
                });

            CreateMap<Grupo, GroupForDetailDto>()
                .ForMember(dest => dest.UrlFoto, opt =>
                {
                    opt.MapFrom(src => src.Fotos.FirstOrDefault(f => f.FotoPrincipal).Url);
                });

            CreateMap<UsuariosGrupos, UserGroupDto>();

            CreateMap<UserForUpdateDto, Usuario>();
        }
    }
}
