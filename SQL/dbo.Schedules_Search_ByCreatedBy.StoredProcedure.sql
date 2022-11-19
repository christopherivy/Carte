USE [Carte]
GO
/****** Object:  StoredProcedure [dbo].[Schedules_Search_ByCreatedBy]    Script Date: 11/17/2022 11:32:30 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


-- =============================================
-- Author: Chris Ivy
-- Create date: 11/15/2022
-- Description:	Search for schedules.
-- Code Reviewer:
-- MODIFIED BY:
-- MODIFIED DATE:
-- Code Reviewer:
-- Note:
-- =============================================

CREATE proc [dbo].[Schedules_Search_ByCreatedBy]
							 @PageIndex int
							,@PageSize int
							,@CreatedBy int
							,@Query nvarchar(100)
						
as
		 
/* ----TEST CODE -----

select *
from dbo.Schedules

Declare 
			 @PageIndex int = 0
			,@PageSize int = 12
			,@CreatedBy int = 163
			,@Query nvarchar(100) = '2022-11-01'

Execute [dbo].[Schedules_Search_ByCreatedBy]
			 @PageIndex
			,@PageSize 
			,@CreatedBy 
			,@Query

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
  AND IsDeleted <> 1
  and ( 
	(Name LIKE '%' + @Query + '%') 
	--or (StartDate >=  @Query) 

	  )

		

  ORDER BY DateCreated DESC

		Offset @Offset rows
		Fetch next @pageSize rows only

END
GO
