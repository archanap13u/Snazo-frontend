import React from 'react';
import { useAuth } from '../context/AuthContext';
import { FaTrophy, FaCoins, FaInfoCircle } from 'react-icons/fa';
import './Rewards.css';

const Rewards = () => {
    const { currentUser } = useAuth();
    // Support both flattened and nested structures
    const userData = currentUser?.user || currentUser;
    const points = userData?.rewardPoints || 0;

    return (
        <div className="rewards-container">
            <div className="rewards-card">
                <div className="rewards-header">
                    <FaTrophy className="trophy-icon" />
                    <h1>My Reward Points</h1>
                </div>

                <div className="points-display">
                    <FaCoins className="coin-icon" />
                    <span className="points-value">{points}</span>
                    <span className="points-label">Points</span>
                </div>

                <div className="rewards-info">
                    <h3><FaInfoCircle /> How it works</h3>
                    <p>Earn points every time you order from SNAZO!</p>
                    <div className="conversion-rate">
                        <strong>₹100 Spent</strong>
                        <span className="arrow">→</span>
                        <strong>50 Points Earned</strong>
                    </div>
                </div>

                <button className="redeem-btn" onClick={() => alert("Coming Soon: Redeem your points for exciting discounts!")}>
                    Redeem Points
                </button>
            </div>
        </div>
    );
};

export default Rewards;
