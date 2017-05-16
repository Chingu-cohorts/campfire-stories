import React from 'react';
import { shallow, mount, render } from 'enzyme';
import sinon from 'sinon';
import 'jest-enzyme';

// these vars will automatically be available for each test
global.React = React;
global.shallow = shallow;
global.mount = mount;
global.render = render;
global.sinon = sinon;
global.areFns = (fn1, fn2) => expect(typeof fn1).toEqual(typeof fn2);
