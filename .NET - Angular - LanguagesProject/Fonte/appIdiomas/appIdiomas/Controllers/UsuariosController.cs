using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using appIdiomas.Data;
using appIdiomas.Dtos;
using appIdiomas.Models;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace appIdiomas.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    public class UsuariosController : Controller
    {
        private readonly IAppRepository _repo;
        private readonly IMapper _mapper;

        public UsuariosController(IAppRepository repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }
        
        //GET api/usuarios
        [HttpGet]
        public async Task<IActionResult> GetUsers()
        {
            var users = await _repo.GetUsers();

            var usersToReturn = _mapper.Map<IEnumerable<UserForListDto>>(users);

            return Ok(usersToReturn);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetUser(int id)
        {
            var user = await _repo.GetUser(id);
            var userToReturn = _mapper.Map<UserForDetailDto>(user);

            return Ok(userToReturn);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(int id, [FromBody]UserForUpdateDto userForUpdateDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var currentUser = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

            var userFromRepo = await _repo.GetUser(id);

            if (userFromRepo == null)
                return NotFound($"Não encontrado usuario com ID {id}");

            if (currentUser != userFromRepo.Id)
                return Unauthorized();

            _mapper.Map(userForUpdateDto, userFromRepo);

            if (await _repo.SaveAll())
                return NoContent();

            throw new Exception($"A atualização do usuario com ID {id} falhou");

        }

        [HttpPost("{userId}/entrar/{groupId}")]
        public async Task<IActionResult> JoinGroup(int userId, int groupId)
        {
         
            var currentUser = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            if (currentUser != userId)
                return Unauthorized();

            var group = await _repo.GetGroup(groupId); // Verifica se o grupo existe
            if (group == null)
                return BadRequest("Grupo não existe");

            var userGroup = await _repo.GetUserGroup(userId, groupId); // Verifica se o usuario ja esta no grupo
            if (userGroup != null)
                return BadRequest("Você ja pertence a este grupo");

            userGroup = new UsuariosGrupos
            {
                UsuarioId = userId,
                GrupoId = groupId
            };

            _repo.Add<UsuariosGrupos>(userGroup);

            if (await _repo.SaveAll())
                return Ok();

            return BadRequest("Falha ao entrar no grupo");

        }


        [HttpPost("{userId}/sair/{groupId}")]
        public async Task<IActionResult> ExitGroup(int userId, int groupId)
        {
            var currentUser = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            if (currentUser != userId)
                return Unauthorized();

            var group = await _repo.GetGroup(groupId); // Verifica se o grupo existe
            if (group == null)
                return BadRequest("Grupo não existe");

            var userGroup = await _repo.GetUserGroup(userId, groupId); // Verifica se o usuario ja esta no grupo
            if (userGroup == null)
                return BadRequest("Você não pertence a este grupo");

            _repo.Delete<UsuariosGrupos>(userGroup);

            if (await _repo.SaveAll())
                return Ok();

            return BadRequest("Falha ao sair do grupo");

        }

        [HttpGet("{userId}/meusgrupos")]
        public async Task<IActionResult> MyGroups(int userId)
        {
            var user = await _repo.GetUser(userId);
            if (user == null)
                return BadRequest("Id usuário invalido");

            var groups = await _repo.GetUserGroupsAux(userId);
            var groupToReturn = _mapper.Map<IEnumerable<GroupForListDto>>(groups);

            //var groupsToReturn = _mapper.Map<IEnumerable<UserGroupDto>>(groups);

            return Ok(groupToReturn);
        }


    }
}