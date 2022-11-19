USE [Carte]
GO
/****** Object:  StoredProcedure [dbo].[Schedules_Insert]    Script Date: 10/26/2022 4:45:49 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author: Chris Ivy
-- Create date: 10/21/2022
-- Description:	Insert into a schedule
-- Code Reviewer:
-- MODIFIED BY:
-- MODIFIED DATE:
-- Code Reviewer:
-- Note:
-- =============================================

CREATE proc  [dbo].[Schedules_Insert]
			
		 @Name nvarchar(100)
		,@OrganizationId int
		,@StartTime time(7)
		,@EndTime time(7)
		,@StartDate datetime2(7)
		,@EndDate datetime2(7)
		,@UserId int
		,@Id int OUTPUT


as

/* ------------TEST------------


DECLARE @RC int
DECLARE @Name nvarchar(100) = 'Discount LL'
DECLARE @OrganizationId int = 48
DECLARE @StartTime time(7) = '12:00'
DECLARE @EndTime time(7) = '11:59'
DECLARE @StartDate datetime2(7) = '04-01-2023'
DECLARE @EndDate datetime2(7) = '05-01-2023'
DECLARE @UserId int = 1
DECLARE @Id int 

-- TODO: Set parameter values here.

EXECUTE @RC = [dbo].[Schedules_Insert] 
   @Name
  ,@OrganizationId
  ,@StartTime
  ,@EndTime
  ,@StartDate
  ,@EndDate
  ,@UserId
  ,@Id OUTPUT



*/


BEGIN

DECLARE @CurrentDate datetime2(7) = GETUTCDATE()

INSERT INTO dbo.Schedules
			(
					Name
					,OrganizationId 
					,StartTime 
					,EndTime 
					,StartDate 
					,EndDate
					,CreatedBy
					,ModifiedBy
					,DateCreated
					,DateModified
			)

			VALUES (
					 @Name
					,@OrganizationId 
					,@StartTime 
					,@EndTime 
					,@StartDate 
					,@EndDate
					,@UserId
					,@UserId
					,@CurrentDate
					,@CurrentDate
					)
		
	SET @Id = SCOPE_IDENTITY()

END






GO
