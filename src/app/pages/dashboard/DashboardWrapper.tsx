/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC} from 'react'
import {useIntl} from 'react-intl'
import {toAbsoluteUrl} from '../../../_metronic/helpers'
import {PageTitle} from '../../../_metronic/layout/core'
import {
  ListsWidget2,
  ListsWidget3,
  ListsWidget4,
  ListsWidget6,
  TablesWidget5,
  TablesWidget10,
  MixedWidget8,
  CardsWidget7,
  CardsWidget17,
  CardsWidget20,
  ListsWidget26,
  EngageWidget10,
  ChartsWidget1,
  ChartsWidget2,
  ChartsWidget3,
} from '../../../_metronic/partials/widgets'
import { useAuth } from '../../modules/auth'
import CreatorDashboard from '../../modules/set-up-tournament/components/creator dashboard/CreatorDashboard'



const DashboardPage: FC = () => {
  
  const { currentUser } = useAuth();

  return(
  <>
    {/* begin::Row */}
    <div className='row g-5 g-xl-10 mb-5 mb-xl-10'>
  
  <div className='col-md-4 col-lg-4 col-xl-4 mb-md-5 mb-xl-10'>
    {currentUser && currentUser.role === 'admin' && (
      <CardsWidget20 
        className='card-xl-stretch mb-xl-8'
        description='Active Tournaments'
        color='#F1416C'
        img={toAbsoluteUrl('/media/patterns/vector-1.png')}
      />
    )}
  </div>

  
  <div className='col-md-4 col-lg-4 col-xl-4 mb-md-5 mb-xl-10'>
  {currentUser && currentUser.role === 'admin' && (
    <MixedWidget8
      className='card-xxl-stretch mb-xl-3'
      chartColor='success'
      chartHeight='150px'
    /> )}
  </div>

  
  <div className='col-md-4 col-lg-4 col-xl-4 mb-md-5 mb-xl-10'>
  {currentUser && currentUser.role === 'admin' && (
    <ChartsWidget1 className='card-xl-stretch mb-xl-8' />
  )}
  </div>
</div>


    {/* end::Row */}

    {/* begin::Row */}
    <div className='row gx-5 gx-xl-10'>
      {/* begin::Col */}
      <div className='col-xxl-6 mb-5 mb-xl-10'>
        {/* <app-new-charts-widget8 cssclassName="h-xl-100" chartHeight="275px" [chartHeightNumber]="275"></app-new-charts-widget8> */}
      </div>
      {/* end::Col */}

      {/* begin::Col */}
      <div className='col-xxl-6 mb-5 mb-xl-10'>
        {/* <app-cards-widget18 cssclassName="h-xl-100" image="./assets/media/stock/600x600/img-65.jpg"></app-cards-widget18> */}
      </div>
      {/* end::Col */}
    </div>
    {/* end::Row */}

    {/* begin::Row */}
    <div className='row gy-5 gx-xl-8'>
      <div className='col-xxl-4'>
      {currentUser && currentUser.role === 'admin' && (
      <ChartsWidget2 className='card-xl-stretch mb-5 mb-xl-8' />
      )}
      </div>
      <div className='col-xl-8'>
      {currentUser && currentUser.role === 'admin' && (
      <ChartsWidget3 className='card-xl-stretch mb-xl-8' />
      )}
      </div>
    </div>
    {/* end::Row */}

    {/* begin::Row */}
    <div className='row gy-5 g-xl-8'>
      <div className='col-xl-12'>
        {currentUser && currentUser.role === 'agent' && (
        <ListsWidget2 className='card-xl-stretch mb-xl-8' /> )}
      </div>
      
      
    </div>
    {/* end::Row */}

    {currentUser && currentUser.role === 'creator' && (
      <>
    <div className='row g-5 gx-xxl-8'>
   
      
      <div className='col-xxl-4'>
        <MixedWidget8
          className='card-xxl-stretch mb-xl-3'
          chartColor='success'
          chartHeight='150px'
        />
      </div>

      
      <div className='col-xxl-8'>

        <TablesWidget5 className='card-xxl-stretch mb-5 mb-xxl-8' />
      </div>
      
    </div>


    <div>
      <CreatorDashboard />
    </div>
</>
)}
  
  </> 
  );
}

const DashboardWrapper: FC = () => {
  const intl = useIntl()
  return (
    <>
      <PageTitle breadcrumbs={[]}>{intl.formatMessage({id: 'MENU.DASHBOARD'})}</PageTitle>
      <DashboardPage />
    </>
  )
}

export {DashboardWrapper}
