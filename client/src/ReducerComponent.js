
export const InitialValue={
    User:[],
}


export const ReducerFunction = (state, action) => {
    switch (action.type) {
        case "AddUser":
            return {
                ...state,
                User: [...state.User, action.payload], // Add empty user form
            };
            case  "UpdateUser":
                const updatedUsers = [...state.User];
               updatedUsers[action.payload.index] = action.payload.user;
               return { ...state, User: updatedUsers };

                case"DeleteUser":
                return{
                    ...state,
                    User:state.User.filter((_,index)=>(index!==action.payload))
                }
                case"SetUser":
                return{
                    ...state,
                    User:action.payload
                }
       
        default:
            return state;
    }
};
