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

    // $scope.makers = ['Eric', 'Richard', 'Alice', 'Heather'];

    // var awesome_adj = ['awesome','breathtaking','amazing','sexy','sweet','cool','wonderful','mindblowing'];

    // var randArrayEl = function(arr) {
    //     return arr[Math.floor(Math.random() * arr.length)];
    // };

    // $scope.nameAwesome = function(){
    //     return 
    // }
});