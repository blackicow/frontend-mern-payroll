import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

export const actionTypes = {
    setAdminUserAction: "Set Admin User Action",
};

const initialState = {
    adminUser: null,
};

export const reducer = persistReducer(
    { storage, key: "admin-user", whitelist: ['filter'] },
    (state = initialState, action) => {
        switch (action.type) {
            case actionTypes.setAdminUserAction:
                return { adminUser: action.payload }

            default:
                return state;
        }
    }
);

export const actions = {
    setAdminUserAction: (payload = null) => ({ type: actionTypes.setAdminUserAction, payload }),
};

export function* saga() {
}
