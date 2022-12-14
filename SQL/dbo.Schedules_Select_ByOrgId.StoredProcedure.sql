

CREATE proc [dbo].[Schedules_Select_ByOrgId]
							 @PageIndex int
							,@PageSize int
							,@OrganizationId int
							,@IsDeleted bit = 0

as

		 
/* ----TEST CODE -----


select *
from dbo.Schedules

Declare 
			 @PageIndex int = 0
			,@PageSize int = 5
			,@OrganizationId int = 48
			,@IsDeleted bit = 1

Execute [dbo].[Schedules_Select_ByOrgId]
					@PageIndex
				   ,@PageSize 
				   ,@OrganizationId 
				   ,@IsDeleted

*/


BEGIN
	DECLARE @Offset int = @PageIndex * @PageSize;



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
	  ,TotalCount = COUNT(1) OVER()

  FROM [dbo].[Schedules]

  WHERE OrganizationId = @OrganizationId
		AND IsDeleted = @IsDeleted

  ORDER BY DateCreated DESC

		Offset @Offset rows
		Fetch next @pageSize rows only

END
GO
