import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Home } from './Home';
import { BabyProducts } from './BabyProducts';
import { AdminHome } from './AdminHome';
import { Rent } from './Rent';
import Rented from './Rented';
import AdminLogin from './AdminLogIn';
import Header from './Header';
import Login from './Login';
import SignUp from './SignUp';
import { UserContext } from './UserContext';
import { Profile } from './Profile';
import { BabyProductContext } from './BabyProductContext';
import Footer from './Footer';
import './App.css';
function App() {
    const [babyProducts, setBabyProducts] = useState([]);
    const [user, setUser] = useState({});
    useEffect(() => {
        fetch('http://localhost:5555/baby_products')
            .then(res => res.json())
            .then(data => setBabyProducts(data));
    }, []);

    return (
        <div>
            <UserContext.Provider value={{ user, setUser }}>
                <BabyProductContext.Provider
                    value={{ babyProducts, setBabyProducts }}
                >
                    <Header />
                    <main className='px-4'>
                        <Routes>
                            <Route index element={<Home />} />
                            <Route path='home' element={<Home />} />
                            <Route
                                path='baby_products/*' // /baby_products/1/other
                                element={
                                    <Routes>
                                        <Route
                                            index
                                            element={
                                                <BabyProducts
                                                    babyProducts={babyProducts}
                                                />
                                            }
                                        />
                                        <Route
                                            path=':product_id'
                                            element={
                                                <Rent
                                                    a='1'
                                                    b='2'
                                                    babyProducts={babyProducts}
                                                />
                                            }
                                        />
                                    </Routes>
                                }
                            />
                            <Route
                                path='admin/*'
                                element={
                                    <Routes path='/'>
                                        <Route index element={<AdminLogin />} />
                                        <Route
                                            path='home'
                                            element={<AdminHome />}
                                        />
                                    </Routes>
                                }
                            />
                            <Route path='login' element={<Login />} />
                            <Route path='sign-up' element={<SignUp />} />
                            {/* <Route path="rent/:id" element={<Rent />} />

                        <Route path="rented" element={<Rented />} /> */}
                            <Route path='profile' element={<Profile />} />
                            <Route
                                path='rented/:confirmationId'
                                element={<Rented />}
                            />
                        </Routes>
                    </main>
                    <Footer />
                </BabyProductContext.Provider>
            </UserContext.Provider>
        </div>
    );
}

export default App;
