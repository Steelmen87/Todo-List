import { AppRootStateType } from "app/store";
export const selectIsLoggedIn = (state: AppRootStateType) => state.auth.isLoggedIn;
export const selectIsCaptcha = (state: AppRootStateType) => state.auth.captcha;
