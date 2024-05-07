import { createSlice, PayloadAction, UnknownAction } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import Team from "../../models/Team";

interface TeamsState {
    teams: Team[];
    selectedTeam: Team | null;
    errors: string | null;
}

// const data: any = [];

// for (let i = 1; i < 27; i++) {


//     data.push({
//         _id: -i,
//         playerNumber: -i,
//         firstName: "blank",
//         lastName: "blank",
//         phoneNumber: "blank",
//         email: "blank",
//         age: 0,
//         height: 0,
//         country: "blank",
//         position: "blank"
//     });
// }

let initialState: TeamsState = {
    teams: [],
    selectedTeam: {
        _id: "",
        name: "",
        logo: null,
        location: "",
        players: [],
        subtitutes: []
    },
    errors: "",
};

const teamsSlice = createSlice({
    name: "teams",
    initialState,
    reducers: {
        populateTeamsReducer(state, action: PayloadAction<any[]>) {
            state.teams = action.payload;
        },
        selectTeamReducer(state, action: PayloadAction<any>) {
            state.selectedTeam = action.payload;
        },
        addTeamReducer(state, action: PayloadAction<any>) {
            state.teams.push(action.payload);
        },
        unselectTeamReducer(state) {
            state.selectedTeam = null;
        },
        setErrorsReducer(state, action: PayloadAction<string | null>) {
            state.errors = action.payload;
        },
    },
});


export const setPopulatedTeams = (teams: any[]) => async (dispatch: any) => {
    try {
        dispatch(populateTeamsReducer(teams));
        dispatch(setErrorsReducer(null));
    } catch (error: any) {
        dispatch(setErrorsReducer(error));
    }
};

export const addTeam = (team: any) => async (dispatch: any) => {
    try {
        dispatch(addTeamReducer(team));
        dispatch(setErrorsReducer(null));
    } catch (error: any) {
        dispatch(setErrorsReducer(error));
    }
};



export const selectTeam = (team: any) => async (dispatch: any) => {
    try {
        dispatch(selectTeamReducer(team));
        dispatch(setErrorsReducer(null));
    } catch (error: any) {
        dispatch(setErrorsReducer(error));
    }
};

export const unselectTeam = () => async (dispatch: any) => {
    try {
        dispatch(unselectTeamReducer());
        dispatch(setErrorsReducer(null));
    } catch (error: any) {
        dispatch(setErrorsReducer(error));
    }
};




export const {
    populateTeamsReducer,
    selectTeamReducer,
    addTeamReducer,
    unselectTeamReducer,
    setErrorsReducer,
} = teamsSlice.actions;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export default teamsSlice.reducer;