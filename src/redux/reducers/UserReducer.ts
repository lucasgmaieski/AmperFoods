import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
    name: 'user',
    initialState: {
        token: '',
        name: '',
        email: '',
        address: '',
        phone: '',
    },
    reducers: {
        setName: (state, action) => {
            state.name = action.payload.name;
        },
        setToken: (state, action) => {
            state.token = action.payload.token;
        },
        setInfo: (state, action) => {
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.address = action.payload.address;
            state.phone = action.payload.phone;
        },
        clearInfos: (state) => {
            state.token = '';
            state.name = '';
            state.email = '';
            state.address = '';
            state.phone = '';
        }
    }
});

export const {setName, setToken, setInfo, clearInfos} = slice.actions;
export default slice.reducer;
