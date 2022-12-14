using Sabio.Data;
using Sabio.Data.Providers;
using Sabio.Models;
using Sabio.Models.Domain;
using Sabio.Models.Domain.Discounts;
using Sabio.Models.Domain.Schedules;
using Sabio.Models.Requests.Schedules;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;

namespace Sabio.Services
{
    public class ScheduleDiscountService : IScheduleDiscountService
    {
        IDataProvider _data = null;
        public ScheduleDiscountService(IDataProvider data)
        {
            _data = data;
        }

        public Schedule GetById(int id)
        {
            string procName = "[dbo].[Schedules_Select_ById]";

            Schedule schedule = null;

            _data.ExecuteCmd(procName,
            inputParamMapper: delegate (SqlParameterCollection parameterCollection)
            {
                parameterCollection.AddWithValue("@Id", id);
            },
            singleRecordMapper: delegate (IDataReader reader, short set)
            {
                int startingIndex = 0;
                schedule = MapSingleSchedule(reader, ref startingIndex); // NEED ADDED PARAM HERE AFTER READER.
            });

            return schedule;
        }
        public void Delete(int id)
        {
            string procName = "[dbo].[Schedules_Delete_ById]";


            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection parameterCollection)
            {
                parameterCollection.AddWithValue("@Id", id);
            }, returnParameters: null);
        }
        public int Add(ScheduleAddRequest model, int userId)
        {
            int id = 0;

            string procName = "[dbo].[Schedules_Insert]";

            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {
                AddCommonParams(model, col, userId);

                SqlParameter idOut = new SqlParameter("@Id", SqlDbType.Int);
                idOut.Direction = ParameterDirection.Output;

                col.Add(idOut);

            },
            returnParameters: delegate (SqlParameterCollection returnCollection)
            {
                object oId = returnCollection["@Id"].Value;

                int.TryParse(oId.ToString(), out id);

            });

            return id;
        }
        public void Update(ScheduleUpdateRequest model, int userId) /*, int id*/
        {
            string procName = "[dbo].[Schedules_Update]";

            _data.ExecuteNonQuery(procName,
            inputParamMapper: delegate (SqlParameterCollection col)
            {
                AddCommonParams(model, col, userId);
                col.AddWithValue("@Id", model.Id);
            },
            returnParameters: null);
        }
        public Paged<Schedule> GetOrgId(int pageIndex, int pageSize, int id, bool isDeleted = false)
        {
            Paged<Schedule> pagedList = null;
            List<Schedule> list = null;
            int totalCount = 0;

            string procName = "[dbo].[Schedules_Select_ByOrgId]";

            _data.ExecuteCmd(procName, inputParamMapper: delegate (SqlParameterCollection parameterCollection)
            {
                parameterCollection.AddWithValue("@PageIndex", pageIndex);
                parameterCollection.AddWithValue("@PageSize", pageSize);
                parameterCollection.AddWithValue("@OrganizationId", id);
                parameterCollection.AddWithValue("@IsDeleted", isDeleted);

            }, singleRecordMapper: delegate (IDataReader reader, short set)
            {
                int startingIndex = 0;

                Schedule aSchedule = MapSingleSchedule(reader, ref startingIndex);
                
                if (totalCount == 0)
                {
                totalCount = reader.GetSafeInt32(startingIndex);
                }
               

                if (list == null)
                {
                    list = new List<Schedule>();
                }
                list.Add(aSchedule);
            });
            if (list != null)
            {
                pagedList = new Paged<Schedule>(list, pageIndex, pageSize, totalCount);
            }
            return pagedList;
        }
        public Paged<Schedule> GetCreatedBy(int pageIndex, int pageSize, int id)
        {
            Paged<Schedule> pagedList = null;
            List<Schedule> list = null;
            int totalCount = 0;

            string procName = "[dbo].[Schedules_Select_ByCreatedBy]";

            _data.ExecuteCmd(procName, inputParamMapper: delegate (SqlParameterCollection parameterCollection)
            {
                parameterCollection.AddWithValue("@PageIndex", pageIndex);
                parameterCollection.AddWithValue("@PageSize", pageSize);
                parameterCollection.AddWithValue("@CreatedBy", id);


            }, singleRecordMapper: delegate (IDataReader reader, short set)
            {
                int startingIndex = 0;

                Schedule aSchedule = MapSingleSchedule(reader, ref startingIndex);

                if (totalCount == 0)
                {
                    totalCount = reader.GetSafeInt32(startingIndex);
                }
               
                if (list == null)
                {
                    list = new List<Schedule>();
                }
                list.Add(aSchedule);
            });
            if (list != null)
            {
                pagedList = new Paged<Schedule>(list, pageIndex, pageSize, totalCount);
            }

            return pagedList;

        }
        public Paged<Schedule> SearchByCreatedBy(int pageIndex, int pageSize, int id, string query)
        {
            Paged<Schedule> pagedList = null;
            List<Schedule> list = null;
            int totalCount = 0;

            string procName = "[dbo].[Schedules_Search_ByCreatedBy]";

            _data.ExecuteCmd(procName, inputParamMapper: delegate (SqlParameterCollection parameterCollection)
            {
                parameterCollection.AddWithValue("@PageIndex", pageIndex);
                parameterCollection.AddWithValue("@PageSize", pageSize);
                parameterCollection.AddWithValue("@CreatedBy", id);
                parameterCollection.AddWithValue("@Query", query);


            }, singleRecordMapper: delegate (IDataReader reader, short set)
            {
                int startingIndex = 0;

                Schedule aSchedule = MapSingleSchedule(reader, ref startingIndex);

                if (totalCount == 0)
                {
                    totalCount = reader.GetSafeInt32(startingIndex);
                }

                if (list == null)
                {
                    list = new List<Schedule>();
                }
                list.Add(aSchedule);
            });
            if (list != null)
            {
                pagedList = new Paged<Schedule>(list, pageIndex, pageSize, totalCount);
            }

            return pagedList;

        }
        public Paged<Discount> GetByScheduleId(int pageIndex, int pageSize, int id)
        {  
            Paged<Discount> pagedList = null;
            List<Discount> list = null;
            int totalCount = 0;

            string procName = "[dbo].[Discounts_Select_ByScheduleId]";

            _data.ExecuteCmd(procName, inputParamMapper: delegate (SqlParameterCollection parameterCollection)
            {
                parameterCollection.AddWithValue("@PageIndex", pageIndex);
                parameterCollection.AddWithValue("@PageSize", pageSize);
                parameterCollection.AddWithValue("@ScheduleId", id);

            }, singleRecordMapper: delegate (IDataReader reader, short set)
            {
                int startingIndex = 0;

                Discount aDiscount = MapSingleDiscount(reader, ref startingIndex);

                if (totalCount == 0)
                {
                    totalCount = reader.GetSafeInt32(startingIndex);
                }
                


                if (list == null)
                {
                    list = new List<Discount>();
                }
                list.Add(aDiscount);
            });
            if (list != null)
            {
                pagedList = new Paged<Discount>(list, pageIndex, pageSize, totalCount);
            }

            return pagedList;

        }
        private static Schedule MapSingleSchedule(IDataReader reader, ref int startingIndex)
        {
            Schedule aSchedule;

            aSchedule = new Schedule()
            {
                Id = reader.GetSafeInt32(startingIndex++),
                Name = reader.GetSafeString(startingIndex++),
                OrganizationId = reader.GetSafeInt32(startingIndex++),
                StartTime = reader.GetSafeTimeSpan(startingIndex++),
                EndTime = reader.GetSafeTimeSpan(startingIndex++),
                StartDate = reader.GetSafeDateTime(startingIndex++),
                EndDate = reader.GetSafeDateTime(startingIndex++),
                IsDeleted = reader.GetSafeBool(startingIndex++),
                ModifiedBy = reader.GetSafeInt32(startingIndex++),
                CreatedBy = reader.GetSafeInt32(startingIndex++),
                DateCreated = reader.GetSafeDateTime(startingIndex++),
                DateModified = reader.GetSafeDateTime(startingIndex++)
            };
            return aSchedule;
        }
        private static Discount MapSingleDiscount(IDataReader reader, ref int startingIndex)
        {
            Discount discount = new Discount();
            Organization organization = new Organization();
            Location location = new Location();
            

            discount.Id = reader.GetSafeInt32(startingIndex++);
            discount.Name = reader.GetSafeString(startingIndex++);
            organization.Name = reader.GetSafeString(startingIndex++);
            discount.CouponCode = reader.GetSafeString(startingIndex++);
            discount.Description = reader.GetSafeString(startingIndex++);
            discount.ImageUrl = reader.GetSafeString(startingIndex++);
            discount.IsFixedDiscount = reader.GetSafeBool(startingIndex++);
            discount.PercentOrSavings = reader.GetSafeDecimal(startingIndex++);
            discount.MaxCount = reader.GetSafeInt32(startingIndex++);
            discount.IsPublished = reader.GetSafeBool(startingIndex++);
            discount.IsDeleted = reader.GetSafeBool(startingIndex++);
            discount.CreatedBy = reader.GetSafeInt32(startingIndex++);
            discount.ModifiedBy = reader.GetSafeInt32(startingIndex++);
            discount.DateCreated = reader.GetSafeDateTime(startingIndex++);
            discount.DateModified = reader.GetSafeDateTime(startingIndex++);

            return discount;
        }
        private static void AddCommonParams(ScheduleAddRequest model, SqlParameterCollection col, int userId)
        {
            //col.AddWithValue("@UserId", model.UserId);
            col.AddWithValue("@Name", model.Name);
            col.AddWithValue("@OrganizationId", model.OrganizationId);
            col.AddWithValue("@StartTime", model.StartTime);
            col.AddWithValue("@EndTime", model.EndTime);
            col.AddWithValue("@StartDate", model.StartDate);
            col.AddWithValue("@EndDate", model.EndDate);
            col.AddWithValue("@UserId", userId);
        }
    }
}



