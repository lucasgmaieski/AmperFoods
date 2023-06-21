import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
    name: 'user',
    initialState: {
        name: 'Lucas',
    },
    reducers: {
        setName: (state, action) => {
            state.name = action.payload;
        }
    }
});

export const {setName} = slice.actions;
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
