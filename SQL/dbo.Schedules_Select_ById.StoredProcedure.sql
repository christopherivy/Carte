



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
