export default function acadAlert(type, message) {
    const $toasts = $('#acadToasts');
    const lightColors = ['primary', 'secondary', 'success', 'danger', 'info', 'dark'];
    let text = 'dark';
    if (lightColors.includes(type)) {
        text = 'light';
    }
    const regx = /^(#(.+?)#)?(.*)$/g;
    const match = regx.exec(message);
    let content;
    if (match[3] && match[2]) {
        content = `<div class="title">${match[2]}</div>${match[3]}`;
    } else if (match[3]) {
        content = match[3];
    }
    const result = `<div class="alert alert-dismissible acad-resultAlert text-${text} bg-${type}">
                                <button type="button" class="close" data-dismiss="alert">×</button>
                                ${content}
                            </div>`;
    $toasts.append(result);
    const $alert = $('.acad-resultAlert').last();
    $alert.hide();
    $alert.slideDown(400).delay(4000).slideUp();
    setTimeout(() => {
        $alert.remove();
    }, 4800);
}