using appIdiomas.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace appIdiomas.Data
{
    public interface IAppRepository
    {
        void Add<T>(T entity) where T : class; // Adicionar um model qualquer no banco
        
        void Delete<T>(T entity) where T : class; // Remover um model qualquer do banco

        Task<IEnumerable<Usuario>> GetUsers(); // Retornar todos os usuarios

        Task<Usuario> GetUser(int id); // Retornar um usuario especifico a partir do 'ID'

        Task<IEnumerable<Grupo>> GetGroups(); // Retornar todos os grupos

        Task<Grupo> GetGroup(int id); // Retonar um grupo especifico a partir do 'ID'

        Task<UsuariosGrupos> GetUserGroup(int userId, int groupId); // Retorna linha da tabela UsuariosGrupos ou null

        Task<IEnumerable<UsuariosGrupos>> GetUserGroups(int userId); // Retorna grupos de um usuário

        Task<IEnumerable<Grupo>> GetUserGroupsAux(int userId);

        Task<IEnumerable<UsuariosGrupos>> GetUsersFromGroup(int groupId);

        Task<IEnumerable<Usuario>> GetUsersFromGroupAux(int groupId);

        Task<bool> SaveAll(); // Salvar todas as alteracoes no banco

    }
}
