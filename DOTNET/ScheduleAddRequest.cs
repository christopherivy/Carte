using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Requests.Schedules
{
    public class ScheduleAddRequest
    {
        [Required]
        [StringLength(maximumLength: 100)]
        public string Name { get; set; }

        [Required]
        [Range(1, Int32.MaxValue)]
        public int OrganizationId { get; set; }

        [Required]
        public TimeSpan StartTime { get; set; }

        [Required]
        public TimeSpan EndTime { get; set; }

        [Required]
        public DateTime StartDate { get; set; }

        [Required]
        public DateTime EndDate { get; set; }
    }
}
