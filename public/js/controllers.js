'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('AppCtrl', function ($scope, $http) {


  }).
  controller('MyCtrl1', function ($scope) {
    // write Ctrl here

  }).
  controller('MyCtrl2', function ($scope) {
    // write Ctrl here

  }).
  controller('BeerListController', function ($scope, $http) {
    // write Ctrl here
    
    $http({
        method : 'GET',
        url : '/api/beer'
    }).
    success(function(data, status, headers, config){
        $scope.cervejas = data;
        $scope.msg = 'Listagem finalizada.'
    }).
    error(function(data, status, headers, config){
        $scope.cervejas = 0;
        $scope.msg = 'Bar fechado.'
    });

  }).
  controller('BeerShowController', function ($scope, $http, $routeParams) {
    // write Ctrl here
    var id = $routeParams.id;
    
    $http({
        method : 'GET',
        url : '/api/beer/' + id
    }).
    success(function(data, status, headers, config){
        $scope.cerveja = data;
    }).
    error(function(data, status, headers, config){
        $scope.cervejas = 0;
        $scope.msg = 'Bar fechado.'
    });

    function showMessage(msg) {
        var msgAux = '';

        var interval = setInterval(function(){
            msgAux += msg[msgAux.length];
            $scope.msg = msgAux;
            $scope.$apply();

            if ( msgAux === msg ) {
                clearInterval(interval);

                setTimeout(function(){
                    $scope.msg = '';
                    $scope.$apply();
                }, 3000);
            }
        }, 100);

    }

    $scope.deletar = function() {
        var deletar = confirm('Pode deletar?');

        if (deletar) {
            $http({
                method : 'DELETE',
                url : '/api/beer/' + id,
            }).
            success(function(data, status, headers, config){
                showMessage('Cerveja ' + $scope.cerveja.name + ' deletada com sucesso');
                $scope.cerveja = {};
            }).
            error(function(data, status, headers, config){
                showMessage('Erro ao atualizar');
            });
        }

    };

    $scope.atualizar = function() {
        var dados = {
            name : $scope.cerveja.name,
            alcohol : $scope.cerveja.alcohol,
            price : $scope.cerveja.price,
            category : $scope.cerveja.category,
            description : $scope.cerveja.description
        };

        $http({
            method : 'PUT',
            url : '/api/beer/' + id,
            data : dados,
        }).
        success(function(data, status, headers, config){
            showMessage('Cerveja ' + $scope.cerveja.name + ' atualizada com sucesso');
        }).
        error(function(data, status, headers, config){
            showMessage('Erro ao atualizar');
        });
    }

  }).
  controller('BeerCreateController', function ($scope, $http) {
    // write Ctrl here
    // 
    function showMessage(msg) {
        var msgAux = '';

        var interval = setInterval(function(){
            msgAux += msg[msgAux.length];
            $scope.msg = msgAux;
            $scope.$apply();

            if ( msgAux === msg ) {
                clearInterval(interval);

                setTimeout(function(){
                    $scope.msg = '';
                    $scope.$apply();
                }, 3000);
            }
        }, 100);

    }
    
    $scope.criar = function() {
        $http({
            method : 'POST',
            url : '/api/beer',
            data : $scope.cerveja,
        }).
        success(function(data, status, headers, config){
            showMessage('Cerveja adicionada com sucesso');
        }).
        error(function(data, status, headers, config){
            showMessage('Erro ao adicionar');
        });
    }

  });
