import { useContext, useEffect, useState } from "react";
import { Button, Icon, Item } from "semantic-ui-react";
import { UserContext } from "./UserContext";

export function RentedList() {
    const { user } = useContext(UserContext);
    const [rents, setRented] = useState([]);
    useEffect(() => {
        fetch(`http://localhost:5555/rent?customer_id=${user.id}`)
            .then((res) => res.json())
            .then((data) => setRented(data))
            .catch((err) => console.error(err));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onDeleteClicked = (rent_id) => {
        fetch(`http://localhost:5555/rent/${rent_id}`, {
            method: "delete",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                customer_id: user.id,
            }),
        })
            .then(() =>
                setRented((curr_rented) =>
                    curr_rented.filter((d) => d.id !== rent_id)
                )
            )
            .catch((err) => console.error(err));
    };

    return (
        <>
            {rents.map((rent) => {
                const bp = rent.baby_product;
                return (
                    <Item.Group
                        key={rent.id}
                        className="bg-slate-50 rounded-lg shadow-md p-4 border-gray-100"
                    >
                        <Item className="items-center">
                            <Item.Image
                                size="tiny"
                                src={bp.image}
                                className="rounded-full overflow-hidden"
                            />

                            <Item.Content className="relative">
                                <Item.Header>{bp.name}</Item.Header>
                                <Item.Meta>{bp.age_group}</Item.Meta>
                                <Item.Description>
                                    {bp.details}
                                </Item.Description>

                                <Item.Meta>{bp.price}</Item.Meta>
                                <Button
                                    circular
                                    icon
                                    className="absolute top-0 right-0"
                                    onClick={() => onDeleteClicked(rent.id)}
                                >
                                    <Icon className="close" />
                                </Button>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                );
            })}
        </>
    );
}
