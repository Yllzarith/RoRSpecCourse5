(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];
function LunchCheckController($scope) {
  // Init. message placeholder.
  $scope.lunch_check_msg = "";

  $scope.CheckLunches = function () {
    // Always clear the message when running the function.
    $scope.lunch_check_msg = "";
    // Warn user of no data if nothing entered.
    if ($scope.lunch_dishes === "" || $scope.lunch_dishes == null)
    {
      $scope.lunch_check_msg = "Please enter data first.";
    }
    // Do the things.
    else
    {
      // Init vars.
      var sc = SplitCount;
      $scope.lunch_check_msg = sc($scope.lunch_dishes) < 4 ? "Enjoy!" : "Too much!";
    }
  };

  // Return count of comma separated values (empty/null doesn't count).
  function SplitCount(_csv_string) {
    var lunch_count = 0;
    var arr_lunches = _csv_string.split(',');
    for (var i = 0; i < arr_lunches.length; ++i)
    {
      if (arr_lunches[i].trim() !== "" && !arr_lunches != null)
      {
        lunch_count++;
      }
    }

    return lunch_count;
  };
};

})();
