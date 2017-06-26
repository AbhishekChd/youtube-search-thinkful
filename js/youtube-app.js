var YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';
var YOUTUBE_VIDEO_URL = 'https://www.youtube.com/watch?v=';
var API_KEY = 'AIzaSyAQRN9qalqw86alca3D24iXmFJFFE8YCxw';
var HTML_TEMPLATE = (
    '<div>'+
        '<figure>'+
            '<a class="popup-youtube"><img></a>'+
            '<figcaption></figcaption>'+
        '</figure>'+
    '</div>'
);
var modal = function(){
     $('div  .popup-youtube').magnificPopup({
		disableOn: 700,
		type: 'iframe',
		mainClass: 'mfp-fade',
		removalDelay: 160,
		preloader: false,

		fixedContentPos: false
	});
};
var renderItem = function(item){
    var template = $(HTML_TEMPLATE);
    template.find("img").attr({
        src: item.snippet.thumbnails.medium.url,
        alt: `${item.snippet.channelTitle} thumbnail image`
    });
    template.find("figcaption").text(item.snippet.channelTitle);
    template.find("a").attr({
        href: YOUTUBE_VIDEO_URL+ item.id.videoId
    });
    return template;
};

var displaySearchData = function(data){
    console.log(data);
    var results = data.items.map(function(item, index){
        return renderItem(item);
    });
    $('.js-search-results').html(results);
    modal();
};

var getDataFromApi = function(searchTerm, callback){
    $.ajax({
        url: YOUTUBE_SEARCH_URL,
        data: {
            key: API_KEY,
            q: searchTerm,
            part: 'snippet',
            maxResults: 25
        },
        type: 'GET',
        dataType: 'json',
        success: callback
    });
};

$(function(){

    $('form').submit(function(event){
        event.preventDefault();
        getDataFromApi($('#js-search-text').val(), displaySearchData);
        $('js-search-results').val();
    });
});
