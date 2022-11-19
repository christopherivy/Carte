// @flow
import React, { useEffect, useState } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import debug from 'sabio-debug';
import '@fullcalendar/react';
import classNames from 'classnames';
import discountScheduleService from '../../../services/discountScheduleService';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

// components
import PageTitle from './PageTitle';
import Calendar from './Calendar';

const _logger = debug.extend('ScheduleController');

let defaultEvents = [];

const SidePanel = () => {
    // external events
    const externalEvents = [];

    return (
        <>
            <div id="external-events" className="m-t-20">
                <br />
                <p className="text-muted"></p>

                {externalEvents.map((event, index) => {
                    return (
                        <div
                            key={index}
                            className={classNames('external-event', event.className + '-lighten', event.textClass)}
                            title={event.title}
                            data={event.className}>
                            <i className="mdi mdi-checkbox-blank-circle me-2 vertical-middle"></i>
                            {event.title}
                        </div>
                    );
                })}
            </div>

            <div className="mt-5 d-none d-xl-block d-none ">
                <h5 className="text-center">How It Works?</h5>

                <ul className="ps-3 ">
                    <li className="text-muted mb-3">
                        Click on <q>Manage Schedules</q> to add, update, delete a discount to the calendar.
                    </li>
                    <li className="text-muted mb-3">
                        {' '}
                        Click <q>Prev</q> and <q>Next</q> cycles through current views.
                    </li>
                    <li className="text-muted mb-3">
                        Select <q>Month, Week, Day, List</q> for alternate views.
                    </li>
                </ul>
            </div>
        </>
    );
};

type CalendarAppState = {
    isEditable?: boolean,
    events?: Array<any>,
    eventData?: any,
    dateInfo?: any,
};

const CalendarApp = (state: CalendarAppState): React$Element<React$FragmentType> => {
    const [id] = useState(0);

    const [pagination] = useState({
        pageIndex: 0,
        pageSize: 12,
        totalCount: 0,
    });

    _logger('state>>>', state);

    /*
     * event data
     */
    const [events, setEvents] = useState([...defaultEvents]);
    _logger('events>>>', events);

    useEffect(() => {
        discountScheduleService
            .getByCreatedById(pagination.pageIndex, pagination.pageSize, id)
            .then(onGetSuccess)
            .catch(onGetError);
    }, [pagination.pageIndex]);

    const onGetSuccess = (response) => {
        defaultEvents = response.item.pagedItems.map((schedule) => {
            _logger('START HERE>>>', Date.parse(schedule.startDate.replace('T', ' '), ' UTC'));
            _logger('END HERE>>>', Date.parse(schedule.endDate.replace('T', ' '), ' UTC'));

            return {
                id: schedule.id,
                title: schedule.name,
                start: Date.parse(schedule.startDate.replace('T', ' ', ' UTC')),
                end: Date.parse(schedule.endDate.replace('T', ' ', 'UTC')),
                className: 'bg-success',
            };
        });

        setEvents(defaultEvents);
    };

    const onGetError = (error) => {
        Swal.fire('Unable to retrieve schedules', error);
        _logger(error);
    };

    return (
        <>
            <PageTitle breadCrumbItems={[]} title={'Calendar'} />

            <Row>
                <Col>
                    <Card>
                        <Card.Body>
                            <Row>
                                <Col xl={3}>
                                    <div className="d-grid">
                                        <Link
                                            to="/discount/schedules"
                                            id="btn-new-event"
                                            className="btn btn-lg font-16 btn-danger">
                                            Manage Schedules
                                        </Link>
                                    </div>

                                    <SidePanel />
                                </Col>
                                <Col xl={9}>
                                    <Calendar events={events} />
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default CalendarApp;
