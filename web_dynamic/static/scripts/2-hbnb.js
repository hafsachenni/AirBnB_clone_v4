$(document).ready(function() {
    const checkedAmenities = {};
    $("input[type='checkbox']").change(function () { 
        const get_id = $(this).attr('data-id');
        const get_name = $(this).attr('data-name');
        if ($(this).is(':checked')) {
            checkedAmenities[get_id] = get_name;
        }
        else {
            delete checkedAmenities[get_id];
        }

        const all_amenities = [];
        for (const amenity in checkedAmenities) {
            all_amenities.push(checkedAmenities[amenity]);
        }
        $('.amenities h4').text(all_amenities.join(', '));

    });
    $.ajax( {
        url: 'http://0.0.0.0:5001/api/v1/status/',
        method: 'GET',
        success: function(response){
            if (response.status === 'OK') {
                $('div#api_status').addClass('available');
            }
            else {
                $('div#api_status').removeClass('available');
            }
        },
    });
});
