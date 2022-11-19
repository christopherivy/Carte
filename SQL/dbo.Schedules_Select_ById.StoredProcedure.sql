USE [Carte]
GO
/****** Object:  StoredProcedure [dbo].[Schedules_Select_ById]    Script Date: 10/26/2022 4:45:49 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


-- =============================================
-- Author: Chris Ivy
-- Create date: 10/21/2022
-- Description:	Select a schedule by the Id
-- Code Reviewer:
-- MODIFIED BY:
-- MODIFIED DATE:
-- Code Reviewer:
-- Note:
-- =============================================




CREATE proc [dbo].[Schedules_Select_ById]
					@Id int

as

		 
/* ----TEST CODE -----


select *
from dbo.Schedules

Declare @Id int = 1
Execute [dbo].[Schedules_Select_ById] @Id




*/


begin


SELECT [Id]
      ,[Name]
      ,[OrganizationId]
      ,[StartTime]
      ,[EndTime]
      ,[StartDate]
      ,[EndDate]
      ,[IsDeleted]
      ,[ModifiedBy]
      ,[CreatedBy]
      ,[DateCreated]
      ,[DateModified]
  FROM [dbo].[Schedules]
  WHERE Id = @Id

END
GO
