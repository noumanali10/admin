// import React, { createContext, useReducer, useContext } from 'react';

// export const ConfirmationContext = createContext();

// const initialState = {
//     confirmDelete: null,
// };

// const reducer = (state, action) => {
//     switch (action.type) {
//         case 'SET_CONFIRM_DELETE':
//             return {
//                 ...state,
//                 confirmDelete: action.payload,
//             };
//         default:
//             return state;
//     }
// };

// export const ConfirmationProvider = ({ children }) => {
//     const [state, dispatch] = useReducer(reducer, initialState);

//     const setConfirmDelete = (confirmDelete) => {
//         dispatch({ type: 'SET_CONFIRM_DELETE', payload: confirmDelete });
//     };

//     return (
//         <ConfirmationContext.Provider value={{ confirmDelete: state.confirmDelete, setConfirmDelete }}>
//             {children}
//         </ConfirmationContext.Provider>
//     );
// };

// export const useConfirmation = () => {
//     const context = useContext(ConfirmationContext);
//     if (!context) {
//         throw new Error('useConfirmation must be used within a ConfirmationProvider');
//     }
//     return context;
// };

// export default ConfirmationContext;
