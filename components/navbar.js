let username = "Guest";
if (doesUserExist(getCurrentUser()).name){
    username = doesUserExist(getCurrentUser()).name.split(" ")[0];
}


class Navbar extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
        <header class="header">
        <a href="/GamesMenu/games.html" class="headerItem"><div>🕹️ Heimeshe Games</div></a>
        <div class="headerItem dropdownMenu">
            <div class="dropdownButton">Hello, ${username} ⏬</div>
            <div class="dropdownItem">
                <!--<p>Profile</p>-->
                <p onclick="setCurrentUser('getOut')">Log out</p>
            </div>
        </div>
        </header>
        <div class="headerSpacer"></div>
        `
    }
}

customElements.define('custom-nav-bar', Navbar);
