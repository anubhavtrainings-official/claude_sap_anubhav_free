service AuthService @(path: 'auth', requires: 'any') {

    type LoginResponse {
        access    : String;
        refresh   : String;
        expiresIn : Integer;
    }

    type UserInfo {
        id        : String;
        loginName : String;
        firstName : String;
        lastName  : String;
        roles     : array of String;
    }

    action   login(loginName: String, password: String) returns LoginResponse;
    action   refresh(refreshToken: String)              returns LoginResponse;
    function me()                                       returns UserInfo;
}
