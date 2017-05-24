import { _ } from 'meteor/underscore';
import { Meteor } from 'meteor/meteor';
import { Config, Runner } from 'angular-ecmascript/module-helpers';


import testTemplateUrl from '../templates/test.html';
import testChildTemplateUrl from '../templates/testChild.html';
import templateChildTemplateUrl from '../templates/template.html';
import valuesTemplateUrl from '../templates/values.html';


class RoutesConfig extends Config {
  constructor() {
    super(...arguments);

    this.isAuthorized = ['$auth', this.isAuthorized.bind(this)];
  }

  configure() {
    this.$stateProvider

        .state('structure', {
          url: '/structure/:structureId',
          templateUrl: testChildTemplateUrl,
          controller: 'OneStructureCtrl as oneStruc'
        })

        .state('home', {
          url: '/home',

          templateUrl: templateChildTemplateUrl,
          controller: 'StructureCtrl as struc'
        })
        .state('home.values', {
          url: '/values/:structureId',
          views: {
            'home-values': {
              templateUrl: valuesTemplateUrl,
              controller: 'StructureCtrl as struc'
            }
          }
        })
      .state('test', {
        url: '/test',
        templateUrl: testTemplateUrl,
        controller: 'StructureCtrl as struc'

      });

    this.$urlRouterProvider.otherwise('test');
  }

  isAuthorized($auth) {
    return $auth.awaitUser();
  }
}

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

class RoutesRunner extends Runner {
  run() {
    this.$rootScope.$on('$stateChangeError', (...args) => {
      const err = _.last(args);

      if (err === 'AUTH_REQUIRED') {
        this.$state.go('login');
      }
    });
  }
}

RoutesRunner.$inject = ['$rootScope', '$state'];

export default [RoutesConfig, RoutesRunner];
