import {login, logout} from "../../actions/auth";

test('should set up logout', () => {
    const result = logout();

    expect(result).toEqual({
        type: 'LOGOUT'
    });
});

test('should set up login', () => {
    const uid = '1234';
    const result = login(uid);

    expect(result).toEqual({
        type: 'LOGIN',
        uid
    });
});
