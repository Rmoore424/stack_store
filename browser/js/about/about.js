'use strict';
app.config(function ($stateProvider) {

    // Register our *about* state.
    $stateProvider.state('about', {
        url: '/about',
        controller: 'AboutController',
        templateUrl: 'js/about/about.html'
    });

});

app.controller('AboutController', function ($scope) {

    // Images of beautiful vaction areas.
    $scope.images = [
        'http://4.bp.blogspot.com/-7kf8sxhvoCo/T_h0sf-zXKI/AAAAAAAAAbg/-1QId7Zo-cQ/s1600/Wallpaper3_1024.jpg',
        'http://upload.wikimedia.org/wikipedia/commons/d/dc/PIA17944-MarsCuriosityRover-AfterCrossingDingoGapSanddune-20140209.jpg',
        'http://cdn1.buuteeq.com/upload/320/dsc-1575.jpg.1024x0.jpg',
        'http://allinclusivebermuda.net/wp-content/uploads/2013/08/2601865E-188B-3B72-2E59A3F39194F3B8.jpg'
    ];

    $scope.makers = ['Eric Gonzalo', 'Richard Moore', 'Alice Kindheart', 'Heather Pike'];

    function shuffleArray(array) {
        //Fisher-Yates shuffle
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
    };

    shuffleArray($scope.makers);
});