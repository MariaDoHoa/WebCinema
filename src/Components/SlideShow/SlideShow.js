import React, { useEffect, useState } from 'react'

export default function SlideShow() {
    const imgs = [
        { path: "../imgSlide/img1.jpg" },
        { path: "../imgSlide/img8.jpg" },
        { path: "../imgSlide/img3.jpg" },
        { path: "../imgSlide/img4.jpg" },
        { path: "../imgSlide/img11.jpg" },
        { path: "../imgSlide/img10.jpg" },
        { path: "../imgSlide/img9.jpg" },
    ]
    const [currentSlide, setCurrentSlide] = useState(0)
    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentSlide(() => currentSlide === imgs.length - 1 ? 0 : currentSlide + 1)
        }, 3000);
        return () => clearInterval(intervalId)
    }, [currentSlide])
    return (
        <div className='SlideShow'>
            <img src={imgs[currentSlide].path} />
        </div>
    )
}



