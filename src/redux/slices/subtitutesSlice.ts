import { createSlice, PayloadAction, UnknownAction } from "@reduxjs/toolkit";
import { getPlayers } from "../../services/PlayerService";
import Player from "../../models/Player";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";

interface SubtitutesState {
    subtitutes: Player[];
    selectedSubtitute: Player | null;
    errors: string | null;
}

let initialState: SubtitutesState = {
    subtitutes: [],
    selectedSubtitute: null,
    errors: "",
};

const subtitutesSlice = createSlice({
    name: "subtitutes",
    initialState,
    reducers: {
        populatesubtitutes(state, action: PayloadAction<Player[]>) {
            state.subtitutes = action.payload;
        },
        selectSubtitute(state, action: PayloadAction<Player>) {
            state.selectedSubtitute = action.payload;
        },
        unselectSubtitute(state) {
            state.selectedSubtitute = null;
        },
        deleteSubtituteReducer: (state, action: PayloadAction<string>) => {
            const payload = action.payload;
            state.subtitutes = state.subtitutes.filter(
                (SubtituteItem) => SubtituteItem._id !== payload
            );
        },
        updateSubtituteReducer: (state, action: PayloadAction<Player>) => {
            const payload = action.payload;
            const index = state.subtitutes.findIndex((item) =>
                item._id === payload._id);
            if (index !== -1) {
                state.subtitutes[index] = payload;
            }
        },
        addSubtituteReducer: (state, action: PayloadAction<Player>) => {
            const payload = action.payload;
            state.subtitutes.push(payload);
        },
        setErrors(state, action: PayloadAction<string | null>) {
            state.errors = action.payload;
        },
    },
});

export const fetchSubtitutes = () => async (dispatch: any) => {
    try {
        const subtitutesResult = await getPlayers();
        dispatch(populatesubtitutes(subtitutesResult.data.players));
        dispatch(setErrors(null));
    } catch (error: any) {
        dispatch(setErrors(error));
    }
};

export const setSubtitutes = (players: Player[]) => async (dispatch: any) => {
    try {
        dispatch(populatesubtitutes(players));
        dispatch(setErrors(null));
    } catch (error: any) {
        dispatch(setErrors(error));
    }
};

export const setSelectedSubtitute = (player: Player) => async (dispatch: any) => {
    try {
        dispatch(selectSubtitute(player));
        dispatch(setErrors(null));
    } catch (error: any) {
        dispatch(setErrors(error));
    }
};

export const addSubtitute = (player: Player) => async (dispatch: any) => {
    try {
        dispatch(addSubtituteReducer(player));
        dispatch(setErrors(null));
    } catch (error: any) {
        dispatch(setErrors(error));
    }
};

export const selectsubtitutes = (state: any) => {
    return [state.subtitutes.subtitutes, state.subtitutes.errors];
};

export const selectSelectedSubtitute = (state: any) => {
    return state.subtitutes.selectedSubtitute;
};

export const {
    populatesubtitutes,
    selectSubtitute,
    unselectSubtitute,
    setErrors,
    deleteSubtituteReducer,
    updateSubtituteReducer,
    addSubtituteReducer,
} = subtitutesSlice.actions;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export default subtitutesSlice.reducer;