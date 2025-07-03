document.addEventListener("DOMContentLoaded", function() {
    const navLinks = document.querySelectorAll(".link-title");
    let baseurl = "";
    const home = navLinks[0];
    const homeLink = baseurl + home.pathname;
    let actualLink = baseurl + window.location.pathname;
    navLinks.forEach((navLink) => {
        if (navLink.pathname === actualLink) {
            navLink.classList.add("active");
        } else {
            navLink.classList.remove("active");
        }
        if (actualLink === homeLink || actualLink === baseurl + "/") {
            home.classList.add("active");
        }
    });
});