import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
    name: 'user',
    initialState: {
        token: '',
        name: 'Lucas',
    },
    reducers: {
        setName: (state, action) => {
            state.name = action.payload.name;
        },
        setToken: (state, action) => {
            state.token = action.payload.token
        }
    }
});

export const {setName, setToken} = slice.actions;
export default slice.reducer;

// const initialState = {
//     name: 'Teste'
// };

// export default (state = initialState, action) => {
//     switch(action.type) {
//         case 'SET_NAME':
//             return {...state, name: action.payload.name};
//         break;
//     }

//     return state;
// }
