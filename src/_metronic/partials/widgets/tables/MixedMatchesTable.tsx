/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { KTIcon, toAbsoluteUrl } from '../../../helpers'

type Props = {
    className: string
}

const MixedMatchesTable: React.FC<Props> = ({ className }) => {
    return (
        <div className={`card ${className}`}>
            {/* begin::Header */}
            <div className='card-header border-0 pt-5'>

                <div
                    className='card-toolbar'
                    data-bs-toggle='tooltip'
                    data-bs-placement='top'
                    data-bs-trigger='hover'
                    title='Click to add a user'
                >
                    <a
                        href='#'
                        className='btn btn-sm btn-light-primary'
                    // data-bs-toggle='modal'
                    // data-bs-target='#kt_modal_invite_friends'
                    >
                        <KTIcon iconName='plus' className='fs-3' />
                        Add Team
                    </a>
                </div>
            </div>
            {/* end::Header */}
            {/* begin::Body */}
            <div className='card-body py-3'>
                {/* begin::Table container */}
                <div className='table-responsive'>
                    {/* begin::Table */}
                    <table className='table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4'>
                        {/* begin::Table head */}
                        <thead>
                            <tr className='fw-bold text-muted'>
                                <th className='w-25px'>
                                    <div className='form-check form-check-sm form-check-custom form-check-solid'>
                                        <input
                                            className='form-check-input'
                                            type='checkbox'
                                            value='1'
                                            data-kt-check='true'
                                            data-kt-check-target='.widget-9-check'
                                        />
                                    </div>
                                </th>
                                <th className='min-w-150px'>#</th>
                                <th className='min-w-150px'>Team</th>
                                <th className='min-w-140px'>P</th>
                                <th className='min-w-140px'>W</th>
                                <th className='min-w-140px'>D</th>
                                <th className='min-w-140px'>L</th>
                                <th className='min-w-120px'>Goals</th>
                                <th className='min-w-120px'>Last 5</th>
                                <th className='min-w-120px'>PTS</th>
                                {/* <th className='min-w-100px text-end'>Actions</th> */}
                            </tr>
                        </thead>
                        {/* end::Table head */}
                        {/* begin::Table body */}
                        <tbody>
                            <tr>
                                <td>
                                    <div className='form-check form-check-sm form-check-custom form-check-solid'>
                                        <input className='form-check-input widget-9-check' type='checkbox' value='1' />
                                    </div>
                                </td>
                                <td>
                                    <div className='d-flex align-items-center'>
                                        <div className='symbol symbol-45px me-5'>
                                            <img src={toAbsoluteUrl('/media/avatars/300-14.jpg')} alt='' />
                                        </div>
                                        <div className='d-flex justify-content-start flex-column'>
                                            <a href='#' className='text-dark fw-bold text-hover-primary fs-6'>
                                                Ana Simmons
                                            </a>

                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <a href='#' className='text-dark fw-bold text-hover-primary d-block fs-6'>
                                        Intertico
                                    </a>
                                    <span className='text-muted fw-semibold text-muted d-block fs-7'>
                                        Web, UI/UX Design
                                    </span>
                                </td>
                                <td className='text-end'>
                                    <div className='d-flex flex-column w-100 me-2'>
                                        <div className='d-flex flex-stack mb-2'>
                                            <span className='text-muted me-2 fs-7 fw-semibold'>50%</span>
                                        </div>
                                        <div className='progress h-6px w-100'>
                                            <div
                                                className='progress-bar bg-primary'
                                                role='progressbar'
                                                style={{ width: '50%' }}
                                            ></div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className='d-flex justify-content-end flex-shrink-0'>
                                        <a
                                            href='#'
                                            className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                                        >
                                            <KTIcon iconName='switch' className='fs-3' />
                                        </a>
                                        <a
                                            href='#'
                                            className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                                        >
                                            <KTIcon iconName='pencil' className='fs-3' />
                                        </a>
                                        <a
                                            href='#'
                                            className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm'
                                        >
                                            <KTIcon iconName='trash' className='fs-3' />
                                        </a>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                        {/* end::Table body */}
                    </table>
                    {/* end::Table */}
                </div>
                {/* end::Table container */}
            </div>
            {/* begin::Body */}
        </div>
    )
}

export { MixedMatchesTable }
