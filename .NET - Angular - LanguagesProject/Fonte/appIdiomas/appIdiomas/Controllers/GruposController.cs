using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using appIdiomas.Data;
using appIdiomas.Dtos;
using appIdiomas.Models;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace appIdiomas.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    public class GruposController : Controller
    {
        private readonly IAppRepository _repo;
        private readonly IMapper _mapper;

        public GruposController(IAppRepository repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }

        [HttpPost]
        public async Task<IActionResult> CreateGroup([FromBody]GroupForCreateDto groupForCreateDto)
        {
            if(!ModelState.IsValid)
                return BadRequest(ModelState);

            var groupToCreate = new Grupo
            {
                Cidade = groupForCreateDto.Cidade,
                Estado = groupForCreateDto.Estado,
                CodigoUsuarioLider = groupForCreateDto.CodigoUsuarioLider,
                Descricao = groupForCreateDto.Descricao,
                Nivel = groupForCreateDto.Nivel,
                Nome = groupForCreateDto.Nome,
                QuantidadeMembrosAtual = groupForCreateDto.QuantidadeMembrosAtual,
                QuantidadeMembrosMaxima = groupForCreateDto.QuantidadeMembrosMaxima,
                Fotos = groupForCreateDto.Fotos
            };

            _repo.Add<Grupo>(groupToCreate);

            if (await _repo.SaveAll())
                return StatusCode(201);

            return BadRequest("Falha ao criar grupo");
        }

        [HttpGet]
        public async Task<IActionResult> GetGrupos()
        {
            var groups = await _repo.GetGroups();

            var groupsToReturn = _mapper.Map<IEnumerable<GroupForListDto>>(groups);

            return Ok(groupsToReturn);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetGrupo(int id)
        {
            var group = await _repo.GetGroup(id);

            var groupToReturn = _mapper.Map<GroupForDetailDto>(group);

            return Ok(groupToReturn);
        }

        [HttpGet("{groupId}/participantes")]
        public async Task<IActionResult> UsersFromGroup(int groupId)
        {
            var group = await _repo.GetGroup(groupId);
            if (group == null)
                return BadRequest("Id grupo invalido");

            var users = await _repo.GetUsersFromGroupAux(groupId);
            var usersToReturn = _mapper.Map<IEnumerable<UserForListDto>>(users);

            return Ok(usersToReturn);
        }

    }
}