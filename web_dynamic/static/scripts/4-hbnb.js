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
    $.ajax({
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

    function placesSearch (filters = {}) {
    $.ajax({
    url: 'http://0.0.0.0:5001/api/v1/places_search/',
    method: 'POST',
    contentType: 'application/json',
    data: JSON.stringify(filters),
    success: function (data) {
        $('section.places').empty();
        for (let i = 0; i < data.length; i++) {
            const place = data[i];
            const structuredHtml = `<article>
                <div class="title_box">
                    <h2>${place.name}</h2>
                    <div class="price_by_night">$${place.price_by_night}</div>
                </div>
                <div class="information">
                    <div class="max_guest">${place.max_guest} Guest${place.max_guest !== 1 ? 's' : ''}</div>
                    <div class="number_rooms">${place.number_rooms} Bedroom${place.number_rooms !== 1 ? 's' : ''}</div>
                    <div class="number_bathrooms">${place.number_bathrooms} Bathroom${place.number_bathrooms !== 1 ? 's' : ''}</div>
                </div>
                <div class="description">
                    ${place.description}
                </div>
            </article>`; 
            $('section.places').append(structuredHtml);
        }
    }
    });
    };
    $('button').on("click", function() {
        const filters = {amenities: Object.keys(checkedAmenities)};
        placesSearch(filters);
    });
    placesSearch();
});
