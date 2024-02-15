function checkForThemeToApply() {
    if (getCookie("isLight")==="false") {
        const all = document.querySelectorAll("*, body")
        all.forEach(e => {
            e.classList.remove("light")
            e.classList.add("dark")
        })

        theme_button.classList.remove("fa-sun")
        theme_button.classList.add("fa-moon")
    } else {
        const all = document.querySelectorAll("*, body")
        all.forEach(e => {
            e.classList.remove("dark")
            e.classList.add("light")
        })

        theme_button.classList.remove("fa-moon")
        theme_button.classList.add("fa-sun")
    }
}

function setCookie(name, value) {
    // Check if cookie with the same name already exists
    var existingCookie = getCookie(name);
    if (existingCookie !== "") {
        // If cookie with the same name exists, remove it first
        document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    }
    
    var date = new Date();
    date.setFullYear(date.getFullYear() + 1); // Add one year to the current year
    date.setHours(23, 59, 59, 0); // Set time to midnight of the last day of the next year
    var expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

function getCookie(name) {
    var cookieName = name + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var cookieArray = decodedCookie.split(';');
    for (var i = 0; i < cookieArray.length; i++) {
        var cookie = cookieArray[i].trim();
        if (cookie.indexOf(cookieName) === 0) {
            return cookie.substring(cookieName.length, cookie.length);
        }
    }
    return "";
}



const theme_button = document.querySelector(".themebutton")

theme_button.addEventListener('click',function(){
    if (theme_button.classList.contains("dark")) {
        setCookie("isLight","true")
    } else {
        setCookie("isLight","false")
    }
    checkForThemeToApply()
})

checkForThemeToApply()
