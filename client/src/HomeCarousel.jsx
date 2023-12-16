import { useState } from "react";
import ReactSimplyCarousel from "react-simply-carousel";
const commonStyle = {
    width: "100vw",
    height: "fit-content",
};
export function HomeCarousel() {
    const [activeSlideIndex, setActiveSlideIndex] = useState(0);

    return (
        <div className="w-screen relative -ml-4">
            <ReactSimplyCarousel
                activeSlideIndex={activeSlideIndex}
                onRequestChange={setActiveSlideIndex}
                itemsToShow={1}
                itemsToScroll={1}
                forwardBtnProps={{
                    //here you can also pass className, or any other button element attributes
                    style: {
                        // alignSelf: "center",
                        background: "black",
                        border: "none",
                        borderRadius: "50%",
                        color: "white",
                        cursor: "pointer",
                        fontSize: "20px",
                        height: 30,
                        lineHeight: 1,
                        textAlign: "center",
                        width: 30,
                        position: "absolute",
                        top: "calc(50% - 10px)",
                        right: "10px",
                        zIndex: "10",
                    },
                    children: <span>{`>`}</span>,
                }}
                backwardBtnProps={{
                    //here you can also pass className, or any other button element attributes
                    style: {
                        // alignSelf: "center",
                        background: "black",
                        border: "none",
                        borderRadius: "50%",
                        color: "white",
                        cursor: "pointer",
                        fontSize: "20px",
                        height: 30,
                        lineHeight: 1,
                        textAlign: "center",
                        width: 30,
                        position: "absolute",
                        left: "10px",
                        top: "calc(50% - 10px)",
                        zIndex: "10",
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
                easing="linear"
            >
                <div style={{ ...commonStyle }}>
                    <div className="flex flex-col w-full gap-8">
                        {/* <embed src="/marketing-banner.mp4" width="100%" /> */}
                        <img
                            src="/banner-2.png"
                            className="w-full object-contain"
                        />
                    </div>
                </div>
                <div style={{ ...commonStyle }}>
                    <div className="flex flex-col w-full gap-8">
                        {/* <embed src="/marketing-banner.mp4" width="100%" /> */}
                        <img
                            src="/banner-2.png"
                            className="w-full object-contain"
                        />
                    </div>
                </div>
                <div style={{ ...commonStyle }}>
                    <div className="flex flex-col w-full gap-8">
                        {/* <embed src="/marketing-banner.mp4" width="100%" /> */}
                        <img
                            src="/banner-2.png"
                            className="w-full object-contain"
                        />
                    </div>
                </div>
            </ReactSimplyCarousel>
        </div>
    );
}
