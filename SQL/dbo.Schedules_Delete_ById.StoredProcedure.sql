USE [Carte]
GO
/****** Object:  StoredProcedure [dbo].[Schedules_Delete_ById]    Script Date: 10/26/2022 4:45:49 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author: Chris Ivy
-- Create date: 10/20/2022
-- Description:	Delete a schedule by the Id.
-- Code Reviewer:
-- MODIFIED BY:
-- MODIFIED DATE:
-- Code Reviewer:
-- Note:
-- =============================================

CREATE proc [dbo].[Schedules_Delete_ById]
				 @Id int
	as

	/* ---- TEST CODE ----

		DECLARE @Id int = 1;

		EXECUTE [dbo].[Schedules_Delete_ById] @Id

		SELECT * FROM Schedules
		WHERE Id = @Id

	*/


	Begin 

		UPDATE  [dbo].[Schedules] 
		SET IsDeleted = 1
		WHERE Id = @Id

	End 
GO
