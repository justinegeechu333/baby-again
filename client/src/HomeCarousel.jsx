import { useState } from "react";
import ReactSimplyCarousel from "react-simply-carousel";
const commonStyle = {
    width: "100vw",
    height: "400px",
};
export function HomeCarousel() {
    const [activeSlideIndex, setActiveSlideIndex] = useState(0);
    return (
        <div className="w-full relative">
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
                {/* here you can also pass any other element attributes. Also, you can use your custom components as slides */}
                <div style={{ ...commonStyle, background: "#ff80ed" }}>
                    slide 0
                </div>
                <div style={{ ...commonStyle, background: "#065535" }}>
                    slide 1
                </div>
                <div style={{ ...commonStyle, background: "#000000" }}>
                    slide 2
                </div>
                <div style={{ ...commonStyle, background: "#133337" }}>
                    slide 3
                </div>
                <div style={{ ...commonStyle, background: "#ffc0cb" }}>
                    slide 4
                </div>
                <div style={{ ...commonStyle, background: "#ffffff" }}>
                    slide 5
                </div>
                <div style={{ ...commonStyle, background: "#ffe4e1" }}>
                    slide 6
                </div>
                <div style={{ ...commonStyle, background: "#008080" }}>
                    slide 7
                </div>
                <div style={{ ...commonStyle, background: "#ff0000" }}>
                    slide 8
                </div>
                <div style={{ ...commonStyle, background: "#e6e6fa" }}>
                    slide 9
                </div>
            </ReactSimplyCarousel>
        </div>
    );
}
