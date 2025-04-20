'use client';
import './Details.css';
import React, { useState, useEffect } from 'react';
import Image from 'next/image'
import leftBee from '@/assets/bee (1).png';
import rightBee from '@/assets/TanBee (2).png';

export default function Details() {
    const [data, setData] = useState<any>(null);

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch('/api/studyspots/mlc');
            const result = await res.json();
            setData(result);
        };
        fetchData();
    }, []);

    if (!data) return <div>Loading...</div>;

    return (
        <div className="page-container">
            <section className="details">
                <Image src={leftBee} alt="Left bee" className="bee-left"/>

                <h2 className="title">{data.name}</h2>

                <div className="imageCard">
                    <Image src={data.image} alt="Study Room" width={400} height={250} />
                </div>

                <div className="rating-container">
                    {Array(Math.floor(data.rating)).fill('★').join(' ')}
                </div>

                <div className="location">
                    <h5>{data.location}</h5>
                </div>

                <p>{data.description}</p>

                <Image src={rightBee} alt="Right bee" className="bee-right"/>
            </section>
        </div>
    );
}