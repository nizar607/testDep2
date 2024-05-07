import * as Yup from 'yup'



export interface ICreateAccount {
  //tournamentType: string
  tournamentLogo: File | null;
 // accountTeamSize: string
  tournamentName: string
  tournamentLevel: string
  country: string | null
  tournamentStartDate: Date | undefined
  tournamentEndDate: Date | undefined
  tournamentSexe: string;
 // businessName: string
 // businessDescriptor: string
 // businessType: string
 // businessDescription: string
 // businessEmail: string
 // PlayerPerTeam: number | null
  //ExtraTime: boolean
  //NumberTeams: number | null
  //MatchDuration: number | null
 // cardNumber: string
 // cardExpiryMonth: string
 // cardExpiryYear: string
 // cardCvv: string
 // saveCard: string
  status?: string
  divisions?: string[]
 
 
  
 

}

const createAccountSchemas = [
  Yup.object({
    //tournamentType: Yup.string().required().label('Tournament Type'),
    tournamentLogo: Yup.mixed().required().label('Tournament Logo'),
    tournamentName: Yup.string().required().label('Tournament Name'),
    tournamentLevel: Yup.string().required().label('Tournament level'),
  }),
  Yup.object({
    country: Yup.string().required().label('Tournament country'),
    tournamentStartDate: Yup.date().required('Tournament Start Date is required').min(new Date(), 'Start date must be greater than or equal to today').label('Tournament Start Date'),
    tournamentEndDate: Yup.date().required('Tournament End Date is required').min(Yup.ref('tournamentStartDate'), 'End date must be greater than start date').label('Tournament End Date'),
    tournamentSexe: Yup.string().required().label('Tournament Sexe'),
    
  }),
  Yup.object({
    divisions: Yup.array().min(1, 'At least one division must be selected').required().label('Divisions'),
   // businessName: Yup.string().required().label('Business Name'),
   // businessDescriptor: Yup.string().required().label('Shortened Descriptor'),
   // businessType: Yup.string().required().label('Corporation Type'),
   // businessEmail: Yup.string().required().label('Contact Email'),
  }),
  Yup.object({
    
  }),
]

const inits: ICreateAccount = {
  //tournamentType: 'singleMatchElimination',
//  accountTeamSize: '50+',
  tournamentLogo: null,
  tournamentName: '',
  tournamentLevel: 'national',
//  businessName: 'Keenthemes Inc.',
//  businessDescriptor: 'KEENTHEMES',
//  businessType: '1',
//  businessDescription: '',
//  businessEmail: 'corp@support.com',
 //PlayerPerTeam: null,
  //MatchDuration: null,
//  cardNumber: '4111 1111 1111 1111',
//  cardExpiryMonth: '1',
// cardExpiryYear: '2025',
//  cardCvv: '123',
//  saveCard: '1',
  tournamentStartDate: undefined, 
  tournamentEndDate: undefined,
  country: '',
  tournamentSexe:'male',
  //ExtraTime:false,
  //NumberTeams:null,
  status: 'pending',
  divisions: []
}

export {createAccountSchemas, inits}
