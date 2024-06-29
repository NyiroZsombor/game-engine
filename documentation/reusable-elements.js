class NavBar extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <h2 class="nav-title">Modules and Classes</h2>
        <ul class="module-ul">
            <li>
                <div class="module-ul-title">Introduction</div>
                <ul class="class-ul">
                    <li  class="class-li"><a href="basics.html" class="class-links">The basics</a></li>
                    <!--<li  class="class-li"><a href="other.html" class="class-links">Other</a></li>-->
                </ul>
            </li>
        </ul>
        <ul class="module-ul">
            <li>
                <div class="module-ul-title">Default</div>
                <ul class="class-ul">
                    <li class="class-li"><a href="Action.html" class="class-links">Action</a></li>
                    <li class="class-li"><a href="Debug.html" class="class-links">Debug</a></li>
                    <li class="class-li"><a href="engine.html" class="class-links">The engine</a></li>
                    <li class="class-li"><a href="GameCanvas.html" class="class-links">GameCanvas</a></li>
                    <li class="class-li"><a href="Input.html" class="class-links">Input</a></li>
                </ul>
            </li>
        </ul>
        <ul class="module-ul">
            <li>
                <div class="module-ul-title">2D Objects</div>
                <ul class="class-ul">
                    <li class="class-li"><a href="Object2D.html" class="class-links">Object2D</a></li>
                    <li class="class-li"><a href="PhysicsObject2D.html" class="class-links">PhysicsObject2D</a></li>
                    <li class="class-li"><a href="Camera2D.html" class="class-links">Camera2D</a></li>
                </ul>
            </li>
        </ul>
        <ul class="module-ul">
            <div class="module-ul-title">UI (WORK IN PROGRESS)</div>
            <ul class="class-ul">
                <li class="class-li"><a href="ButtonComponent.html">ButtonComponent</a></li>
                <li class="class-li"><a href="TextComponent.html">TextComponent</a></li>
                <li class="class-li"><a href="UIComponent.html">UIComponent</a></li>
            </ul>
        </ul>
        `;
    }
}

customElements.define("nav-bar", NavBar);