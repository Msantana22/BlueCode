using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;

namespace BlueCode.Models
{
    [Table("Almoxarifado")]
    public class Almoxarifado
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("IdAlmoxarifado")]
        public int IdAlmoxarifado { get; set; }

        [Column("Cliente")]
        public string? Cliente { get; set; }

        [Required]
        [Column("Funcionario")]
        public string Funcionario { get; set; }
        
        [Required]
        [Column("Produto")]
        public string Produto { get; set; }
        
        [Required]
        [Column("DataEmissao")]
        public DateTime DataEmissao { get; set; }
        
        [Required]
        [Column("Quantidade")]
        public decimal Quantidade { get; set; }
        
        [Column("QuantidadeDevolvida")]
        public decimal? QuantidadeDevolvida { get; set; }

        [Column("DataDevolucao")]
        public DateTime? DataDevolucao { get; set; } 
        
        [Column("EhControleFerramenta")]
        public bool EhControleFerramenta { get; set; }        
    }
}
