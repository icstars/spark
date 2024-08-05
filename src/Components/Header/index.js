function Header() {
    return (
        <div class="main-header">
            <div class="logo-wrapper">
                <div class="logo">
                    {/* <a style="text-decoration: none;" href="htmlpractice.html">
                        <img src="img/logo-min.png" alt="Website Logo"/>
                    </a> */}
                </div>
            </div>
            <input type="text" class="searchinput" placeholder="Search.."/>
                <nav class="main-nav">
                    <ul class="main-nav-ul">
                        <li><a href="htmlpractice.html">Home</a></li>
                        <li><a href="">About</a></li>
                        <li><a href="">Services</a></li>
                        <li><a href="">Contact</a></li>
                    </ul>
                </nav>
        </div>

    );
}


export default Header;
