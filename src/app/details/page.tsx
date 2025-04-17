import './Details.css';
import React, { useState } from 'react';
import Image from 'next/image'
import mlc from '@/assets/MLC.png';
import leftBee from '@/assets/bee (1).png';
import rightBee from '@/assets/TanBee (2).png';

export default function Details() {
    return (
        <div className="page-container">
            {/* Details Content */}
            <section className="details">
                <Image src={leftBee} alt="Left bee" className="bee bee-left" />

                <h2 className="title">MLC</h2>

                <div className="imageCard">
                    <button className="arrow left">←</button>
                    <Image src={mlc} alt="Study Room" />
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

                <Image src={rightBee} alt="Right bee" className="bee bee-right" />
            </section>
        </div>
    );
}
