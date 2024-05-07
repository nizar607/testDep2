export interface IAppBasic {
  appName: string
  appType: string
  divisions: string
  tournamentSexe:string
  tournamentLevel:string
  tournamentLogo?: File | null
  tournamentLogoPreview:string
 
  
}

export type TAppFramework = 'HTML5' | 'ReactJS' | 'Angular' | 'Vue'

export interface IAppDatabase {
  databaseName: string
  databaseSolution: 'MySQL' | 'Firebase' | 'DynamoDB'
}

export type TAppStorage = 'Basic Server' | 'AWS' | 'Google'

export interface ICreateAppData {
  appBasic: IAppBasic
  appFramework: TAppFramework
  appDatabase: IAppDatabase
  appStorage: TAppStorage
}

export const defaultCreateAppData: ICreateAppData = {
  appBasic: {appName: '', appType: '' , divisions:'', tournamentSexe:'',
tournamentLevel:'', tournamentLogoPreview:'' , 
tournamentLogo:null},
  appFramework: 'HTML5',
  appDatabase: {databaseName: 'db_name', databaseSolution: 'MySQL'},
  appStorage: 'Basic Server',
}

export type StepProps = {
  data: ICreateAppData
  updateData: (fieldsToUpdate: Partial<ICreateAppData>) => void
  hasError: boolean
}
