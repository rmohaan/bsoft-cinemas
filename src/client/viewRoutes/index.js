'use strict';

import View from '../views/wrapper';

let viewRoutesConfig = [{
  route: '/:organizationName/reactReduxSkeleton',
  page: View,
  pageTitle: '',
  entitlement: 'Entitlement',
  permission: ['View']
}];

export default viewRoutesConfig;
