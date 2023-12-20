import { Button, Card, Form, Image, Rating, TextArea } from 'semantic-ui-react';
import './Home.css';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from './UserContext';
import { NavLink } from 'react-router-dom';

// const imgSrc = [
//     'https://www.littlebabygear.com/wp-content/uploads/2020/08/UPPAbaby-2020-Bassinet-For-VISTA-V2.jpg',
//     'https://assets.wfcdn.com/im/16365687/resize-h445%5Ecompr-r85/2556/255670482/Haruyo+Convertible+Crib%2FFull+Size+Bed+with+Drawers+and+3+Height+Options.jpg',
//     'https://media-cldnry.s-nbcnews.com/image/upload/t_fit-1500w,f_auto,q_auto:best/newscms/2019_20/1438247/babies-sitting-devices-today-main-190517.jpg',
//     'https://www.adenandanais.com/media/wysiwyg/ABCM10001_20-baby-3-in-1-transition-seat_1.jpg?format=jpg&quality=90',
//     'https://m.media-amazon.com/images/W/MEDIAX_792452-T1/images/I/61IO9P6V0lL._AC_SX679_.jpg',
//     'https://cdn.shopify.com/s/files/1/0551/4244/9317/products/little-hoppa-3-in-1-bouncer-4_1024x1024.jpg',
//     'https://m.media-amazon.com/images/W/MEDIAX_792452-T1/images/I/91VAHFdMkFL._AC_SX679_.jpg',
//     'https://www.tradeinn.com/f/13915/139155669_5/ingenuity-simple-comfort-everston-baby-swing.jpg',
//     'https://d1awg155xx98w6.cloudfront.net/photos/40/87/530213_19039_XL.jpg',
//     'https://www.happiestbaby.com/cdn/shop/files/pdp_image_snoo_2_grande.png?v=1698443556',
//     'https://images.fastcompany.net/image/upload/w_1280,f_auto,q_auto,fl_lossy/wp-cms/uploads/2022/07/07-90765439-snoo-the-dollar1500-robotic-bassinet-may-soon-be-covered-by-insurance.jpg',
//     'https://www.modernnursery.com/cdn/shop/files/venice-child-california-dreaming-bassinet-white-wood-10_1400x.jpg?v=1691162366',
// ];

const Reviews = () => {
    // const randomIndexSet = new Set();
    // while (randomIndexSet.size < 4) {
    //     const randomVal = Math.random();
    //     const randomIndex = parseInt(randomVal * imgSrc.length);
    //     if (randomIndex >= imgSrc.length) continue;
    //     randomIndexSet.add(randomIndex);
    // }
    // const review_images = [...randomIndexSet].map(idx => imgSrc[idx]);
    const [reviews, setReviews] = useState([]);
    const [stars, setStars] = useState(5);
    const { user } = useContext(UserContext);
    useEffect(() => {
        fetch('http://localhost:5555/reviews')
            .then(res => res.json())
            .then(data => setReviews(data));
    }, []);
    const onNewReview = (e, data) => {
        console.log('on new review', { e, data, value: e.target.review.value });
        fetch('http://localhost:5555/reviews', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                comments: e.target.review.value,
                rate: stars,
                customer_id: user.id,
            }),
        })
            .then(res => res.json())
            .then(data => {
                console.log('new review', data);
                setReviews([...reviews.splice(0, 2), data]);
                e.target.review.value = '';
            });
    };
    return (
        <Card.Group itemsPerRow={4} className='px-16 review flex flex-row'>
            {reviews.map(review => {
                return (
                    <Card key={review.id}>
                        {/* <Card.Content className="relative"> */}
                        <div className='relative w-full h-1/2 p-2'>
                            <Image src={'review2.png'} centered size='large' />

                            <div className='absolute inset-0 flex only-hover p-2'>
                                {review.comments}
                            </div>
                            <div className='absolute w-24 h-8 right-4 bottom-2 text-right only-hover text-shadow'>
                                <Rating
                                    icon='star'
                                    defaultRating={review.rate}
                                    maxRating={5}
                                    disabled
                                />
                            </div>
                        </div>
                        {/* </Card.Content> */}
                    </Card>
                );
            })}

            <Card>
                {/* <Card.Content className="relative"> */}
                <div className='w-full h-max p-2 min-h-fit'>
                    {user.name ? (
                        <Form onSubmit={onNewReview}>
                            <TextArea
                                name='review'
                                placeholder='Tell us your experience'
                            />
                            <div className='flex lg:flex-row justify-end items-center pt-2 pr-2 sm:flex-col'>
                                <Rating
                                    icon='star'
                                    defaultRating={5}
                                    maxRating={5}
                                    onRate={(e, data) => {
                                        setStars(data.rating);
                                    }}
                                    className='m-4'
                                />
                                <Button color='teal' type='submit'>
                                    Submit
                                </Button>
                            </div>
                        </Form>
                    ) : (
                        <div>
                            <Image src={'review2.png'} centered size='large' />
                            <div className='absolute inset-0 flex items-center justify-center '>
                                <NavLink to='/login' className='text-center'>
                                    Please login <br />
                                    to write a review
                                </NavLink>
                            </div>
                        </div>
                    )}
                </div>
                {/* </Card.Content> */}
            </Card>
        </Card.Group>
    );
};

export default Reviews;
