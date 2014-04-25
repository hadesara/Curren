describe("Unit: Testing Index Controller", function() {
  beforeEach(function() {
    module = angular.mock.module('App');
  });
  it("should be registered", function() {
      expect(module).not.to.equal(null);
    });
    it('should have a IndexCtrl controller', function() {
      expect(App.IndexCtrl).not.to.equal(null);
    });

      it('should have a properly working IndexCtrl controller'
          , inject(function($rootScope, $controller, $httpBackend) {
        $httpBackend.when('GET','/api/convert/USD/INR/1').respond({"convertedValue" :"60.21465"});

         var $scope = $rootScope.$new();
        var ctrl = $controller('indexCtrl', {
          $scope : $scope
        });
        currency = 
          {
            from:"USD",
            to: "INR",
            value: "1"
          };
        $scope.convert(currency);
        $httpBackend.flush();
        expect($scope.convertedValue).to.equal(60.21465);
    }));
      var trans = [{"TransactionDate":"2014-04-24","ProviderName":"Hiren","Type":"New",
              "PaymentStatus":"A","Amount":"3344.92","currency":"INR"}];
      it('should call get transactions route and update the rootScope'
          , inject(function($rootScope, $controller, $httpBackend) {
        $httpBackend.when('GET','/api/transaction/USD').respond(trans);

         var $scope = $rootScope.$new();
        var ctrl = $controller('indexCtrl', {
          $scope : $scope
        });
        $scope.getTransactions("USD");
        $httpBackend.flush();
        console.log($scope.transactions); 
        expect($scope.transactions).to.equal(trans);
    }));

});