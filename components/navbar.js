const username =  doesUserExist(getCurrentUser()).name.split(" ")[0];

class Navbar extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
        <header class="header">
        <a href="/GamesMenu/games.html" class="headerItem"><div>🕹️ Heimeshe Games</div></a>
        <div class="headerItem dropdownButton">
            <div>Hello, ${username} ⏬</div>
            <div class="dropdownMenu">
                <p>Profile</p>
                <p onclick="setCurrentUser()">Log out</p>
            </div>
        </div>
        </header>
        <div class="headerSpacer"></div>
        `
    }
}

customElements.define('custom-nav-bar', Navbar);
