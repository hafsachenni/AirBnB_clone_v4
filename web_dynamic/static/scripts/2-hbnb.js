$(document).ready(function () {
    const amenity_dict = {};
    $('input[type="checkbox"]').change(function () {
        const data_id = $(this).attr('data-id');
        const data_name = $(this).attr('data-name');
        if ($(this).is(':checked')) {
            amenity_dict[data_id] = data_name;
        } else {
            delete amenity_dict[data_id];
        }
        const amenity_list = [];
        for (const amemity in amenity_dict) {
            amenity_list.push(amenity_dict[amemity]);
        }
        $('.amenities h4').text(amenity_list.join(', '));
    });
    $.get('http://0.0.0.0/:5001/api/v1/status/', function (data) {
        if (data.status === 'OK')
        {
            $('div#api_status').addClass('available');
        } else {
            $('div#api_status').removeClass('available');
        }
    });
});
