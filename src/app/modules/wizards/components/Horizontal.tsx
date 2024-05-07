import React, { FC, useEffect, useRef, useState } from 'react'
import { Step1Horizentale } from './steps-tournamentset-up-horizentale/step1-horizentale'
import { Step2Horizentale } from './steps-tournamentset-up-horizentale/step2-horizentale'
import { Step3Horizentale } from './steps-tournamentset-up-horizentale/step3-horizentale'
import { Step4Horizentale } from './steps-tournamentset-up-horizentale/step4-horizentale'
import { Step5Horizentale } from './steps-tournamentset-up-horizentale/step5-horizentale'
import { KTIcon } from '../../../../_metronic/helpers'
import { StepperComponent } from '../../../../_metronic/assets/ts/components'
import { Form, Formik, FormikValues } from 'formik'
//import {SetUpTournamentschemas, ISetUpTournament, initsSetUp} from './CreateAccountWizardHelper'
import { SetUpTournamentschemas, ISetUpTournament, initsSetUp } from './SetUpTournamentWizardHelper'
//import { useParams } from 'react-router-dom'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';




interface HorizontalProps {
  divisionId?: string;
  tournamentId?: string;
}

const Horizontal: FC<HorizontalProps> = ({ divisionId, tournamentId }) => {
  const stepperRef = useRef<HTMLDivElement | null>(null)
  const stepper = useRef<StepperComponent | null>(null)
  const [currentSchema, setCurrentSchema] = useState(SetUpTournamentschemas[0])
  const [initValues] = useState<ISetUpTournament>(initsSetUp)
  const [isSubmitButton, setSubmitButton] = useState(false)






  const navigate = useNavigate();
  console.log('division id dans compoenent horizentale id', divisionId);
  console.log('tournament id dans compoenent horizentale id', tournamentId);

  const loadStepper = () => {
    stepper.current = StepperComponent.createInsance(stepperRef.current as HTMLDivElement)
  }

  const prevStep = () => {
    if (!stepper.current) {
      return
    }

    stepper.current.goPrev()

    setCurrentSchema(SetUpTournamentschemas[stepper.current.currentStepIndex - 1])

    setSubmitButton(stepper.current.currentStepIndex === stepper.current.totalStepsNumber)
  }

  const submitStep = async (values: ISetUpTournament, actions: FormikValues) => {
    if (!stepper.current) {
      return;
    }


    if (stepper.current.currentStepIndex !== stepper.current.totalStepsNumber) {
      stepper.current.goNext();
    } else {
      try {

        const formData = new FormData();
        if (!values) {
          console.log('values is undefined');
          return;
        }

        for (const key in values) {
          if (key === "teams" && Array.isArray(values[key])) {
            const tteam = values[key];
            tteam?.forEach((team, index) => {
              for (const teamKey in team) {
                if (teamKey === 'logo' && team[teamKey] instanceof File) {
                  formData.append('images', team[teamKey] as File);
                } else if (teamKey !== 'logo') {
                  formData.append(`teams[${index}][${teamKey}]`, team[teamKey]);
                }
              }
            });
          } else if (values[key] instanceof File) {
            //images.push(values[key]);
          } else {
            formData.append(key, values[key] as string);
          }
        }

        const response = await axios.put(`${process.env.REACT_APP_API_URL}/division/division/${divisionId}`, formData);


        console.log('response', response);
        navigate(`/setuptournament/displaydivisions/${tournamentId}`);
      } catch (error) {
        console.log('error', error);

      }

      console.log('submit', values);
      stepper.current.goto(1);
      actions.resetForm();
      // navigate to display divisions


    }

    setSubmitButton(stepper.current.currentStepIndex === stepper.current.totalStepsNumber);
    setCurrentSchema(SetUpTournamentschemas[stepper.current.currentStepIndex - 1]);
  };

  useEffect(() => {
    if (!stepperRef.current) {
      return
    }

    loadStepper()
  }, [stepperRef])

  return (
    <div className='card'>
      <div className='card-body'>
        <div
          ref={stepperRef}
          className='stepper stepper-links d-flex flex-column pt-15'
          id='kt_create_account_stepper'
        >
          <div className='stepper-nav mb-5'>
            <div className='stepper-item current' data-kt-stepper-element='nav'>
              <h3 className='stepper-title'>Tournament Type</h3>
            </div>

            <div className='stepper-item' data-kt-stepper-element='nav'>
              <h3 className='stepper-title'>Tournament Rules</h3>
            </div>

            <div className='stepper-item' data-kt-stepper-element='nav'>
              <h3 className='stepper-title'>Add Teams</h3>
            </div>

            {/*           <div className='stepper-item' data-kt-stepper-element='nav'>
              <h3 className='stepper-title'>Add Players</h3>
            </div>

            <div className='stepper-item' data-kt-stepper-element='nav'>
              <h3 className='stepper-title'>Add Agent(s)</h3>
            </div>
  */}
          </div>

          <Formik validationSchema={currentSchema} initialValues={initValues} onSubmit={submitStep}>
            {() => (
              <Form className='mx-auto mw-600px w-100 pt-15 pb-10' id='kt_create_account_form'>
                <div className='current' data-kt-stepper-element='content'>
                  <Step1Horizentale />
                </div>

                <div data-kt-stepper-element='content'>
                  <Step2Horizentale />
                </div>

                <div data-kt-stepper-element='content'>
                  <Step3Horizentale divisionId={divisionId} />
                </div>
                {/*
                <div data-kt-stepper-element='content'>
                  <Step4Horizentale />
                </div>

                <div data-kt-stepper-element='content'>
                  <Step5Horizentale />
                </div>
            */}
                <div className='d-flex flex-stack pt-15'>
                  <div className='mr-2'>
                    <button
                      onClick={prevStep}
                      type='button'
                      className='btn btn-lg btn-light-primary me-3'
                      data-kt-stepper-action='previous'
                    >
                      <KTIcon iconName='arrow-left' className='fs-4 me-1' />
                      Back
                    </button>
                  </div>

                  <div>
                    <button type='submit' className='btn btn-lg btn-primary me-3'>
                      <span className='indicator-label'>
                        {!isSubmitButton && 'Continue'}
                        {isSubmitButton && 'Submit'}

                        <KTIcon iconName='arrow-right' className='fs-3 ms-2 me-0' />

                      </span>
                    </button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  )
}

export { Horizontal }
