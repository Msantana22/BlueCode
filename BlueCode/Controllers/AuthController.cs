using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BlueCode.Data;
using BlueCode.Models;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;

namespace BlueCode.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AuthController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] Usuario UsuarioLogin)
        {
            try
            {
                var _usuario = await _context.Usuarios.FirstOrDefaultAsync(u => u.Nome == UsuarioLogin.Nome && u.Senha == UsuarioLogin.Senha);

                if (_usuario == null)
                {
                    return Unauthorized("Usuario ou senha invalidos !");
                }

                return Ok(new { IdUsuario = _usuario.IdUsuario });
            }
            catch (Exception ex)
            {
                throw new Exception($"Erro: {ex.Message}");
            }

        }

        [HttpPut("AlterarSenha/{id}")]
        public async Task<IActionResult> AlterarSenha(int id, [FromBody] Usuario usuario)
        {
            if (id != usuario.IdUsuario || !ModelState.IsValid)
            {
                return BadRequest();
            }

            _context.Entry(usuario).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                if (!_context.Usuarios.Any(e => e.IdUsuario == id))
                {
                    return NotFound();
                }
                else
                {
                    throw new Exception($"Erro: {ex.Message}");
                }
            }

            return NoContent();
        }

        [HttpGet("almoxarifado")]
        public async Task<ActionResult<IEnumerable<Almoxarifado>>> BuscarItens(bool ehTelaAlmoxarifadoFerramenta)
        {
            try
            {
                var _lstAlmoxarifado = await _context.Almoxarifado.Where(w => !w.EhControleFerramenta).ToListAsync();

                if(ehTelaAlmoxarifadoFerramenta)
                {
                    _lstAlmoxarifado = await _context.Almoxarifado.Where(w => w.EhControleFerramenta).ToListAsync();
                }

                return _lstAlmoxarifado;
            }
            catch (Exception ex)
            {
                throw new Exception($"Erro: {ex.Message}");
            }
        }

        [HttpPost("almoxarifado")]
        public async Task<IActionResult> AdicionarItem([FromBody] Almoxarifado almoxarifado)
        {
            try
            {
                _context.Almoxarifado.Add(almoxarifado);

                 await _context.SaveChangesAsync();

                return CreatedAtAction(nameof(BuscarItens), new { id = almoxarifado.IdAlmoxarifado }, almoxarifado);
            }
            catch (Exception ex)
            {
                throw new Exception($"Erro: {ex.Message}");
            }

        }

        [HttpPut("AlterarItem/{id}")]
        public async Task<IActionResult> AlterarItem(int id, [FromBody] Almoxarifado almoxarifado)
        {
            if (id != almoxarifado.IdAlmoxarifado || !ModelState.IsValid)
            {
                return BadRequest();
            }

            _context.Entry(almoxarifado).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                if (!_context.Almoxarifado.Any(e => e.IdAlmoxarifado == id))
                {
                    return NotFound();
                }
                else
                {
                    throw new Exception($"Erro: {ex.Message}");
                }
            }

            return NoContent();
        }      
       
        [HttpDelete("{id}")]
        public async Task<IActionResult> ExcluirProduto(int id)
        {
            var almoxarifado = await _context.Almoxarifado.FindAsync(id);
            if (almoxarifado == null)
            {
                return NotFound();
            }

            _context.Almoxarifado.Remove(almoxarifado);
            await _context.SaveChangesAsync();

            return Ok(almoxarifado);
        }


    }
}
