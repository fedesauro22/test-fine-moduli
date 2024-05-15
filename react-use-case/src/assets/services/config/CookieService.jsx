import Cookies from "js-cookie";
import { getNameClaim, getRolesClaim, getEmailClaim } from "./JWTTokenService";
export function setJWTCookies(token, expireDate) {
    Cookies.set("token", token, { expires: expireDate });
}

export function isTokenExpired() {
    return Cookies.get("token") == null;
}

export function getToken() {
    return Cookies.get("token");
}

export function deleteToken() {
    return Cookies.remove("token");
}

export function getTokenNome() {
    return !isTokenExpired() ? getNameClaim(getToken()) : "";
}

export function getTokenRuoli() {
    return !isTokenExpired() ? getRolesClaim(getToken()) : "";
}

export function getTokenEmail() {
    return !isTokenExpired() ? getEmailClaim(getToken()) : "";
}
