(function() {
  'use strict';

  var movies = [];

  const renderMovies = function() {
    $('#listings').empty();

    for (const movie of movies) {
      const $col = $('<div>').addClass('col s6');
      const $card = $('<div>').addClass('card hoverable');
      const $content = $('<div>').addClass('card-content center');
      const $title = $('<h6>').addClass('card-title truncate');

      $title.attr({
        'data-position': 'top',
        'data-tooltip': movie.title
      });

      $title.tooltip({ delay: 50 }).text(movie.title);

      const $poster = $('<img>').addClass('poster');

      $poster.attr({
        src: movie.poster,
        alt: `${movie.poster} Poster`
      });

      $content.append($title, $poster);
      $card.append($content);

      const $action = $('<div>').addClass('card-action center');
      const $plot = $('<a>');

      $plot.addClass('waves-effect waves-light btn modal-trigger');
      $plot.attr('href', `#${movie.id}`);
      $plot.text('Plot Synopsis');

      $action.append($plot);
      $card.append($action);

      const $modal = $('<div>').addClass('modal').attr('id', movie.id);
      const $modalContent = $('<div>').addClass('modal-content');
      const $modalHeader = $('<h4>').text(movie.title);
      const $movieYear = $('<h6>').text(`Released in ${movie.year}`);
      const $modalText = $('<p>').text(movie.plot);

      $modalContent.append($modalHeader, $movieYear, $modalText);
      $modal.append($modalContent);

      $col.append($card, $modal);

      $('#listings').append($col);

      $('.modal-trigger').leanModal();
    }
  };

  // ADD YOUR CODE HERE

  $('.btn-large.waves-effect.waves-light').click(function(e){
    movies=[];
    var input = $("#search").val(); //get the title from input
    e.preventDefault();
    if( input.length === 0 ) {
      alert("No input!")
    } else {
    $.getJSON('http://www.omdbapi.com/?s=' + encodeURI(input)).then(function(response){
      var movies_collection = response.Search
      // console.log(movies_collection)
      for (var i=0;i<movies_collection.length;i++){
        var new_object = {
          id: movies_collection[i].imdbID ,
          poster:   movies_collection[i].Poster,
          title: movies_collection[i].Title,
          year: movies_collection[i].Year,
        }
          movies.push(new_object);
      }
      renderMovies();

      $('.waves-effect.waves-light.btn.modal-trigger').click(function(){
        var rule = new RegExp("#","ig");
        var getId = $(this).attr("href").replace(rule,"");
        console.log('http://www.omdbapi.com/?i=' + getId + '&plot=full')
        $.getJSON('http://www.omdbapi.com/?i=' + getId + '&plot=full', function(data) {
          $('.modal-content p').append(data.Plot);

          console.log(data.Plot);
        })



      })





    }) //End of JSON
  } // End of if statement


  })
})();
