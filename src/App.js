import './/reset.css';
import './/style.css';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div id="container">
          <div>
            <h1>Welcome to the Left 4 Dead 2 Remake Project!</h1>

            <p>As a longtime fan of Left 4 Dead 2, I’ve always been captivated by its incredible replayability and
              quality.
              The thrill of battling hordes of zombies with friends, discovering new strategies, and experiencing
              fresh
              challenges every time you play is unparalleled. This game has a special place in the hearts of many,
              and
              it’s this love for the game that inspired me to embark on an ambitious journey: remaking Left 4 Dead
              2
              using
              Unreal Engine 5.</p>
          </div>

          <div>
            <h2>Project Vision</h2>
            <p>My goal is to faithfully recreate the iconic maps and gameplay of Left 4 Dead 2 while leveraging the
              power of
              UE5 to enhance the visuals and overall experience. All textures are being meticulously redone to
              keep
              the
              original style intact but with a fresh, modern look. While the core of the game will remain the
              same, I
              am
              considering the addition of new features to further enrich the experience, though that’s still in
              the
              planning stages.</p>
          </div>

          <div>
            <h2>Current Focus</h2>

            <p>Right now, my primary focus is on remaking the maps. Each map is being carefully redesigned to
              maintain
              the
              beloved elements of the original while introducing improvements that take advantage of today’s
              <span class="decorator">technology</span>.
            </p>
          </div>

          <div>
            <h2>Stay Connected</h2>
            <p>I invite you to join me on this journey. Explore the site to learn more about the development
              process,
              view progress updates, and engage with the community of fellow Left 4 Dead fans. Together, we can
              celebrate the legacy of this great game and look forward to its exciting future.
            </p>
          </div>
          <div>
            <h2>Call to Action</h2>
            <p>Stay tuned for updates, and don’t hesitate to share your thoughts and feedback as we breathe new life
              into Left 4 Dead 2!</p>
          </div>

        </div>
        <section class="right-section">
          <a class="right-h3" href="videos.html">
            <h3 class="right-h3"> My latest videos:</h3>
          </a>

          <button id="resizeButton"></button>
           {/* <span id="personalname">X</span>  */}
        </section>
    
      </header >
    </div >
  );
}

export default App;
