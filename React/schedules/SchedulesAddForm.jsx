import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import './schedule.css';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import scheduleSchema from '../../schemas/scheduleSchema';
import Swal from 'sweetalert2';
import debug from 'sabio-debug';
import discountScheduleService from '../../services/discountScheduleService';

const _logger = debug.extend('SchedulesAddForm');

const SchedulesAddForm = () => {
    const navigate = useNavigate();

    const [scheduleForm, setScheduleForm] = useState({
        name: '',
        organizationId: 48,
        startTime: '',
        endTime: '',
        startDate: '',
        endDate: '',
    });

    const { state } = useLocation();

    useEffect(() => {
        if (state?.type === 'Edit_Schedule' && state.payload) {
            setScheduleForm((prevState) => {
                const newScheduleUpdate = { ...prevState, ...state.payload };
                _logger('example', prevState);

                let newStartDate = newScheduleUpdate.startDate.replace('T00:00:00', '');
                let newEndDate = newScheduleUpdate.endDate.replace('T00:00:00', '');

                newScheduleUpdate.startDate = newStartDate;
                newScheduleUpdate.endDate = newEndDate;
                return newScheduleUpdate;
            });
        }
    }, [state]);

    const handleSubmit = (values) => {
        let payload = { ...values };

        payload.endTime = `${values.endTime}:00`;
        payload.startTime = `${values.startTime}:00`;

        if (!payload.id) {
            discountScheduleService.addSchedule(payload).then(onSuccess).catch(onError);
        } else {
            discountScheduleService.updateSchedule(payload).then(onSuccess).catch(onError);
        }
    };

    const onSuccess = (response) => {
        Swal.fire('Schedule Added.', response);
        navigate(`/discount/schedules`);
    };
    const onError = (error) => {
        Swal.fire('Schedule not added', error);
    };
    const GoBack = () => {
        navigate(`/discount/schedules`);
    };

    return (
        <div className="container ">
            <div className="row schedule-form">
                <h3 className="mt-2 mb-3 schedule-form">Create or Edit a Schedule</h3>

                <div className="col-4 ">
                    <Formik
                        enableReinitialize={true}
                        initialValues={scheduleForm}
                        onSubmit={handleSubmit}
                        validationSchema={scheduleSchema}>
                        <Form className="">
                            <div className="form-group">
                                <label htmlFor="name">Name:</label>
                                <Field type="text" name="name" className="form-control" />

                                <ErrorMessage name="name" component="div" className="has-error" />
                            </div>

                            <div className="form-group d-none">
                                <label htmlFor="organizationId">Organization Name:</label>
                                <Field type="text" name="organizationId" className="form-control" />
                                <ErrorMessage name="organizationId" component="div" className="has-error" />
                            </div>

                            <div className="form-group">
                                <label htmlFor="startTime">Start Time:</label>
                                <Field type="time" name="startTime" className="form-control" />
                                <ErrorMessage name="startTime" component="div" className="has-error" />
                            </div>

                            <div className="form-group">
                                <label htmlFor="endTime">End Time:</label>
                                <Field type="time" name="endTime" className="form-control" />
                                <ErrorMessage name="endTime" component="div" className="has-error" />
                            </div>

                            <div className="form-group">
                                <label htmlFor="startDate">Start Date:</label>
                                <Field type="date" name="startDate" className="form-control" />
                                <ErrorMessage name="startDate" component="div" className="has-error" />
                            </div>

                            <div className="form-group">
                                <label htmlFor="endDate">End Date:</label>
                                <Field type="date" name="endDate" className="form-control" />
                                <ErrorMessage name="endDate" component="div" className="has-error" />
                            </div>

                            <button type="submit" className="btn btn-primary my-3">
                                Submit
                            </button>

                            <Link to="/discount/schedules" className="btn btn-success mx-2" onClick={GoBack}>
                                Go Back
                            </Link>
                        </Form>
                    </Formik>
                    {/* <Calendar></Calendar> */}
                </div>
            </div>
            <div className="row"></div>
        </div>
    );
};

export default SchedulesAddForm;

/* 


f 

r



*/
