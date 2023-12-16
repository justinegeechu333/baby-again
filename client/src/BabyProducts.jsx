import { useContext, useEffect, useState } from "react";
import { NavLink, useSearchParams } from "react-router-dom";
import { Grid, Header, Item } from "semantic-ui-react";
import { BabyProductContext } from "./BabyProductContext";

export function BabyProducts() {
    const { babyProducts } = useContext(BabyProductContext);
    const [categoryGroups, setCategoryGroup] = useState({});
    const [filters] = useSearchParams();
    const selectedCategories = (filters.get("category") ?? "")
        .split(",")
        .filter((v) => v);

    useEffect(() => {
        const allCategories = {};
        // reorganize babyProducts array to {category: [individual array]} format
        for (let item of babyProducts) {
            if (!allCategories[item.category]) {
                allCategories[item.category] = [];
            }
            // change categoryGroups to have {category: [item]}
            allCategories[item.category].push(item);
        }

        setCategoryGroup(allCategories);
    }, [babyProducts, setCategoryGroup]);

    const allCategories = Object.keys(categoryGroups); // ['crib', 'stroller', ...]

    const chosenCategories =
        selectedCategories.length === 0 ? allCategories : selectedCategories;

    return (
        <>
            <div className="mt-4"></div>
            <Header size="huge">Baby Products</Header>
            <section className="flex flex-col gap-16">
                {chosenCategories.map((category = "") => {
                    return (
                        <div key={category}>
                            <h1 className="text-2xl font-extrabold uppercase text-yellow-600 px-2 border-t-2 border-b-2 border-y-yellow-900 w-fit">
                                {category}
                            </h1>
                            <Grid columns="16" divided>
                                <Grid.Row>
                                    {categoryGroups[category].map((bp) => {
                                        return (
                                            <Grid.Column
                                                key={bp.id}
                                                className="gap-4 p-4"
                                                mobile="16"
                                                tablet="8"
                                                computer="4"
                                            >
                                                <NavLink
                                                    to={
                                                        `/baby_products/${bp.id}` /*"/baby_products/" + bp.id*/
                                                    }
                                                >
                                                    <Item.Group className="bg-slate-50 rounded-lg shadow-md p-4 border-gray-100">
                                                        <Item className="items-center">
                                                            <Item.Image
                                                                size="tiny"
                                                                src={bp.image}
                                                                className="rounded-full overflow-hidden"
                                                            />

                                                            <Item.Content>
                                                                <Item.Header>
                                                                    {bp.name}
                                                                </Item.Header>
                                                                <Item.Meta>
                                                                    {
                                                                        bp.age_group
                                                                    }
                                                                </Item.Meta>
                                                                <Item.Description>
                                                                    {bp.details}
                                                                </Item.Description>

                                                                <Item.Meta>
                                                                    {bp.price}
                                                                </Item.Meta>
                                                            </Item.Content>
                                                        </Item>
                                                    </Item.Group>
                                                </NavLink>
                                            </Grid.Column>
                                        );
                                    })}
                                </Grid.Row>
                            </Grid>
                        </div>
                    );
                })}
            </section>
        </>
    );
}
