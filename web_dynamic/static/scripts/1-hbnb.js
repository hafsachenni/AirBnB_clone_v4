$(document).ready(function() {
    const checkedAmenities = {};
    $("input[type='checkbox']").change(function () { 
        const get_id = $(this).attr('data-id');
        const get_name = $(this).attr('data-name');
        if ($(this).is(':checked')) {
            checkedAmenities = get_id;
        }

        const all_amenities = [];
        for (const amenity in checkedAmenities) {
            all_amenities.push(checkedAmenities[amenity]);
        }
        $('.amenities h4').text(all_amenities.join(', '));

    });
});
