using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Sabio.Services;
using Sabio.Web.Controllers;
using Sabio.Web.Models.Responses;
using System.Collections.Generic;
using System;
using Sabio.Models.Domain.Schedules;
using Sabio.Models.Requests.Schedules;
using Sabio.Models.Domain;
using Sabio.Models;
using Sabio.Models.Domain.Discounts;

namespace Sabio.Web.Api.Controllers
{
    [Route("api/schedule/discounts")]
    [ApiController]
    public class ScheduleDiscountApiController : BaseApiController
    {
        private IScheduleDiscountService _service = null;
        private IAuthenticationService<int> _authService = null;
        public ScheduleDiscountApiController(IScheduleDiscountService service
            , ILogger<ScheduleDiscountApiController> logger
            , IAuthenticationService<int> authService) : base(logger)
        {
            _service = service;
            _authService = authService;
        }

        [HttpGet("{id:int}")]
        public ActionResult<ItemsResponse<Schedule>> GetById(int id)
        {
            int iCode = 200;
            BaseResponse response = null;

            try
            {
                Schedule schedule = _service.GetById(id);

                if (schedule == null)
                {
                    iCode = 404;
                    response = new ErrorResponse("Application Resource not found.");
                }
                else
                {
                    response = new ItemResponse<Schedule> { Item = schedule };
                }
            }
            catch (Exception ex)
            {

                iCode = 500;
                response = new ErrorResponse($"Generic Error: {ex.Message}");
            }

            return StatusCode(iCode, response);
        }

        [HttpPut("delete/{id:int}")]
        public ActionResult<Schedule> Delete(int id)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                _service.Delete(id);

                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
            }

            return StatusCode(code, response);
        }

        [HttpPost]
        public ActionResult<ItemResponse<int>> Add(ScheduleAddRequest model)
        {

            ObjectResult result = null;

            try
            {

                int userId = _authService.GetCurrentUserId();

                int id = _service.Add(model, userId);
                ItemResponse<int> response = new ItemResponse<int>() { Item = id };

                result = Created201(response);
            }
            catch (Exception ex)
            {
                ErrorResponse response = new ErrorResponse(ex.Message);

                result = StatusCode(500, response);
            }
            return result;
        }

        [HttpPut("{id:int}")]
        public ActionResult<SuccessResponse> Update(ScheduleUpdateRequest model)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                int userId = _authService.GetCurrentUserId();

                _service.Update(model, userId);

                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
            }
            return StatusCode(code, response);
        }

        [HttpGet("organization/{id:int}")]
        public ActionResult<ItemResponse<Paged<Schedule>>> GetOrgId(int pageIndex, int pageSize, int id, bool isDeleted = false)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                Paged<Schedule> page = _service.GetOrgId(pageIndex, pageSize, id, isDeleted);

                if (page == null)
                {
                    code = 404;
                    response = new ErrorResponse("App Resource not found.");
                }
                else
                {
                    response = new ItemResponse<Paged<Schedule>> { Item = page };
                }
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
            }
            return StatusCode(code, response);
        }

        [HttpGet("createdBy")]
        public ActionResult<ItemResponse<Paged<Schedule>>> GetCreatedBy(int pageIndex, int pageSize)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                int userId = _authService.GetCurrentUserId();

                Paged<Schedule> page = _service.GetCreatedBy(pageIndex, pageSize, userId);

                if (page == null)
                {
                    code = 404;
                    response = new ErrorResponse("App Resource not found.");
                }
                else
                {
                    response = new ItemResponse<Paged<Schedule>> { Item = page };
                }
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
            }
            return StatusCode(code, response);
        }

        [HttpGet("search")]
        public ActionResult<ItemResponse<Paged<Schedule>>> SearchByCreatedBy(int pageIndex, int pageSize, string query)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                int userId = _authService.GetCurrentUserId();

                Paged<Schedule> page = _service.SearchByCreatedBy(pageIndex, pageSize, userId, query);

                if (page == null)
                {
                    code = 404;
                    response = new ErrorResponse("App Resource not found.");
                }
                else
                {
                    response = new ItemResponse<Paged<Schedule>> { Item = page };
                }
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
            }
            return StatusCode(code, response);
        }

        [HttpGet("schedule/{id:int}")]
        public ActionResult<ItemResponse<Paged<Discount>>> GetByScheduleId(int pageIndex, int pageSize, int id)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                Paged<Discount> page = _service.GetByScheduleId(pageIndex, pageSize, id);

                if (page == null)
                {
                    code = 404;
                    response = new ErrorResponse("App Resource not found.");
                }
                else
                {
                    response = new ItemResponse<Paged<Discount>> { Item = page };
                }
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
            }
            return StatusCode(code, response);
        }
    }
}



