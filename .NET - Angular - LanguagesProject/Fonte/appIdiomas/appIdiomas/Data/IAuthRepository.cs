using appIdiomas.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace appIdiomas.Data
{
    public interface IAuthRepository
    {
        Task<Usuario> Register(Usuario user, string password);
        Task<Usuario> Login(string email, string password);
        Task<bool> UserExists(string email);
    }
}
