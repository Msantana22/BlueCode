IF NOT EXISTS (SELECT * 
                 FROM INFORMATION_SCHEMA.TABLES 
                WHERE TABLE_SCHEMA = 'dbo' 
                  AND TABLE_NAME = 'Almoxarifado')
  BEGIN

 CREATE TABLE [dbo].[Almoxarifado] (
		
		      IdAlmoxarifado         [INT] IDENTITY(1,1) PRIMARY KEY  NOT NULL,
		      Cliente                [VARCHAR](200)       NULL,
		      Funcionario            [VARCHAR](100)   NOT NULL,
			  Produto                [VARCHAR](500)   NOT NULL,
		      DataEmissao            [DATETIME]       NOT NULL,
		      Quantidade             [DECIMAL](20,10) NOT NULL,
		      QuantidadeDevolvida    [DECIMAL](20,10)     NULL,
		      DataDevolucao          [DATETIME]           NULL,
			  EhControleFerramenta   [BIT]            NOT NULL
			  )
END


