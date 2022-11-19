

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
