// 'use strict';

angular.module('chattyApp').factory('messageService', function($http) {
    return {
      getMessages: function () {
        return $http.get('http://localhost:9000/messages');
      },

      addMessage: function ( message, username ) {
        return $http.post('http://localhost:9000/messages', { message: message, username: username });
      }
    };
  });
