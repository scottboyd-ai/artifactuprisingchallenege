import React from 'react';
import renderer from 'react-test-renderer';
import NavBar from "../frontend/components/NavBar";
import {Checkout} from "../frontend/components/Checkout";
import {Homepage} from "../frontend/components/Homepage";

describe('React', () => {
    test('NavBar renders', () => {
        const component = renderer.create(<NavBar/>);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    test('Checkout renders', () => {
        const component = renderer.create(<Checkout/>);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    test('Homepage renders', () => {
        const component = renderer.create(<Homepage/>);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    })
});