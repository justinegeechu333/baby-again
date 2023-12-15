import { useContext } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { Button, Item } from "semantic-ui-react";
import { UserContext } from "./UserContext";

export function Rent({ babyProducts }) {
    const { product_id } = useParams();
    const { user } = useContext(UserContext);
    const user_id = 1;
    const selected = babyProducts.find((bp) => bp.id === Number(product_id));
    const navigate = useNavigate();
    const onRent = () => {
        fetch(`http://localhost:5555/rent/${product_id}`, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                customer_id: user_id,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log("rented:", data);
                navigate(`/rented/${data.id}`);
            });
    };
    return selected ? (
        <>
            <Item.Group className="bg-slate-50 rounded-lg shadow-md p-4 border-gray-100">
                <Item className="items-center">
                    <Item.Image
                        size="large"
                        src={selected.image}
                        className="rounded-full shadow-lg overflow-hidden"
                    />

                    <Item.Content>
                        <Item.Header>{selected.name}</Item.Header>
                        <Item.Meta>{selected.age_group}</Item.Meta>
                        <Item.Description>{selected.details}</Item.Description>

                        <Item.Meta>{selected.price}</Item.Meta>
                    </Item.Content>
                </Item>
            </Item.Group>
            <div className="w-full h-8 text-right">
                {user?.name ? (
                    <Button onClick={onRent}>Rent</Button>
                ) : (
                    <NavLink to="/login">
                        <Button>Rent</Button>
                    </NavLink>
                )}
            </div>
        </>
    ) : (
        "nothing"
    );
    // return (
    //     <div>
    //         {product_id}
    //         {babyProducts.map((bp) => (
    //             <div>{bp.name}</div>
    //         ))}
    //     </div>
    // );
}
