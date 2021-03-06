USE [testPoliza]
GO
/****** Object:  Table [dbo].[cliente]    Script Date: 2/4/20 3:46:02 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[cliente](
	[cliente_cedula] [int] NOT NULL,
	[cliente_nombre] [varchar](50) NOT NULL,
	[cliente_apellido] [varchar](50) NOT NULL,
	[cliente_email] [varchar](200) NOT NULL,
 CONSTRAINT [PK_cliente] PRIMARY KEY CLUSTERED 
(
	[cliente_cedula] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[poliza_encabezado]    Script Date: 2/4/20 3:46:08 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[poliza_encabezado](
	[id_poliza] [int] IDENTITY(1,1) NOT NULL,
	[nombre] [varchar](50) NOT NULL,
	[descripcion] [varchar](500) NOT NULL,
	[periodo_cobertura_meses] [int] NOT NULL,
	[precio_poliza] [numeric](18, 2) NOT NULL,
	[tipo_riesgo] [int] NOT NULL,
	[tipo_poliza] [int] NOT NULL,
 CONSTRAINT [PK_poliza_encabezado_1] PRIMARY KEY CLUSTERED 
(
	[id_poliza] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[poliza_x_cliente]    Script Date: 2/4/20 3:46:09 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[poliza_x_cliente](
	[cliente_cedula] [int] NOT NULL,
	[id_poliza] [int] NOT NULL,
	[inicio_vigencia] [datetime] NOT NULL,
 CONSTRAINT [PK_poliza_x_cliente] PRIMARY KEY CLUSTERED 
(
	[cliente_cedula] ASC,
	[id_poliza] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[seguridad_login]    Script Date: 2/4/20 3:46:09 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[seguridad_login](
	[usuario] [varchar](50) NOT NULL,
	[pass] [varchar](50) NOT NULL,
 CONSTRAINT [PK_seguridad_login] PRIMARY KEY CLUSTERED 
(
	[usuario] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tipo_poliza]    Script Date: 2/4/20 3:46:09 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tipo_poliza](
	[id_tipo] [int] IDENTITY(1,1) NOT NULL,
	[nombre] [varchar](50) NOT NULL,
	[porcentaje_cubrimiento] [numeric](9, 2) NOT NULL,
 CONSTRAINT [PK_tipo_poliza] PRIMARY KEY CLUSTERED 
(
	[id_tipo] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tipo_riesgo]    Script Date: 2/4/20 3:46:10 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tipo_riesgo](
	[id_riesgo] [int] IDENTITY(1,1) NOT NULL,
	[nombre] [varchar](50) NOT NULL,
 CONSTRAINT [PK_tipo_riesgo] PRIMARY KEY CLUSTERED 
(
	[id_riesgo] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
INSERT [dbo].[cliente] ([cliente_cedula], [cliente_nombre], [cliente_apellido], [cliente_email]) VALUES (304720192, N'Josue', N'Redondo Araya', N'josue.redondo2@gmail.com')
INSERT [dbo].[cliente] ([cliente_cedula], [cliente_nombre], [cliente_apellido], [cliente_email]) VALUES (304720193, N'Jesus', N'Redondo Araya', N'jesus.redondo2@gmail.com')
INSERT [dbo].[cliente] ([cliente_cedula], [cliente_nombre], [cliente_apellido], [cliente_email]) VALUES (304720194, N'Bill', N'Gates', N'bgates@hotmail.com')
SET IDENTITY_INSERT [dbo].[poliza_encabezado] ON 

INSERT [dbo].[poliza_encabezado] ([id_poliza], [nombre], [descripcion], [periodo_cobertura_meses], [precio_poliza], [tipo_riesgo], [tipo_poliza]) VALUES (1, N'Poliza de incendios', N'Esta poliza cubre los gastos generados por un incendio', 12, CAST(30000.00 AS Numeric(18, 2)), 2, 2)
INSERT [dbo].[poliza_encabezado] ([id_poliza], [nombre], [descripcion], [periodo_cobertura_meses], [precio_poliza], [tipo_riesgo], [tipo_poliza]) VALUES (2, N'Poliza de Terremoto', N'Esta poliza cubre los gastos generados por un terremoto', 12, CAST(30000.00 AS Numeric(18, 2)), 1, 1)
INSERT [dbo].[poliza_encabezado] ([id_poliza], [nombre], [descripcion], [periodo_cobertura_meses], [precio_poliza], [tipo_riesgo], [tipo_poliza]) VALUES (4, N'Poliza de perdida', N'Esta poliza cubre los gastos generados por una perdida', 12, CAST(30000.00 AS Numeric(18, 2)), 1, 1)
SET IDENTITY_INSERT [dbo].[poliza_encabezado] OFF
INSERT [dbo].[poliza_x_cliente] ([cliente_cedula], [id_poliza], [inicio_vigencia]) VALUES (304720192, 2, CAST(N'1900-01-01T00:00:00.000' AS DateTime))
INSERT [dbo].[seguridad_login] ([usuario], [pass]) VALUES (N'test', N'1234')
SET IDENTITY_INSERT [dbo].[tipo_poliza] ON 

INSERT [dbo].[tipo_poliza] ([id_tipo], [nombre], [porcentaje_cubrimiento]) VALUES (1, N'Terremoto', CAST(10.00 AS Numeric(9, 2)))
INSERT [dbo].[tipo_poliza] ([id_tipo], [nombre], [porcentaje_cubrimiento]) VALUES (2, N'Incendio', CAST(20.00 AS Numeric(9, 2)))
INSERT [dbo].[tipo_poliza] ([id_tipo], [nombre], [porcentaje_cubrimiento]) VALUES (3, N'Robo', CAST(55.00 AS Numeric(9, 2)))
INSERT [dbo].[tipo_poliza] ([id_tipo], [nombre], [porcentaje_cubrimiento]) VALUES (9, N'Perdida', CAST(80.00 AS Numeric(9, 2)))
SET IDENTITY_INSERT [dbo].[tipo_poliza] OFF
SET IDENTITY_INSERT [dbo].[tipo_riesgo] ON 

INSERT [dbo].[tipo_riesgo] ([id_riesgo], [nombre]) VALUES (1, N'Bajo')
INSERT [dbo].[tipo_riesgo] ([id_riesgo], [nombre]) VALUES (2, N'Medio')
INSERT [dbo].[tipo_riesgo] ([id_riesgo], [nombre]) VALUES (3, N'Medio-Alto')
INSERT [dbo].[tipo_riesgo] ([id_riesgo], [nombre]) VALUES (4, N'Alto')
SET IDENTITY_INSERT [dbo].[tipo_riesgo] OFF
ALTER TABLE [dbo].[poliza_x_cliente] ADD  CONSTRAINT [DF_poliza_x_cliente_inicio_vigencia]  DEFAULT ('1900-01-01') FOR [inicio_vigencia]
GO
ALTER TABLE [dbo].[poliza_encabezado]  WITH CHECK ADD  CONSTRAINT [FK_poliza_encabezado_poliza_riesgo] FOREIGN KEY([tipo_riesgo])
REFERENCES [dbo].[tipo_riesgo] ([id_riesgo])
GO
ALTER TABLE [dbo].[poliza_encabezado] CHECK CONSTRAINT [FK_poliza_encabezado_poliza_riesgo]
GO
ALTER TABLE [dbo].[poliza_encabezado]  WITH CHECK ADD  CONSTRAINT [FK_poliza_encabezado_poliza_tipo] FOREIGN KEY([tipo_poliza])
REFERENCES [dbo].[tipo_poliza] ([id_tipo])
GO
ALTER TABLE [dbo].[poliza_encabezado] CHECK CONSTRAINT [FK_poliza_encabezado_poliza_tipo]
GO
ALTER TABLE [dbo].[poliza_x_cliente]  WITH CHECK ADD  CONSTRAINT [FK_poliza_x_cliente_cliente] FOREIGN KEY([cliente_cedula])
REFERENCES [dbo].[cliente] ([cliente_cedula])
GO
ALTER TABLE [dbo].[poliza_x_cliente] CHECK CONSTRAINT [FK_poliza_x_cliente_cliente]
GO
ALTER TABLE [dbo].[poliza_x_cliente]  WITH CHECK ADD  CONSTRAINT [FK_poliza_x_cliente_poliza] FOREIGN KEY([id_poliza])
REFERENCES [dbo].[poliza_encabezado] ([id_poliza])
GO
ALTER TABLE [dbo].[poliza_x_cliente] CHECK CONSTRAINT [FK_poliza_x_cliente_poliza]
GO
ALTER TABLE [dbo].[tipo_riesgo]  WITH CHECK ADD  CONSTRAINT [FK_tipo_riesgo_tipo_riesgo] FOREIGN KEY([id_riesgo])
REFERENCES [dbo].[tipo_riesgo] ([id_riesgo])
GO
ALTER TABLE [dbo].[tipo_riesgo] CHECK CONSTRAINT [FK_tipo_riesgo_tipo_riesgo]
GO
