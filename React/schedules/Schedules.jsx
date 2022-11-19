import React, { useState, useEffect, useCallback } from 'react';
import discountScheduleService from '../../services/discountScheduleService';
import debug from 'sabio-debug';
import { Link } from 'react-router-dom';
import ListSchedules from './ListSchedules';
import locale from 'rc-pagination/lib/locale/en_US';
import 'rc-pagination/assets/index.css';
import Pagination from 'rc-pagination';
import Swal from 'sweetalert2';
import toastr from 'toastr';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './schedule.css';

const searchSchema = Yup.object().shape({
    query: Yup.string(),
});

const _logger = debug.extend('Schedules');

function Schedules() {
    const [data, setData] = useState({ arrayOfSchedules: [], mappedSchedules: [] });
    const [id] = useState(0);

    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 12,
        totalCount: 0,
    });

    const [searchSchedules] = useState({
        query: '',
    });

    useEffect(() => {
        discountScheduleService
            .getByCreatedById(pagination.pageIndex, pagination.pageSize, id)
            .then(onGetSuccess)
            .catch(onGetError);
    }, [pagination.pageIndex]);

    const onGetSuccess = (response) => {
        const arrSchedules = response.item.pagedItems;

        setData((prev) => {
            const pd = { ...prev };
            pd.arrayOfSchedules = arrSchedules;

            pd.mappedSchedules = arrSchedules.map(mapSchedules);
            return pd;
        });

        setPagination((prevState) => {
            const newPage = { ...prevState };
            newPage.totalCount = response.item.totalCount;
            return newPage;
        });
    };

    const onScheduleSearch = (value) => {
        _logger('value', value.query.length);

        if (value.query.length) {
            discountScheduleService
                .searchByCreatedBy(0, 12, id, value.query)
                .then(searchScheduleSuccess)
                .catch(searchScheduleError);
        } else {
            discountScheduleService
                .getByCreatedById(pagination.pageIndex, pagination.pageSize, id)
                .then(onGetSuccess)
                .catch(onGetError);
        }
    };

    const searchScheduleSuccess = (data) => {
        setData((prevState) => {
            const searchSchedules = { ...prevState };
            searchSchedules.arrayOfSchedules = data.item.pagedItems;
            searchSchedules.mappedSchedules = data.item.pagedItems.map(mapSchedules);

            return searchSchedules;
        });
        setPagination((prevState) => {
            const newPage = { ...prevState };
            newPage.totalCount = data.item.totalCount;
            newPage.pageIndex = data.item.pageIndex;
            newPage.pageSize = data.item.pageSize;
            return newPage;
        });
    };

    const searchScheduleError = (data) => {
        _logger('search error', data);
        toastr.error('No matching schedules, please change field and try again');
    };

    const onGetError = (error) => {
        Swal.fire('Unable to retrieve schedules', error);
        _logger(error);
    };

    const onClick = useCallback((createdBy, eObj) => {
        _logger('deleteById', { createdBy, eObj });

        const handler = deleteSuccessHandler(createdBy.id);
        discountScheduleService.deleteSchedule(createdBy.id).then(handler).catch(onDeleteError);
    }, []);

    const mapSchedules = (aSchedule) => {
        return <ListSchedules schedule={aSchedule} key={aSchedule.id} onScheduleClicked={onClick}></ListSchedules>;
    };

    const deleteSuccessHandler = (id) => {
        return () => {
            setData((prev) => {
                const stateCopy = { ...prev };
                stateCopy.arrayOfSchedules = [...stateCopy.arrayOfSchedules];

                const idxOf = stateCopy.arrayOfSchedules.findIndex((schedule) => {
                    _logger(schedule);
                    let result = false;
                    if (schedule.id === id) {
                        result = true;
                    }
                    return result;
                });

                if (idxOf >= 0) {
                    stateCopy.arrayOfSchedules.splice(idxOf, 1);
                    stateCopy.mappedSchedules = stateCopy.arrayOfSchedules.map(mapSchedules);
                }

                return stateCopy;
            });
            _logger(id);
        };
    };

    const onDeleteError = (error) => {
        Swal.fire('Opps! Schedule was not deleted.');
        _logger(error);
    };

    const onPageChange = (page) => {
        setPagination((prevState) => {
            const newPage = { ...prevState };

            newPage.pageIndex = page - 1;

            return newPage;
        });
    };

    return (
        <div className="container">
            <div className="row mt-2 justify-content-between align-items-center">
                <div className="col">
                    <h3>Discount Schedules</h3>
                </div>
            </div>
            <div className="">
                <div className="row">
                    <div className="col">
                        <Link to="/schedule/add" className="btn btn-primary mx-2">
                            Add Schedule
                        </Link>

                        <Link to="/discount/schedules/calendar" className="btn btn-primary">
                            View Calendar
                        </Link>
                    </div>

                    <div className="col d-flex justify-content-center">
                        {
                            <Pagination
                                onChange={onPageChange}
                                current={pagination.pageIndex + 1}
                                total={pagination.totalCount}
                                pageSize={pagination.pageSize}
                                locale={locale}
                            />
                        }
                    </div>
                    <div className="col">
                        <Formik
                            enableReintialize={true}
                            initialValues={searchSchedules}
                            onSubmit={onScheduleSearch}
                            validationSchema={searchSchema}>
                            {({ submitForm, handleChange }) => (
                                <Form id="searchSchedule mx-2">
                                    <div className="scheduleSearchBar d-flex">
                                        <Field
                                            type="search"
                                            className="form-control"
                                            name="query"
                                            placeholder="Search..."
                                            onChange={(e) => {
                                                const target = e.target;
                                                const value = target.value;
                                                _logger('formik on change values', value);
                                                if (value.length === 0) {
                                                    submitForm();
                                                }
                                                handleChange(e);
                                            }}
                                        />
                                        <ErrorMessage className="has-error" name="query" component="div" />
                                        <button type="submit" className="btn btn-primary d-flex">
                                            Search
                                        </button>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
            <div className="  row d-flex g-4 h-100 mt-1">{data.mappedSchedules}</div>

            <div className=""></div>
            <div className="col">
                {
                    <Pagination
                        className="justify-content-center d-flex"
                        onChange={onPageChange}
                        current={pagination.pageIndex + 1}
                        total={pagination.totalCount}
                        pageSize={pagination.pageSize}
                        locale={locale}
                    />
                }
            </div>
        </div>
    );
}
export default Schedules;
