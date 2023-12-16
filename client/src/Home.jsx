// import { HomeCarousel } from "./HomeCarousel";

import { Card, Header, Image, Rating } from "semantic-ui-react";
import "./Home.css";
import { HomeCarousel } from "./HomeCarousel";
import { NavLink } from "react-router-dom";

const imgSrc = [
    "https://www.littlebabygear.com/wp-content/uploads/2020/08/UPPAbaby-2020-Bassinet-For-VISTA-V2.jpg",
    "https://assets.wfcdn.com/im/16365687/resize-h445%5Ecompr-r85/2556/255670482/Haruyo+Convertible+Crib%2FFull+Size+Bed+with+Drawers+and+3+Height+Options.jpg",
    "https://media-cldnry.s-nbcnews.com/image/upload/t_fit-1500w,f_auto,q_auto:best/newscms/2019_20/1438247/babies-sitting-devices-today-main-190517.jpg",
    "https://m.media-amazon.com/images/W/MEDIAX_792452-T1/images/I/61IO9P6V0lL._AC_SX679_.jpg",
    "https://www.adenandanais.com/media/wysiwyg/ABCM10001_20-baby-3-in-1-transition-seat_1.jpg?format=jpg&quality=90",
    "https://cdn.shopify.com/s/files/1/0551/4244/9317/products/little-hoppa-3-in-1-bouncer-4_1024x1024.jpg",
    "https://m.media-amazon.com/images/W/MEDIAX_792452-T1/images/I/91VAHFdMkFL._AC_SX679_.jpg",
    "https://www.tradeinn.com/f/13915/139155669_5/ingenuity-simple-comfort-everston-baby-swing.jpg",
    "https://d1awg155xx98w6.cloudfront.net/photos/40/87/530213_19039_XL.jpg",
    "https://www.happiestbaby.com/cdn/shop/files/pdp_image_snoo_2_grande.png?v=1698443556",
    "https://images.fastcompany.net/image/upload/w_1280,f_auto,q_auto,fl_lossy/wp-cms/uploads/2022/07/07-90765439-snoo-the-dollar1500-robotic-bassinet-may-soon-be-covered-by-insurance.jpg",
    "https://www.modernnursery.com/cdn/shop/files/venice-child-california-dreaming-bassinet-white-wood-10_1400x.jpg?v=1691162366",
];

export function Home() {
    const categories = [
        [
            "strollers",
            "https://www.littlebabygear.com/wp-content/uploads/2020/08/UPPAbaby-2020-Bassinet-For-VISTA-V2.jpg",
        ],
        [
            "beds",
            "https://assets.wfcdn.com/im/16365687/resize-h445%5Ecompr-r85/2556/255670482/Haruyo+Convertible+Crib%2FFull+Size+Bed+with+Drawers+and+3+Height+Options.jpg",
        ],
        [
            "swings/bouncers",
            "https://media-cldnry.s-nbcnews.com/image/upload/t_fit-1500w,f_auto,q_auto:best/newscms/2019_20/1438247/babies-sitting-devices-today-main-190517.jpg",
        ],
        [
            "car seat",
            "https://m.media-amazon.com/images/W/MEDIAX_792452-T1/images/I/61IO9P6V0lL._AC_SX679_.jpg",
        ],
        [
            "recreation",
            "https://www.adenandanais.com/media/wysiwyg/ABCM10001_20-baby-3-in-1-transition-seat_1.jpg?format=jpg&quality=90",
        ],
        [
            "strollers",
            "https://cdn.shopify.com/s/files/1/0551/4244/9317/products/little-hoppa-3-in-1-bouncer-4_1024x1024.jpg",
        ],
        [
            "beds",
            "https://m.media-amazon.com/images/W/MEDIAX_792452-T1/images/I/91VAHFdMkFL._AC_SX679_.jpg",
        ],
        [
            "swings/bouncers",
            "https://www.tradeinn.com/f/13915/139155669_5/ingenuity-simple-comfort-everston-baby-swing.jpg",
        ],
        [
            "car seat",
            "https://d1awg155xx98w6.cloudfront.net/photos/40/87/530213_19039_XL.jpg",
        ],
        [
            "recreation",
            "https://www.happiestbaby.com/cdn/shop/files/pdp_image_snoo_2_grande.png?v=1698443556",
        ],
        [
            "strollers",
            "https://images.fastcompany.net/image/upload/w_1280,f_auto,q_auto,fl_lossy/wp-cms/uploads/2022/07/07-90765439-snoo-the-dollar1500-robotic-bassinet-may-soon-be-covered-by-insurance.jpg",
        ],
        [
            "beds",
            "https://www.modernnursery.com/cdn/shop/files/venice-child-california-dreaming-bassinet-white-wood-10_1400x.jpg?v=1691162366",
        ],
    ];

    const randomIndexSet = new Set();
    while (randomIndexSet.size < 4) {
        const randomVal = Math.random();
        const randomIndex = parseInt(randomVal * imgSrc.length);
        if (randomIndex >= imgSrc.length) continue;
        randomIndexSet.add(randomIndex);
    }
    const review_images = [...randomIndexSet].map((idx) => imgSrc[idx]);

    return (
        <div className="w-full">
            <HomeCarousel />

            <div className="mt-16"></div>
            <Header as="h2" icon textAlign="center">
                <Header.Content>---Come Shop With Us---</Header.Content>
            </Header>

            <Card.Group itemsPerRow={6} className="px-16 category">
                {categories.map(([category, image]) => {
                    return (
                        <Card key={image} raised className="relative ">
                            <img
                                src={image}
                                className="aspect-square object-cover w-full h-full"
                            />
                            <NavLink
                                to={`/baby_products?${new URLSearchParams({
                                    category,
                                })}`}
                            >
                                <div className="absolute inset-0 flex items-center justify-center text-shadow text-white hover:text-4xl transition-all overflow-hidden">
                                    {category}
                                </div>
                            </NavLink>
                        </Card>
                        // <Card
                        //     key={image}
                        //     raised
                        //     image={image}
                        //     className="my-auto"
                        // />
                    );
                })}
            </Card.Group>
            <div className="mt-16"></div>
            <Header as="h2" icon textAlign="center">
                <Header.Content>---What Our Moms Say---</Header.Content>
            </Header>

            <Card.Group itemsPerRow={4} className="px-16 review">
                {review_images.map((image) => {
                    return (
                        <Card key={image}>
                            {/* <Card.Content className="relative"> */}
                            <div className="relative w-full h-full p-2">
                                <Image src={image} centered size="large" />

                                <div className="absolute inset-0 flex items-center justify-center only-hover">
                                    dsjflsjdlfsjd
                                </div>
                                <div className="absolute w-24 h-8 right-4 bottom-2 text-right only-hover text-shadow">
                                    <Rating
                                        icon="star"
                                        defaultRating={3}
                                        maxRating={5}
                                        disabled
                                    />
                                </div>
                            </div>
                            {/* </Card.Content> */}
                        </Card>
                    );
                })}
            </Card.Group>
        </div>
    );
}
