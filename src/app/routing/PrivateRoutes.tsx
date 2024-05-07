import { lazy, FC, Suspense } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import { MasterLayout } from '../../_metronic/layout/MasterLayout'
import TopBarProgress from 'react-topbar-progress-indicator'
import { DashboardWrapper } from '../pages/dashboard/DashboardWrapper'
import { MenuTestPage } from '../pages/MenuTestPage'
import { getCSSVariableValue } from '../../_metronic/assets/ts/_utils'
import { WithChildren } from '../../_metronic/helpers'
import BuilderPageWrapper from '../pages/layout-builder/BuilderPageWrapper'
import TournamentConfig from '../pages/tournament/TournamentConfig'
import { useAuth } from '../modules/auth'
import AdminPage from '../modules/admin-module/AdminPage'
import ManagePlayers from '../modules/TeamModule/ManagePlayers'
import SetUpTournament from '../modules/set-up-tournament/components/my-tournaments/SetUpTournament'
import EditPlayer from '../modules/TeamModule/components/EditPLayer'




const PrivateRoutes = () => {
  const ProfilePage = lazy(() => import('../modules/profile/ProfilePage'))
  const WizardsPage = lazy(() => import('../modules/wizards/WizardsPage'))
  const AccountPage = lazy(() => import('../modules/accounts/AccountPage'))
  const WidgetsPage = lazy(() => import('../modules/widgets/WidgetsPage'))
  const ChatPage = lazy(() => import('../modules/apps/chat/ChatPage'))
  const UsersPage = lazy(() => import('../modules/apps/user-management/UsersPage'))
  //const TournamentPage= lazy(() => import('../pages/setupTournament/TournamentPage'))
  const TournamentPage = lazy(() => import('../modules/set-up-tournament/TournamentPage'))
  const AgentPage = lazy(() => import('../modules/agent-module/AgentPage'))
  const { currentUser } = useAuth();


  return (
    <Routes>
      <Route element={<MasterLayout />}>
        {/* Redirect to Dashboard after success login/registartion */}
        <Route path='auth/*' element={<Navigate to='/dashboard' />} />
        {/* Pages */}
        <Route path='dashboard' element={<DashboardWrapper />} />
        <Route path='tournament' element={<TournamentConfig />} />
        <Route path='builder' element={<BuilderPageWrapper />} />
        <Route path='menu-test' element={<MenuTestPage />} />
        <Route
          path='editPlayer'
          element={<EditPlayer />} />
        {/* Lazy Modules */}


        {currentUser && currentUser.role === 'creator' && (
          <Route
            path='/setuptournament/*'
            element={
              <SuspensedView>
                <TournamentPage />
              </SuspensedView>
            }
          />

        )}



        <Route
          path='/agent/*'
          element={
            <SuspensedView>
              <AgentPage />
            </SuspensedView>
          }
        />

        <Route
          path='/team'
          element={
            <SuspensedView>
              <ManagePlayers />
            </SuspensedView>
          }
        />

        {currentUser && currentUser.role === 'admin' && (
          <Route
            path='/AdminPage/*'
            element={
              <SuspensedView>
                <AdminPage />
              </SuspensedView>
            }
          />
        )}


        <Route
          path='crafted/pages/profile/*'
          element={
            <SuspensedView>
              <ProfilePage />
            </SuspensedView>
          }
        />
        <Route
          path='crafted/pages/wizards/*'
          element={
            <SuspensedView>
              <WizardsPage />
            </SuspensedView>
          }
        />
        <Route
          path='crafted/widgets/*'
          element={
            <SuspensedView>
              <WidgetsPage />
            </SuspensedView>
          }
        />
        <Route
          path='crafted/account/*'
          element={
            <SuspensedView>
              <AccountPage />
            </SuspensedView>
          }
        />
        <Route
          path='apps/chat/*'
          element={
            <SuspensedView>
              <ChatPage />
            </SuspensedView>
          }
        />
        <Route
          path='apps/user-management/*'
          element={
            <SuspensedView>
              <UsersPage />
            </SuspensedView>
          }
        />
        {/* Page Not Found */}
        <Route path='*' element={<Navigate to='/error/404' />} />
      </Route>
    </Routes>
  )
}

const SuspensedView: FC<WithChildren> = ({ children }) => {
  const baseColor = getCSSVariableValue('--bs-primary')
  TopBarProgress.config({
    barColors: {
      '0': baseColor,
    },
    barThickness: 1,
    shadowBlur: 5,
  })
  return <Suspense fallback={<TopBarProgress />}>{children}</Suspense>
}

export { PrivateRoutes }
