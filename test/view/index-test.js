/* global describe, it */

'use strict';

import React from 'react';
import { mount } from 'enzyme';
import expect from 'expect';
import Provider from '../utils/provider';
import Component from '../../src/client/views/component';

describe('Checking Rendering', function () {
  let component = mount(<Provider><Component /></Provider>);

  it('Component is rendered', function () {
    expect(component.find('Component').length).toEqual(1);
  });
});
