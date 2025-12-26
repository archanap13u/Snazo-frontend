import React, { useState } from 'react';
import { FaCopy, FaCheckCircle } from 'react-icons/fa';
import './ReferralBanner.css';

const ReferralBanner = () => {
    const [copied, setCopied] = useState(false);

    // General app link that anyone can share
    const appLink = window.location.origin;

    const handleCopyLink = () => {
        navigator.clipboard.writeText(appLink);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <section className="referral-section-simple">
            <div className="referral-quote">
                "Good food is meant to be shared with good friends"
            </div>

            <div className="referral-link-container">
                <span className="referral-label">Share Snazo with your friends:</span>
                <div className="referral-link-wrapper">
                    <input
                        type="text"
                        value={appLink}
                        readOnly
                        className="referral-input"
                    />
                    <button
                        onClick={handleCopyLink}
                        className={`copy-button ${copied ? 'copied' : ''}`}
                        title="Copy to clipboard"
                    >
                        {copied ? <FaCheckCircle /> : <FaCopy />}
                    </button>
                </div>
            </div>
        </section>
    );
};

export default ReferralBanner;
