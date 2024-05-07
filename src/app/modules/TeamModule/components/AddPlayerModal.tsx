import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import React, { useState } from 'react'
import { toAbsoluteUrl } from '../../../../_metronic/helpers'
import * as Yup from 'yup'
import { ErrorMessage, Field, useFormikContext } from 'formik'
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import { addSubtitute } from "../../../../redux/slices/subtitutesSlice";
import { useAppDispatch } from '../../../../redux/hooks/UseAppDispatch';
import { addPlayer } from '../../../../services/PlayerService';
import Player from '../../../../models/Player';
import { useSelector } from 'react-redux';
import { setPopulatedTeams } from '../../../../redux/slices/teamsSlice';
import { selectTeamReducer } from '../../../../redux/slices/teamsSlice';
import { updateTeam } from '../../../../services/TeamService';

const MAX_SIZE = 500000;






interface FormValues {

    firstName: string;
    lastName: string;
    playerNumber: string;
    age: string;
    height: string;
    avatar?: File;
    phoneNumber: string
    email: string
    country: string
    position: string

}





function AddPlayerModal({ showAddPlayer, handleCloseModal }) {

    const teams = useSelector((state: any) => state.teams.teams);
    const selectedTeam = useSelector((state: any) => state.teams.selectedTeam);

    const [position, setPosition] = useState('');

    const selectedSubtitute = useSelector((state: any) => state.subtitutes.selectedSubtitute);

    const dispatch = useAppDispatch();


    const handlePosition = (event: SelectChangeEvent) => {
        setPosition(event.target.value as string);
    };

    const MAX_SIZE = 500000; // 500KB

    const validateImage = (values: FormValues) => {
        if (values.avatar && values.avatar.size > MAX_SIZE) {
            return { avatar: 'Max file size exceeded.' };
        }
    };

    const sortSubtitutes = (subtitutes) => {
        return subtitutes.sort((a, b) => {
            if (a.playerNumber > 0 && b.playerNumber < 0) {
                return -1;
            } else if (a.playerNumber < 0 && b.playerNumber > 0) {
                return 1;
            } else {
                return 0;
            }
        });
    }

    function addPlayerToSelectedTeam(subtitute: Player) {

        const teamsCopy = [...teams];
        // console.log("teams copy here :", teamsCopy);
        dispatch(setPopulatedTeams(
            teamsCopy.map((team: any) => {
                const subtitutesCopy = [...team.subtitutes];

                if (team.name === selectedTeam.name) {
                    // console.log('team verify here: ', team);
                    // console.log('team.subtitutes here: ', team.subtitutes);
                    subtitutesCopy.push(subtitute);
                    // console.log('subtitutesCopy here: ', subtitutesCopy);
                }

                return { ...team, subtitutes: sortSubtitutes(subtitutesCopy) };
            })
        ));

        dispatch(selectTeamReducer({ ...selectedTeam, subtitutes: sortSubtitutes([...selectedTeam.subtitutes, subtitute]) }));
    }

    const formik = useFormik<FormValues>({
        initialValues: selectedSubtitute != null ? {
            firstName: selectedSubtitute.firstName,
            lastName: selectedSubtitute.lastName,
            playerNumber: selectedSubtitute.playerNumber,
            avatar: selectedSubtitute.avatar,
            phoneNumber: selectedSubtitute.phoneNumber,
            age: selectedSubtitute.age,
            height: selectedSubtitute.height,
            email: selectedSubtitute.email,
            position: selectedSubtitute.position,
            country: selectedSubtitute.country
        } :
            {
                firstName: '',
                lastName: '',
                playerNumber: '20',
                avatar: undefined,
                phoneNumber: '',
                age: '',
                height: '',
                email: '',
                position: '-1',
                country: ''
            },

        onSubmit: async (formValues) => {


            const formData = new FormData();
            formData.append('firstName', formValues.firstName);
            formData.append('lastName', formValues.lastName);
            formData.append('playerNumber', formValues.playerNumber);
            formData.append('age', formValues.age);
            formData.append('height', formValues.height);
            formData.append('email', formValues.email);
            formData.append('country', formValues.country);
            formData.append('phoneNumber', formValues.phoneNumber);
            formData.append('position', "-1");

            if (formValues.avatar) {
                formData.append('avatar', formValues.avatar);
            }
            const player: Player = (await addPlayer(formData)).data.player;
            addPlayerToSelectedTeam(player);
            const selectedTeamCopy =
            {
                ...selectedTeam,
                players: selectedTeam.players.filter((player) => player.blank !== true),
                subtitutes: selectedTeam.subtitutes.filter((subtitute) => subtitute.blank !== true)
            }
            // console.log("selectedTeamCopy  ", selectedTeamCopy);

            const updatedTeam = await updateTeam(selectedTeam._id, { ...selectedTeamCopy, subtitutes: [...selectedTeamCopy.subtitutes, player] });
            // console.log("updated team here: xx ", updatedTeam);



        },
        validationSchema: Yup.object({
            avatar: Yup.mixed().required('avatar'),
            firstName: Yup.string().required('First name is required'),
            lastName: Yup.string().required('Last name is required'),
            phoneNumber: Yup.string().required('Contact phone is required'),
            email: Yup.string().email('Contact email is not valid').required('Contact email is required'),
            country: Yup.string().required('Country is required'),
        }),

        validate: validateImage,
    });




    // const formik = useFormik<IProfileDetails>({
    //     initialValues,

    //     onSubmit: async (values) => {
    //         setLoading(true)
    //         setTimeout(async () => {
    //             const updatedData = Object.assign(data, values)
    //             console.log(data);
    //             setData(updatedData)
    //             setLoading(false)
    //             alert(JSON.stringify(values, null, 2));
    //             try {
    //                 const formData = new FormData();
    //                 for (const key in values) {
    //                     formData.append(key, values[key]);
    //                 }

    //                 // Send a POST request to the server with the tournament data
    //                 const response = await axios.post('http://localhost:3001/player/add', formData);
    //                 console.log('Response:', response.data);

    //             } catch (error) {
    //                 console.error('Error saving tournament:', error);
    //             }
    //         }, 1000)
    //     },
    // })
    const [loading, setLoading] = useState(false)



    return (
        <Modal show={showAddPlayer} onHide={handleCloseModal} size="xl">
            <Modal.Header closeButton>
                <Modal.Title>
                    <div className='card-title m-0'>
                        <h3 className='fw-bolder m-0'>Profile Details</h3>
                    </div>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>

                <div className='card mb-5 mb-xl-10'>
                       
                    <div id='kt_account_profile_details' className='collapse show'>
                        <form onSubmit={formik.handleSubmit} className='form'>
                            <div className='card-body border-top p-9'>
                                <div className='row mb-6'>
                                    <label className='col-lg-4 col-form-label fw-bold fs-6'>Avatar</label>
                                    <div className='col-lg-8 d-flex justify-content-end'>

                                        <input
                                            type="file"
                                            name="avatar"
                                            accept="image/*"
                                            onChange={(event) => {
                                                if (event.currentTarget.files) {
                                                    formik.setFieldValue('avatar', event.currentTarget.files[0]);
                                                }
                                            }}
                                        />
                                    </div>
                                </div>

                                <div className='row mb-6'>
                                    <label className='col-lg-4 col-form-label required fw-bold fs-6'>Full Name</label>

                                    <div className='col-lg-8'>
                                        <div className='row'>
                                            <div className='col-lg-6 fv-row'>
                                                <input
                                                    type='text'
                                                    className='form-control form-control-lg form-control-solid mb-3 mb-lg-0'
                                                    placeholder='First name'
                                                    {...formik.getFieldProps('firstName')}
                                                />
                                                {formik.touched.firstName && formik.errors.firstName && (
                                                    <div className='fv-plugins-message-container'>
                                                        <div className='fv-help-block'>{formik.errors.firstName}</div>
                                                    </div>
                                                )}
                                            </div>



                                            <div className='col-lg-6 fv-row'>
                                                <input
                                                    type='text'
                                                    className='form-control form-control-lg form-control-solid'
                                                    placeholder='Last name'
                                                    {...formik.getFieldProps('lastName')}
                                                />
                                                {formik.touched.lastName && formik.errors.lastName && (
                                                    <div className='fv-plugins-message-container'>
                                                        <div className='fv-help-block'>{formik.errors.lastName}</div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>



                                <div className='row mb-6'>
                                    <label className='col-lg-4 col-form-label fw-bold fs-6'>
                                        <span className='required'>Parent Phone Number</span>
                                    </label>

                                    <div className='col-lg-8 fv-row'>
                                        <input
                                            type='tel'
                                            className='form-control form-control-lg form-control-solid'
                                            placeholder='Phone number'
                                            {...formik.getFieldProps('phoneNumber')}
                                        />
                                        {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                                            <div className='fv-plugins-message-container'>
                                                <div className='fv-help-block'>{formik.errors.phoneNumber}</div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className='row mb-6'>
                                    <label className='col-lg-4 col-form-label fw-bold fs-6'>
                                        <span className='required'>age</span>
                                    </label>

                                    <div className='col-lg-8 fv-row'>
                                        <input
                                            type='tel'
                                            className='form-control form-control-lg form-control-solid'
                                            placeholder='enter age'
                                            {...formik.getFieldProps('age')}
                                        />
                                        {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                                            <div className='fv-plugins-message-container'>
                                                <div className='fv-help-block'>{formik.errors.age}</div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className='row mb-6'>
                                    <label className='col-lg-4 col-form-label fw-bold fs-6'>
                                        <span className='required'>height</span>
                                    </label>

                                    <div className='col-lg-8 fv-row'>
                                        <input
                                            type='tel'
                                            className='form-control form-control-lg form-control-solid'
                                            placeholder='enter height'
                                            {...formik.getFieldProps('height')}
                                        />
                                        {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                                            <div className='fv-plugins-message-container'>
                                                <div className='fv-help-block'>{formik.errors.height}</div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className='row mb-6'>

                                    <label className='col-lg-4 col-form-label fw-bold fs-6'>
                                        <span className='required'>Position</span>
                                    </label>

                                    <div className='col-lg-8 fv-row row'>

                                        <div className='col-6'>
                                            <div className='col-12'>
                                                <input
                                                    type='number'
                                                    className='form-control form-control-lg form-control-solid mb-3 mb-lg-0'
                                                    placeholder='player number'
                                                    {...formik.getFieldProps('playerNumber')}
                                                />
                                                {formik.touched.playerNumber && formik.errors.playerNumber && (
                                                    <div className='fv-plugins-message-container'>
                                                        <div className='fv-help-block'>{formik.errors.playerNumber}</div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>


                                    </div>



                                </div>


                                <div className='row mb-6'>
                                    <label className='col-lg-4 col-form-label fw-bold fs-6'>
                                        <span className='required'>Contact Email</span>
                                    </label>

                                    <div className='col-lg-8 fv-row'>
                                        <input
                                            type='tel'
                                            className='form-control form-control-lg form-control-solid'
                                            placeholder='Email address'
                                            {...formik.getFieldProps('email')}
                                        />
                                        {formik.touched.email && formik.errors.email && (
                                            <div className='fv-plugins-message-container'>
                                                <div className='fv-help-block'>{formik.errors.email}</div>
                                            </div>
                                        )}
                                    </div>
                                </div>


                                <div className='row mb-6'>
                                    <label className='col-lg-4 col-form-label fw-bold fs-6'>
                                        <span className='required'>Country</span>
                                    </label>

                                    <div className='col-lg-8 fv-row'>
                                        <select
                                            className='form-select form-select-solid form-select-lg fw-bold'
                                            {...formik.getFieldProps('country')}
                                        >
                                            <option value=''>Select a Country...</option>
                                            <option value='AF'>Afghanistan</option>
                                            <option value='AX'>Aland Islands</option>
                                            <option value='AL'>Albania</option>
                                            <option value='DZ'>Algeria</option>
                                            <option value='AS'>American Samoa</option>
                                            <option value='AD'>Andorra</option>
                                            <option value='AO'>Angola</option>
                                            <option value='AI'>Anguilla</option>
                                            <option value='AQ'>Antarctica</option>
                                            <option value='AG'>Antigua and Barbuda</option>
                                            <option value='AR'>Argentina</option>
                                            <option value='AM'>Armenia</option>
                                            <option value='AW'>Aruba</option>
                                            <option value='AU'>Australia</option>
                                            <option value='AT'>Austria</option>
                                            <option value='AZ'>Azerbaijan</option>
                                            <option value='BS'>Bahamas</option>
                                            <option value='BH'>Bahrain</option>
                                            <option value='BD'>Bangladesh</option>
                                            <option value='BB'>Barbados</option>
                                            <option value='BY'>Belarus</option>
                                            <option value='BE'>Belgium</option>
                                            <option value='BZ'>Belize</option>
                                            <option value='BJ'>Benin</option>
                                            <option value='BM'>Bermuda</option>
                                            <option value='BT'>Bhutan</option>
                                            <option value='BO'>Bolivia, Plurinational State of</option>
                                            <option value='BQ'>Bonaire, Sint Eustatius and Saba</option>
                                            <option value='BA'>Bosnia and Herzegovina</option>
                                            <option value='BW'>Botswana</option>
                                            <option value='BV'>Bouvet Island</option>
                                            <option value='BR'>Brazil</option>
                                            <option value='IO'>British Indian Ocean Territory</option>
                                            <option value='BN'>Brunei Darussalam</option>
                                            <option value='BG'>Bulgaria</option>
                                            <option value='BF'>Burkina Faso</option>
                                            <option value='BI'>Burundi</option>
                                            <option value='KH'>Cambodia</option>
                                            <option value='CM'>Cameroon</option>
                                            <option value='CA'>Canada</option>
                                            <option value='CV'>Cape Verde</option>
                                            <option value='KY'>Cayman Islands</option>
                                            <option value='CF'>Central African Republic</option>
                                            <option value='TD'>Chad</option>
                                            <option value='CL'>Chile</option>
                                            <option value='CN'>China</option>
                                            <option value='CX'>Christmas Island</option>
                                            <option value='CC'>Cocos (Keeling) Islands</option>
                                            <option value='CO'>Colombia</option>
                                            <option value='KM'>Comoros</option>
                                            <option value='CG'>Congo</option>
                                            <option value='CD'>Congo, the Democratic Republic of the</option>
                                            <option value='CK'>Cook Islands</option>
                                            <option value='CR'>Costa Rica</option>
                                            <option value='CI'>Côte d'Ivoire</option>
                                            <option value='HR'>Croatia</option>
                                            <option value='CU'>Cuba</option>
                                            <option value='CW'>Curaçao</option>
                                            <option value='CY'>Cyprus</option>
                                            <option value='CZ'>Czech Republic</option>
                                            <option value='DK'>Denmark</option>
                                            <option value='DJ'>Djibouti</option>
                                            <option value='DM'>Dominica</option>
                                            <option value='DO'>Dominican Republic</option>
                                            <option value='EC'>Ecuador</option>
                                            <option value='EG'>Egypt</option>
                                            <option value='SV'>El Salvador</option>
                                            <option value='GQ'>Equatorial Guinea</option>
                                            <option value='ER'>Eritrea</option>
                                            <option value='EE'>Estonia</option>
                                            <option value='ET'>Ethiopia</option>
                                            <option value='FK'>Falkland Islands (Malvinas)</option>
                                            <option value='FO'>Faroe Islands</option>
                                            <option value='FJ'>Fiji</option>
                                            <option value='FI'>Finland</option>
                                            <option value='FR'>France</option>
                                            <option value='GF'>French Guiana</option>
                                            <option value='PF'>French Polynesia</option>
                                            <option value='TF'>French Southern Territories</option>
                                            <option value='GA'>Gabon</option>
                                            <option value='GM'>Gambia</option>
                                            <option value='GE'>Georgia</option>
                                            <option value='DE'>Germany</option>
                                            <option value='GH'>Ghana</option>
                                            <option value='GI'>Gibraltar</option>
                                            <option value='GR'>Greece</option>
                                            <option value='GL'>Greenland</option>
                                            <option value='GD'>Grenada</option>
                                            <option value='GP'>Guadeloupe</option>
                                            <option value='GU'>Guam</option>
                                            <option value='GT'>Guatemala</option>
                                            <option value='GG'>Guernsey</option>
                                            <option value='GN'>Guinea</option>
                                            <option value='GW'>Guinea-Bissau</option>
                                            <option value='GY'>Guyana</option>
                                            <option value='HT'>Haiti</option>
                                            <option value='HM'>Heard Island and McDonald Islands</option>
                                            <option value='VA'>Holy See (Vatican City State)</option>
                                            <option value='HN'>Honduras</option>
                                            <option value='HK'>Hong Kong</option>
                                            <option value='HU'>Hungary</option>
                                            <option value='IS'>Iceland</option>
                                            <option value='IN'>India</option>
                                            <option value='ID'>Indonesia</option>
                                            <option value='IR'>Iran, Islamic Republic of</option>
                                            <option value='IQ'>Iraq</option>
                                            <option value='IE'>Ireland</option>
                                            <option value='IM'>Isle of Man</option>
                                            <option value='IL'>Israel</option>
                                            <option value='IT'>Italy</option>
                                            <option value='JM'>Jamaica</option>
                                            <option value='JP'>Japan</option>
                                            <option value='JE'>Jersey</option>
                                            <option value='JO'>Jordan</option>
                                            <option value='KZ'>Kazakhstan</option>
                                            <option value='KE'>Kenya</option>
                                            <option value='KI'>Kiribati</option>
                                            <option value='KP'>Korea, Democratic People's Republic of</option>
                                            <option value='KW'>Kuwait</option>
                                            <option value='KG'>Kyrgyzstan</option>
                                            <option value='LA'>Lao People's Democratic Republic</option>
                                            <option value='LV'>Latvia</option>
                                            <option value='LB'>Lebanon</option>
                                            <option value='LS'>Lesotho</option>
                                            <option value='LR'>Liberia</option>
                                            <option value='LY'>Libya</option>
                                            <option value='LI'>Liechtenstein</option>
                                            <option value='LT'>Lithuania</option>
                                            <option value='LU'>Luxembourg</option>
                                            <option value='MO'>Macao</option>
                                            <option value='MK'>Macedonia, the former Yugoslav Republic of</option>
                                            <option value='MG'>Madagascar</option>
                                            <option value='MW'>Malawi</option>
                                            <option value='MY'>Malaysia</option>
                                            <option value='MV'>Maldives</option>
                                            <option value='ML'>Mali</option>
                                            <option value='MT'>Malta</option>
                                            <option value='MH'>Marshall Islands</option>
                                            <option value='MQ'>Martinique</option>
                                            <option value='MR'>Mauritania</option>
                                            <option value='MU'>Mauritius</option>
                                            <option value='YT'>Mayotte</option>
                                            <option value='MX'>Mexico</option>
                                            <option value='FM'>Micronesia, Federated States of</option>
                                            <option value='MD'>Moldova, Republic of</option>
                                            <option value='MC'>Monaco</option>
                                            <option value='MN'>Mongolia</option>
                                            <option value='ME'>Montenegro</option>
                                            <option value='MS'>Montserrat</option>
                                            <option value='MA'>Morocco</option>
                                            <option value='MZ'>Mozambique</option>
                                            <option value='MM'>Myanmar</option>
                                            <option value='NA'>Namibia</option>
                                            <option value='NR'>Nauru</option>
                                            <option value='NP'>Nepal</option>
                                            <option value='NL'>Netherlands</option>
                                            <option value='NC'>New Caledonia</option>
                                            <option value='NZ'>New Zealand</option>
                                            <option value='NI'>Nicaragua</option>
                                            <option value='NE'>Niger</option>
                                            <option value='NG'>Nigeria</option>
                                            <option value='NU'>Niue</option>
                                            <option value='NF'>Norfolk Island</option>
                                            <option value='MP'>Northern Mariana Islands</option>
                                            <option value='NO'>Norway</option>
                                            <option value='OM'>Oman</option>
                                            <option value='PK'>Pakistan</option>
                                            <option value='PW'>Palau</option>
                                            <option value='PS'>Palestinian Territory, Occupied</option>
                                            <option value='PA'>Panama</option>
                                            <option value='PG'>Papua New Guinea</option>
                                            <option value='PY'>Paraguay</option>
                                            <option value='PE'>Peru</option>
                                            <option value='PH'>Philippines</option>
                                            <option value='PN'>Pitcairn</option>
                                            <option value='PL'>Poland</option>
                                            <option value='PT'>Portugal</option>
                                            <option value='PR'>Puerto Rico</option>
                                            <option value='QA'>Qatar</option>
                                            <option value='RE'>Réunion</option>
                                            <option value='RO'>Romania</option>
                                            <option value='RU'>Russian Federation</option>
                                            <option value='RW'>Rwanda</option>
                                            <option value='BL'>Saint Barthélemy</option>
                                            <option value='SH'>Saint Helena, Ascension and Tristan da Cunha</option>
                                            <option value='KN'>Saint Kitts and Nevis</option>
                                            <option value='LC'>Saint Lucia</option>
                                            <option value='MF'>Saint Martin (French part)</option>
                                            <option value='PM'>Saint Pierre and Miquelon</option>
                                            <option value='VC'>Saint Vincent and the Grenadines</option>
                                            <option value='WS'>Samoa</option>
                                            <option value='SM'>San Marino</option>
                                            <option value='ST'>Sao Tome and Principe</option>
                                            <option value='SA'>Saudi Arabia</option>
                                            <option value='SN'>Senegal</option>
                                            <option value='RS'>Serbia</option>
                                            <option value='SC'>Seychelles</option>
                                            <option value='SL'>Sierra Leone</option>
                                            <option value='SG'>Singapore</option>
                                            <option value='SX'>Sint Maarten (Dutch part)</option>
                                            <option value='SK'>Slovakia</option>
                                            <option value='SI'>Slovenia</option>
                                            <option value='SB'>Solomon Islands</option>
                                            <option value='SO'>Somalia</option>
                                            <option value='ZA'>South Africa</option>
                                            <option value='GS'>South Georgia and the South Sandwich Islands</option>
                                            <option value='KR'>South Korea</option>
                                            <option value='SS'>South Sudan</option>
                                            <option value='ES'>Spain</option>
                                            <option value='LK'>Sri Lanka</option>
                                            <option value='SD'>Sudan</option>
                                            <option value='SR'>Suriname</option>
                                            <option value='SJ'>Svalbard and Jan Mayen</option>
                                            <option value='SZ'>Swaziland</option>
                                            <option value='SE'>Sweden</option>
                                            <option value='CH'>Switzerland</option>
                                            <option value='SY'>Syrian Arab Republic</option>
                                            <option value='TW'>Taiwan, Province of China</option>
                                            <option value='TJ'>Tajikistan</option>
                                            <option value='TZ'>Tanzania, United Republic of</option>
                                            <option value='TH'>Thailand</option>
                                            <option value='TL'>Timor-Leste</option>
                                            <option value='TG'>Togo</option>
                                            <option value='TK'>Tokelau</option>
                                            <option value='TO'>Tonga</option>
                                            <option value='TT'>Trinidad and Tobago</option>
                                            <option value='TN'>Tunisia</option>
                                            <option value='TR'>Turkey</option>
                                            <option value='TM'>Turkmenistan</option>
                                            <option value='TC'>Turks and Caicos Islands</option>
                                            <option value='TV'>Tuvalu</option>
                                            <option value='UG'>Uganda</option>
                                            <option value='UA'>Ukraine</option>
                                            <option value='AE'>United Arab Emirates</option>
                                            <option value='GB'>United Kingdom</option>
                                            <option value='US'>United States</option>
                                            <option value='UY'>Uruguay</option>
                                            <option value='UZ'>Uzbekistan</option>
                                            <option value='VU'>Vanuatu</option>
                                            <option value='VE'>Venezuela, Bolivarian Republic of</option>
                                            <option value='VN'>Vietnam</option>
                                            <option value='VI'>Virgin Islands</option>
                                            <option value='WF'>Wallis and Futuna</option>
                                            <option value='EH'>Western Sahara</option>
                                            <option value='YE'>Yemen</option>
                                            <option value='ZM'>Zambia</option>
                                            <option value='ZW'>Zimbabwe</option>
                                        </select>
                                        {formik.touched.country && formik.errors.country && (
                                            <div className='fv-plugins-message-container'>
                                                <div className='fv-help-block'>{formik.errors.country}</div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                            </div>

                            <div className='card-footer d-flex justify-content-end py-6 px-9'>
                                <button type='submit' className='btn btn-primary' disabled={loading}>
                                    {!loading && 'Save Changes'}
                                    {loading && (
                                        <span className='indicator-progress' style={{ display: 'block' }}>
                                            Please wait...{' '}
                                            <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                                        </span>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

            </Modal.Body>
        </Modal>
    )
}


export default AddPlayerModal;