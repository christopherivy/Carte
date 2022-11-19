import React from 'react';
import PropTypes from 'prop-types';
import debug from 'sabio-debug';
import { useNavigate } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';
import { MdDeleteForever } from 'react-icons/md';
import { TiPencil } from 'react-icons/ti';

const _logger = debug.extend('ListSchedules');

const ListSchedules = (props) => {
    _logger('props', props);
    const schedule = props.schedule;
    schedule.startDate = schedule.startDate.replace('T00:00:00', '');
    schedule.endDate = schedule.endDate.replace('T00:00:00', '');

    const navigate = useNavigate();

    function onDeleteSchedule(e) {
        e.preventDefault();

        props.onScheduleClicked(schedule, e);
    }

    const onEditClicked = () => {
        navigateToForm(schedule);
    };

    const navigateToForm = (schedule) => {
        const state = { type: 'Edit_Schedule', payload: schedule };
        navigate(`/schedule/edit/${schedule.id}`, { state: state });
    };

    return (
        <Card className="col-3">
            <Card.Body className={schedule.name ? 'position-relative' : ''}>
                <div>
                    <h4 className="mb-1">{schedule.name}</h4>
                    <div className="mx-2">
                        <p className="mb-1">Start Time: {schedule.startTime}</p>
                        <p className="mb-1">End Time: {schedule.endTime}</p>
                        <p className="mb-1">Start Date: {schedule.startDate}</p>
                        <p className="mb-3">End Date: {schedule.endDate}</p>
                    </div>
                </div>
                <div className="d-flex justify-content-center mt-2">
                    <Button
                        variant="primary"
                        className="btn btn-primary mb-3 mt-1 mx-2"
                        data-page={schedule}
                        onClick={onEditClicked}>
                        <TiPencil /> Edit
                    </Button>
                    <Button variant="danger" className="btn btn-primary mb-3 mt-1 mx-.5" onClick={onDeleteSchedule}>
                        <MdDeleteForever /> Delete
                    </Button>
                </div>
            </Card.Body>
        </Card>
    );
};

ListSchedules.propTypes = {
    schedule: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        organizationId: PropTypes.number.isRequired,
        dateCreated: PropTypes.string.isRequired,
        dateModified: PropTypes.string.isRequired,
        startTime: PropTypes.string.isRequired,
        endTime: PropTypes.string.isRequired,
        startDate: PropTypes.string.isRequired,
        endDate: PropTypes.string.isRequired,
    }),
    onScheduleClicked: PropTypes.func.isRequired,
};

export default ListSchedules;
