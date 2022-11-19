USE [Carte]
GO
/****** Object:  StoredProcedure [dbo].[Schedules_Update]    Script Date: 10/26/2022 4:45:49 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


-- =============================================
-- Author: Chris Ivy
-- Create date: 10/21/2022
-- Description:	Update the schedule
-- Code Reviewer:
-- MODIFIED BY:
-- MODIFIED DATE:
-- Code Reviewer:
-- Note:
-- =============================================

CREATE proc  [dbo].[Schedules_Update]
			
		 @Id int
		,@Name nvarchar(100)
		,@OrganizationId int
		,@StartTime time(7)
		,@EndTime time(7)
		,@StartDate datetime2(7)
		,@EndDate datetime2(7)
		,@UserId int
	



as

/* ------------TEST------------

Declare 
			
		 @Id int = 1
		,@Name nvarchar(100) = 'Chris Discount'
		,@OrganizationId int = 1
		,@StartTime time(7) = '12:00'
		,@EndTime time(7) = '11:59'
		,@StartDate datetime2(7) = '04-01-2023'
		,@EndDate datetime2(7) = '04-01-2023'
		,@UserId int = 1

Execute  [dbo].[Schedules_Update]
				
		 @Id 
		,@Name 
		,@OrganizationId 
		,@StartTime 
		,@EndTime
		,@StartDate 
		,@EndDate 
		,@UserId 

*/



BEGIN

UPDATE dbo.Schedules
SET Name = 
		@Name
		,OrganizationId = @OrganizationId
		,StartTime = @StartTime 
		,EndTime = @EndTime 
		,StartDate = @StartDate 
		,EndDate = @EndDate 
		,ModifiedBy = @UserId 
		,DateModified = GETUTCDATE()
	
	WHERE Id = @Id
 

END






GO
