﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Requests.Schedules
{
    public class ScheduleUpdateRequest : ScheduleAddRequest, IModelIdentifier
    {
        public int Id { get; set; }
    }
}
