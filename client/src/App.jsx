import styles from "./App.module.css";
import "./App.css";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Home } from "./Home";
import { BabyProducts } from "./BabyProducts";
import { HowItWorks } from "./HowItWorks";
import { TrustAndSafety } from "./Trust&Safety";
import { AdminHome } from "./AdminHome";
import Rent from "./Rent";
import { Rented } from "./Rented";
import { AdminLogin } from "./AdminLogIn";
import Header from "./Header";
import { Login } from "./Login";

// const styles = {
//     app: 'app_djslfjld',
//     bigText: 'bigText_djsklfjds'
// }

// function App() {
//     return (
//         <>
//             <div className="w-full h-screen bg-red-500 text-red-900">
//                 <div className={styles.app}>
//                     <Header>Hi, overridden</Header>
//                 </div>
//             </div>
//         </>
//     );
// }

// export default App;

function App() {
    const [babyprouduct, setbabyprouduct] = useState([]);
    useEffect(() => {
        fetch("http://localhost:5555/baby_products")
            .then((res) => res.json())
            .then((data) => setbabyprouduct(data));
    }, []);

    return (
        <div className="app">
            <Header />
            <main>
                <Routes path="/">
                    <Route index element={<Home />} />
                    <Route path="home" element={<Home />} />
                    <Route path="baby_products" element={<BabyProducts />} />
                    <Route path="how_it_works" element={<HowItWorks />} />
                    <Route
                        path="trust_and_safety"
                        element={<TrustAndSafety />}
                    />
                    <Route
                        path="admin/*"
                        element={
                            <>
                                <Routes path="/">
                                    <Route index element={<AdminLogin />} />
                                    <Route
                                        path="home"
                                        element={<AdminHome />}
                                    />
                                </Routes>
                            </>
                        }
                    />
                    <Route path="login" element={<Login />} />
                    <Route path="rent/:id" element={<Rent />} />
                    <Route path="Rented/:confirmationId" element={<Rented />} />
                </Routes>
            </main>
        </div>
    );
}

export default App;
