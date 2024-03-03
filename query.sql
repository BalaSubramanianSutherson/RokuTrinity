//MSSQL 
CREATE TABLE trinityhub.dbo.users (
	email varchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	name varchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	password varchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	created_at datetime DEFAULT getdate() NOT NULL,
	CONSTRAINT PK__users__AB6E616515587A6A PRIMARY KEY (email)
);

CREATE TABLE trinityhub.dbo.mylist (
	email varchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	contents nvarchar(MAX) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	created_at datetime DEFAULT getdate() NULL,
	updated_at datetime DEFAULT getdate() NULL,
	CONSTRAINT PK__mylist__AB6E616569A7F7E5 PRIMARY KEY (email),
	CONSTRAINT FK_userId FOREIGN KEY (email) REFERENCES trinityhub.dbo.users(email)
);


CREATE TABLE trinityhub.dbo.playback (
	email varchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	content_id varchar(255),
	position varchar(255),
	created_at datetime DEFAULT getdate() NULL,
	CONSTRAINT PK__playback__AB6E616569A7F7E5 PRIMARY KEY (email, content_id),
	CONSTRAINT FK_playbacl_userId FOREIGN KEY (email) REFERENCES trinityhub.dbo.users(email)
);
