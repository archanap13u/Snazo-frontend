import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { FaShareAlt, FaCopy, FaCheck } from 'react-icons/fa';
import './Referral.css';

const Referral = () => {
    const { currentUser } = useAuth();
    const userData = currentUser?.user || currentUser;
    const referralCode = userData?.referralCode || "GETCODE";
    const [copied, setCopied] = useState(false);

    const referralLink = `${window.location.origin}/#/register?ref=${referralCode}`;

    const handleCopy = () => {
        navigator.clipboard.writeText(referralLink);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="referral-container">
            <div className="referral-card">
                <div className="referral-header">
                    <FaShareAlt className="share-large-icon" />
                    <h1>Refer & Earn</h1>
                </div>

                <p className="referral-description">
                    Invite your friends to SNAZO and earn extra reward points when they make their first purchase!
                </p>

                <div className="referral-section">
                    <label>Your Referral Code</label>
                    <div className="code-box">
                        {referralCode}
                    </div>
                </div>

                <div className="referral-section">
                    <label>Share Your Link</label>
                    <div className="link-box">
                        <input type="text" value={referralLink} readOnly />
                        <button className="copy-btn" onClick={handleCopy}>
                            {copied ? <FaCheck style={{ color: '#4CAF50' }} /> : <FaCopy />}
                        </button>
                    </div>
                    {copied && <span className="copied-toast">Copied to clipboard!</span>}
                </div>

                <div className="referral-steps">
                    <div className="step">
                        <div className="step-num">1</div>
                        <p>Share link with friends</p>
                    </div>
                    <div className="step">
                        <div className="step-num">2</div>
                        <p>They join SNAZO</p>
                    </div>
                    <div className="step">
                        <div className="step-num">3</div>
                        <p>You get bonus points!</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Referral;
