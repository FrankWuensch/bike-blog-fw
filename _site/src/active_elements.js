document.addEventListener("DOMContentLoaded", function() {
    const navLinks = document.querySelectorAll(".link-title");
    const baseurl = "/bike-blog-fw/";
    const home = navLinks[0];
    const homeLink = home.pathname;
    let actualLink = window.location.pathname;
    console.log(baseurl, actualLink);
    navLinks.forEach((navLink) => {
        if (navLink.pathname === actualLink) {
            navLink.classList.add("active");
        } else {
            navLink.classList.remove("active");
        }
        if (actualLink === homeLink) {
            home.classList.add("active");
        }
    });
});