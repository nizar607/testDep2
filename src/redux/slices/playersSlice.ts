import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addPlayer, getPlayers } from "../../services/PlayerService";
import Player from "../../models/Player";

interface State {
    data: Player[];
    selectedPlayer: Player | null;
    errors: string;
}

let initialState: State = {
    data: [],
    selectedPlayer: null,
    errors: "",
};

const playerSlice = createSlice({
    name: "players",
    initialState,
    reducers: {
        populatePlayers(state, action) {
            state.data = action.payload;
        },
        selectPlayer(state, action) {
            state.selectedPlayer = action.payload;
        },
        unselectPlayer(state) {
            state.selectedPlayer = null;
        },
        deletePlayerReducer: (state, action) => {
            const payload = action.payload;
            state.data = state.data.filter(
                (eventItem) => eventItem._id !== payload
            );
        },
        updatePlayerReducer: (state, action) => {
            const payload = action.payload;
            const index = state.data.findIndex((item) =>
                item._id === payload.id);
            if (index !== -1) {
                state.data[index] = payload;
            }
        },
        addPlayerReducer: (state, action) => {
            const payload = action.payload;
            state.data.push(payload);
        },
        setErrors(state, action) {
            state.errors = action.payload;
        },
    },
});


export const fetchPlayers = () => async (dispatch) => {
    try {
        const playersResult = await getPlayers();
        return playersResult.data.players;
        // dispatch(populatePlayers(playersResult.data.players));
        // dispatch(setErrors(null));
    } catch (error) {
        dispatch(setErrors(error));
    }
};


export const setPlayers = (players: [Player]) => async (dispatch) => {
    try {
        dispatch(populatePlayers(players));
        dispatch(setErrors(null));
    } catch (error) {
        dispatch(setErrors(error));
    }
};

// export const addPlayer = (player: Player) => async (dispatch) => {
//     try {
//         dispatch(addPlayerReducer(player));
//         dispatch(setErrors(null));
//     } catch (error) {
//         dispatch(setErrors(error));
//     }
// };


export const addPlayerThunk = createAsyncThunk(
    'player/add',
    async (eventData: Player, { dispatch, rejectWithValue }) => {
        try {
            const response = await addPlayer(eventData); // Your API call to add an event
            dispatch(addPlayerReducer(response.data));
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);


// export const deleteEventThunk = createAsyncThunk(
//     'events/deleteEvent',
//     async (eventId, { rejectWithValue }) => {
//         try {
//             // Replace this with the actual API call to delete the event
//             await deleteEvent(eventId);
//             return eventId; // Return the deleted event's ID on success
//         } catch (error) {
//             return rejectWithValue(error.response.data);
//         }
//     }
// );

export const {
    populatePlayers,
    selectPlayer,
    unselectPlayer,
    setErrors,
    deletePlayerReducer,
    updatePlayerReducer,
    addPlayerReducer,
} = playerSlice.actions;
export default playerSlice.reducer;