---
title: Api
keywords: Admin portal, Api
last_updated: April 10, 2020
tags: [api]
summary: "This document outlines how to build the Admin api using .NET core 3.1"
sidebar: mydoc_sidebar
permalink: mydoc_api.html
folder: mydoc
---

## Requirements
- .NET Core 3.1 SDK or later
- MySql server (preferrably v8.0.19 or later) running with the database and tables already created

## 1. Create a aspnet core web api

```bash
dotnet new webapi -o AdminApi
```

## 2. Install Packages
```bash
dotnet add package Microsoft.EntityFrameworkCore.SqlServer
dotnet add package Pomelo.EntityFrameworkCore.MySql
dotnet add package Microsoft.EntityFrameworkCore.Design
dotnet add package Microsoft.VisualStudio.Web.CodeGeneration.Design
```

## 3. Install tools
```bash
dotnet tool install --global dotnet-ef
dotnet tool install --global dotnet-aspnet-codegenerator
```

## 4. Edit appsettings.json
Edit AdminApi/appsettings.json and add:
```json
"ConnectionStrings": {
    "HairDesignDB": "Server=localhost;Database=hair_project_db;User=dev_admin;Password=administrator;"
}
```


## 5. Scaffold database

```bash
dotnet ef dbcontext scaffold "Server=localhost;Database=hair_project_db;User=dev_admin;Password=administrator;TreatTinyAsBoolean=true;" "Pomelo.EntityFrameworkCore.MySql" -o Models
```

This create the Models folder with all classes and the database context.

## 6. Register the database context

Edit AdminApi/Startup.cs to register the database context

```c#

public void ConfigureServices(IServiceCollection services)
        {
            /****************************************************/
            /************** Register DB Context *****************/
            /*****************************************************/
            services.AddDbContext<hair_project_dbContext>(options =>
            options
            .UseMySql(Configuration.GetConnectionString("HairDesignDB"), mySqlOptions =>
            mySqlOptions
            .ServerVersion(new ServerVersion(new Version(5, 7, 24), ServerType.MySql))
            ));
            
            services.AddControllers();
        }
```


## 7. Scaffold Controllers
```bash
dotnet aspnet-codegenerator controller -name UsersController -async -api -m Users -dc hair_project_dbContext -outDir Controllers
dotnet aspnet-codegenerator controller -name UserFeaturesController -async -api -m UserFeatures -dc hair_project_dbContext -outDir Controllers
dotnet aspnet-codegenerator controller -name SkinTonesController -async -api -m SkinTones -dc hair_project_dbContext -outDir Controllers
dotnet aspnet-codegenerator controller -name SkinToneLinksController -async -api -m SkinToneLinks -dc hair_project_dbContext -outDir Controllers
dotnet aspnet-codegenerator controller -name HairStylesController -async -api -m HairStyles -dc hair_project_dbContext -outDir Controllers
dotnet aspnet-codegenerator controller -name HairStyleLinksController -async -api -m HairStyleLinks -dc hair_project_dbContext -outDir Controllers
dotnet aspnet-codegenerator controller -name HairLengthsController -async -api -m HairLengths -dc hair_project_dbContext -outDir Controllers
dotnet aspnet-codegenerator controller -name HairLengthLinksController -async -api -m HairLengthLinks -dc hair_project_dbContext -outDir Controllers
dotnet aspnet-codegenerator controller -name FaceShapesController -async -api -m FaceShapes -dc hair_project_dbContext -outDir Controllers
dotnet aspnet-codegenerator controller -name FaceShapeLinksController -async -api -m FaceShapeLinks -dc hair_project_dbContext -outDir Controllers
dotnet aspnet-codegenerator controller -name ColoursController -async -api -m Colours -dc hair_project_dbContext -outDir Controllers
```

## 8. Start the server

From the _AdminApi/_ directory, execute:

```bash
dotnet run
```

