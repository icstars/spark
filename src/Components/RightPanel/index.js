import { Link } from 'react-router-dom';

function RightPanel() {
    return (
        <div class="main-header">
            <div class="logo-wrapper">
            </div>
            <nav class="main-nav">
                <ul class="main-nav-ul">
                    <li><Link to = "/">Home</Link></li>
                    <li><Link to ="/DepMetrics">Department metrics</Link></li>
                    {/* <li><Link to ="/"></Link></li> */}
                </ul>
            </nav>
        </div>
    );
}

export default RightPanel;
