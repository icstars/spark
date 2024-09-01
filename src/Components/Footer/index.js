import React from 'react';
import './footer-style.css';

function Footer() {
    return (
        <footer className="footer text-light py-4">
            <div className="container">
                <div className="row">
                    <div className="col-md-3">
                        <h5>Contact Information</h5>
                        <ul className="list-unstyled">
                            <li>
                                <a href="/Support-Contact" className="text-light" aria-label="Quick Links: Support Contact">
                                    Contact Us
                                </a>
                            </li>
                            <li>
                                <a href="/HR-Contact" className="text-light" aria-label="Quick Links: HR Contact">
                                    HR Contact
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="col-md-3">
                        <h5>Legal Information</h5>
                        <ul className="list-unstyled">
                            <li>
                                <a href="/Privacy-Policy" className="text-light" aria-label="Quick Links: Privacy Policy">
                                    Privacy Policy
                                </a>
                            </li>
                            <li>
                                <a href="/Terms-of-Service" className="text-light" aria-label="Quick Links: Terms of Service">
                                    Terms of Service
                                </a>
                            </li>
                            <li>
                                <a href="/Disclaimer" className="text-light" aria-label="Quick Links: Disclaimer">
                                    Disclaimer
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="col-md-3">
                        <h5>Company Information</h5>
                        <ul className="list-unstyled">
                            <li>
                                <a href="/Company-Name" className="text-light" aria-label="Quick Links: Company Name">
                                    Company Name
                                </a>
                            </li>
                            <li>
                                <a href="/Address" className="text-light" aria-label="Quick Links: Address">
                                    Address
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="col-md-3">
                        <h5>Accessibility and Help</h5>
                        <ul className="list-unstyled">
                            <li>
                                <a href="/Help-Center-Link" className="text-light" aria-label="Quick Links: Help Center Link">
                                    Help Center Link
                                </a>
                            </li>
                            <li>
                                <a href="/Accessibility-Features" className="text-light" aria-label="Quick Links: Accessibility Features">
                                    Accessibility Features
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="row mt-4">
                    <div className="col-md-3">
                        <h5>Social Media Links</h5>
                        <ul className="list-unstyled">
                            <li>
                                <a href="/Social-Media-Icon" className="text-light" aria-label="Quick Links: Social Media Icon">
                                    Social Media Icon
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="col-md-3">
                        <h5>Copyright Notice</h5>
                        <ul className="list-unstyled">
                            <li>
                                <a href="/Copyright-Statement" className="text-light" aria-label="Quick Links: Copyright Statement">
                                    Copyright Statement
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="col-md-3">
                        <h5>Application Version</h5>
                        <ul className="list-unstyled">
                            <li>
                                <a href="/Link-to-phone-app" className="text-light" aria-label="Quick Links: Link to phone app">
                                    Link to Phone App
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
