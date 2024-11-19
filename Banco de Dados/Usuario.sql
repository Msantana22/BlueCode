IF NOT EXISTS (SELECT * 
                 FROM INFORMATION_SCHEMA.TABLES 
                WHERE TABLE_SCHEMA = 'dbo' 
                  AND TABLE_NAME = 'Usuario')
  BEGIN

CREATE TABLE [dbo].[Usuario](
	  
		     IdUsuario   [INT]             NOT NULL,
		     Nome   	 [VARCHAR](30)     NOT NULL,
		     Senha 	     [VARCHAR](50)     NOT NULL,
	  
			  -- Primary key
			  CONSTRAINT [PkIdUsuario]
				 PRIMARY KEY ( [IdUsuario] )
					WITH FILLFACTOR = 90
					  ON [PRIMARY]
	)

		INSERT INTO dbo.Usuario VALUES(1,'Admin','46961191819')
		INSERT INTO dbo.Usuario VALUES(2,'Max','1234')
		INSERT INTO dbo.Usuario VALUES(3,'Samara','1234')

END

