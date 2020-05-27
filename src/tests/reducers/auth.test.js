import authReducer from '../../reducers/auth';

test('should handle login', () => {
    const uid = '12345';
    const result = authReducer({}, {
        type: 'LOGIN',
        uid
    });

    expect(result).toEqual({uid});
});

test('should handle logout', () => {
    const result = authReducer({uid: '1234'}, {type: 'LOGOUT'});

    expect(result).toEqual({});
});

test('should return state as default', () => {
    const state = {uid: '12345'};

    const result = authReducer(state, {});

    expect(result).toEqual(state);
});
