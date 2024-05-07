import * as Yup from 'yup';

export interface ISetUpTournament {
  tournamentType: string
  PlayerPerTeam: number | null
  ExtraTime: boolean
  NumberTeams: number | null
  MatchDuration: number | null
  teams?: { name: string, logo: File | null, location: string }[]


}

const initsSetUp: ISetUpTournament = {
  tournamentType: 'singlematch',
  PlayerPerTeam: null,
  ExtraTime: false,
  NumberTeams: null,
  MatchDuration: null,
  teams: [],
}



const SetUpTournamentschemas = [
    Yup.object({
        tournamentType: Yup.string().required().label('Division Type'),
    }),
    Yup.object({
        PlayerPerTeam: Yup.number().min(3, 'Minimum 3 players are required per team').max(11, 'Maximum 11 players are allowed per team').required('Player Per Team is required').label('Player Per Team'),
        NumberTeams: Yup.number().min(4, 'Minimum 4 teams are required').test('is-multiple-of-eight-or-4', 'The number of teams must be a multiple of 8 or exactly 4', value => value === 4 || (value ? value % 8 === 0 : false)).required('Number of Teams is required'), 
        MatchDuration: Yup.number().min(1, 'Minimum 1 minute is required').max(120, 'Maximum 120 minutes are allowed').required('Match Duration is required').label('Match Duration'),}),
        Yup.object({
            teams: Yup.array()
              .of(
                Yup.object().shape({
                  name: Yup.string().required('Team name is required'),
                  logo: Yup.mixed().required('Team logo is required'),
                  location: Yup.string().required('Team location is required'),
                })
              )
              .test('teams-count', 'Invalid number of teams', function (teams) {
                const { NumberTeams } = this.parent;
                return teams && teams.length === NumberTeams;
              })
              .required('Teams are required'),
          }),
    Yup.object({
        

    }),

]


export { SetUpTournamentschemas, initsSetUp }