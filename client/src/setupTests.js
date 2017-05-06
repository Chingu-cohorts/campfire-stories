import 'jest-enzyme';

global.areFns = (fn1, fn2) => expect(typeof fn1).toEqual(typeof fn2);
