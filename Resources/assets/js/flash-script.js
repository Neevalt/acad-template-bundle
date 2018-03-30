import acadAlert from './alert';

$(() => {
    const flashes = $('#flashBag').data('flash');
    if (flashes) {
        for (const flash of flashes) {
            acadAlert(flash.type, flash.message);
        }
    }
});