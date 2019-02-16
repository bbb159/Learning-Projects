using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using appIdiomas.Models;
using Microsoft.EntityFrameworkCore;

namespace appIdiomas.Data
{
    public class AppRepository : IAppRepository
    {
        private readonly DataContext _context;

        public AppRepository(DataContext context)
        {
            _context = context;
        }

        public void Add<T>(T entity) where T : class
        {
            _context.Add(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }

        public async Task<Usuario> GetUser(int id)
        {
            var user = await _context.Usuarios.Include(ug => ug.UsuariosGrupos).FirstOrDefaultAsync(u => u.Id == id);

            return user;
        }

        public async Task<IEnumerable<Usuario>> GetUsers()
        {
            var users = await _context.Usuarios.ToListAsync();

            return users;
        }

        public async Task<Grupo> GetGroup(int id)
        {
            var group = await _context.Grupos.Include(f => f.Fotos).FirstOrDefaultAsync(g => g.Id == id);

            return group;
        }

        public async Task<IEnumerable<Grupo>> GetGroups()
        {
            var groups = await _context.Grupos.Include(f => f.Fotos).ToListAsync();

            return groups;
        }

        public async Task<UsuariosGrupos> GetUserGroup(int userId, int groupId)
        {
            return await _context.UsuariosGrupos.FirstOrDefaultAsync(u => u.UsuarioId == userId && u.GrupoId == groupId);
        }

        public async Task<IEnumerable<UsuariosGrupos>> GetUserGroups(int userId) //VER ISSO DPS
        {

            var user = await _context.Usuarios
                .Include(u => u.UsuariosGrupos)
                .FirstOrDefaultAsync(u => u.Id == userId);

            return user.UsuariosGrupos.Where(ug => ug.UsuarioId == userId);
            
        }

        public async Task<IEnumerable<Grupo>> GetUserGroupsAux(int userId) //VER ISSO DPS
        {
            var groups = await GetUserGroups(userId);
            var group = _context.Grupos.Include(ug => ug.UsuariosGrupos).AsQueryable();
            group = group.Where(u => u.UsuariosGrupos.Any(x => x.UsuarioId == userId));

            return group;
        }

        public async Task<IEnumerable<UsuariosGrupos>> GetUsersFromGroup(int groupId)
        {

            var group = await _context.Grupos
                .Include(g => g.UsuariosGrupos)
                .FirstOrDefaultAsync(u => u.Id == groupId);

            return group.UsuariosGrupos.Where(ug => ug.GrupoId == groupId);

        }

        public async Task<IEnumerable<Usuario>> GetUsersFromGroupAux(int groupId)
        {
            var users = await GetUsersFromGroup(groupId);
            var user = _context.Usuarios.Include(ug => ug.UsuariosGrupos).AsQueryable();
            user = user.Where(u => u.UsuariosGrupos.Any(x => x.GrupoId == groupId));

            return user;
        }


        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0;
        }
    }
}
