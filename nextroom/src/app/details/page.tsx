import './Details.css';
import React, { useState } from 'react';
// import mlc from '../../assets/MLC.png';

export default function Details() {
    return (
        <div className="page-container">
            {/* Details Content */}
            <section className="details">
                <img src="/bee-left.png" alt="Left bee" className="bee bee-left" />

                <h2 className="title">MLC</h2>

                <div className="imageCard">
                    <button className="arrow left">←</button>
                    <img src='/MLC.png' alt="Study Room" />
                    <button className="arrow right">→</button>
                </div>

                <div className="rating-container">
                    ★ ★ ★ ★ ☆
                </div>

                <p>
                    Miller Learning Center is a popular spot for studying, offering quiet
                    spaces, computer stations, and group study rooms. It's a great place for
                    both individual and collaborative work, especially if you need a quiet
                    environment.
                </p>

                <div className="down-arrow">⌄</div>
                <button type="button" className="detailsButton">Details</button>

                <img src="/TanBee(1).png" alt="Right bee" className="bee bee-right" />
            </section>
        </div>
    );
}
