import { combineReducers } from 'redux'
import subtitutes from '../redux/slices/subtitutesSlice';
import teams from '../redux/slices/teamsSlice';

const reducers = combineReducers({
    subtitutes,
    teams
})

export default reducers;