angular.module('alurapic').controller('FotosController', function($scope, $http, $location, $routeParams) {
  	$scope.fotos = [];
  	$scope.filtro = '';

    $scope.foto = {};
    $scope.mensagem = '';

  	$http.get('/v1/fotos')
    .success(function(retorno) {
        console.log(retorno);
        $scope.mensagem = '';
        $scope.fotos = retorno; 
    })
    .error(function(erro) {
        console.log(erro);
    });

    if($routeParams.fotoId) {
            $http.get('/v1/fotos/' + $routeParams.fotoId)
            .success(function(foto) {
                $scope.foto = foto;
            })
            .error(function(erro) {
                console.log(erro);
                $scope.mensagem = 'Não foi possível obter a foto'
            });
        }

    $scope.submeter = function() {

            if ($scope.formulario.$valid) {

                if($routeParams.fotoId) {
                    $http.put('/v1/fotos/' + $scope.foto._id, $scope.foto)
                    .success(function() {
                        $scope.mensagem = 'Foto ' + $scope.foto.titulo + ' foi alterada';
                    })
                    .error(function(erro) {
                        console.log(erro);
                        $scope.mensagem = 'Não foi possível alterar a foto ' + $scope.foto.titulo;
                    });
                } 
                else {                
                    $http.post('/v1/fotos', $scope.foto)
                    .success(function() {
                        $scope.foto = {};
                        $scope.mensagem = 'Foto cadastrada com sucesso';
                        $location.path('/fotos');
                        console.log($scope.mensagem);
                    })
                    .error(function(erro) {
                        console.log(erro);
                        $scope.mensagem = 'Não foi possível cadastrar a foto';
                    })
                }
            }
        };

    $scope.remover = function(foto) {

        $http.delete('/v1/fotos/' + foto._id)
        .success(function() {
            var indiceDaFoto = $scope.fotos.indexOf(foto);
            $scope.fotos.splice(indiceDaFoto, 1);
            $scope.mensagem = 'Foto ' + foto.titulo + ' removida com sucesso!';

        })
        .error(function(erro) {
            console.log(erro);
            $scope.mensagem = 'Não foi possível apagar a foto ' + foto.titulo;
        });
    };

});

