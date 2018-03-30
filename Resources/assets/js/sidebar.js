$(() => {
    let sidebarIsOpen = false;
    const $navbar = $('#navbar');
    const $navbarContent = $('#acadNavbarContent');
    const $sidebar = $('#sidebar');
    const $overlay = $('#overlay');
    const $sidebarBrand = $('#sidebarBrand');
    const $sidebarIcon = $('#sidebarIcon');
    const $sidebarContent = $('#sidebarContent');

    const openSidebar = () => {
        $sidebarIcon.addClass('open');
        $sidebar.addClass('open');
        $overlay.fadeIn();
        sidebarIsOpen = true;
    };
    const closeSidebar = () => {
        $sidebarIcon.removeClass('open');
        $sidebar.removeClass('open');
        $overlay.fadeOut();
        sidebarIsOpen = false;
    };

    $sidebarBrand.click(() => {
        if (sidebarIsOpen) {
            closeSidebar();
        } else {
            openSidebar();
        }
    });

    $overlay.click(closeSidebar);

    if ($sidebar.hasClass('sidebar-collapse')) {
        $sidebarContent.html($navbarContent.html());
    }

    $('.dropdown-toggle').click((e) => {
        e.stopPropagation();
        const $this = $(e.currentTarget);
        const $dropdown = $this.parent('.dropdown');
        $this.toggleClass('active');
        $dropdown.find('.dropdown-menu').slideToggle();
        if ($dropdown.hasClass('active')) {
            setTimeout(() => {
                $dropdown.removeClass('active');
            }, 400);
        } else {
            $dropdown.addClass('active');
        }
    });
});