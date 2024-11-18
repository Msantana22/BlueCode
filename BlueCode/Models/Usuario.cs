using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BlueCode.Models
{
    [Table("Usuario")] 
    public class Usuario
    {
        [Key]
        [Column("IdUsuario")] 
        public int IdUsuario { get; set; }

        [Required]
        [Column("Nome")] 
        public string Nome { get; set; }

        [Required]
        [Column("Senha")]
        public string Senha { get; set; }
    }
}
