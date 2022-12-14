

CREATE proc [dbo].[Schedules_Select_ByCreatedBy]
							 @PageIndex int
							,@PageSize int
							,@CreatedBy int
						

as

		 
/* ----TEST CODE -----


select *
from dbo.Schedules

Declare 
			 @PageIndex int = 0
			,@PageSize int = 5
			,@CreatedBy int = 1

Execute [dbo].[Schedules_Select_ByCreatedBy]
			 @PageIndex
			,@PageSize 
			,@CreatedBy int

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

  WHERE CreatedBy = @CreatedBy
		

  ORDER BY DateCreated DESC

		Offset @Offset rows
		Fetch next @pageSize rows only

END
GO
