import { useEffect, useState } from 'react';
import ReactSimplyCarousel from 'react-simply-carousel';
import './HomeCarousel.css';

const commonStyle = {
    width: '100vw',
    height: 'fit-content',
};
export function HomeCarousel() {
    const [activeSlideIndex, setActiveSlideIndex] = useState(1);
    useEffect(() => {
        const id = setInterval(() => {
            setActiveSlideIndex(activeSlideIndex => (activeSlideIndex + 1) % 4);
        }, 3000);
        return () => {
            clearInterval(id);
        };
    });
    return (
        <div className='w-screen relative -ml-4 home-carousel'>
            <ReactSimplyCarousel
                activeSlideIndex={activeSlideIndex}
                onRequestChange={setActiveSlideIndex}
                itemsToShow={1}
                itemsToScroll={1}
                forwardBtnProps={{
                    //here you can also pass className, or any other button element attributes
                    className: 'move-button',
                    style: {
                        right: '10px',
                    },
                    children: <span>{`>`}</span>,
                }}
                backwardBtnProps={{
                    //here you can also pass className, or any other button element attributes
                    className: 'move-button',
                    style: {
                        left: '10px',
                    },
                    children: <span>{`<`}</span>,
                }}
                responsiveProps={[
                    {
                        itemsToShow: 1,
                        itemsToScroll: 1,
                        minWidth: 768,
                    },
                ]}
                speed={400}
                easing='linear'
            >
                <div style={{ ...commonStyle }}>
                    <div className='flex flex-col w-full gap-8'>
                        {/* <embed src="/marketing-banner.mp4" width="100%" /> */}
                        <img
                            src='/banner-2.png'
                            className='w-full object-contain'
                        />
                    </div>
                </div>
                <div style={{ ...commonStyle }}>
                    <div className='flex flex-col w-full gap-8'>
                        {/* <embed src="/marketing-banner.mp4" width="100%" /> */}
                        <img
                            src='modern-baby-products.png'
                            className='w-full object-contain'
                        />
                    </div>
                </div>
                <div style={{ ...commonStyle }}>
                    <div className='flex flex-col w-full gap-8'>
                        {/* <embed src="/marketing-banner.mp4" width="100%" /> */}
                        <img
                            src='floral-banner-design.png'
                            className='w-full object-contain'
                        />
                    </div>
                </div>
            </ReactSimplyCarousel>
        </div>
    );
}
