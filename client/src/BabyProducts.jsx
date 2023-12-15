import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Grid, Header, Item } from "semantic-ui-react";

export function BabyProducts({ babyProducts }) {
    const [categoryGroups, setCategoryGroup] = useState({});

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

    const categories = Object.keys(categoryGroups); // ['crib', 'stroller', ...]

    return (
        <>
            {categories.map((category) => {
                return (
                    <React.Fragment key={category}>
                        <Header size="large">{category}</Header>
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
                                                                {bp.age_group}
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
                    </React.Fragment>
                );
            })}
            {/* <Header size="large">Beds</Header>
            <Grid columns={3} divided>
                <Grid.Row>
                    {babyProducts.map((bp) => {
                        return (
                            <Grid.Column key={bp.id}>
                                <Header size="medium">{bp.name}</Header>
                                <Image src={bp.image} alt={bp.name} />
                            </Grid.Column>
                        );
                    })}
                </Grid.Row>
            </Grid>

            <Header size="large">Strollers</Header>
            <Grid columns={3} divided>
                <Grid.Row>
                    {babyProducts.map((bp) => {
                        return (
                            <Grid.Column key={bp.id}>
                                <Header size="medium">{bp.name}</Header>
                                <Image src={bp.image} alt={bp.name} />
                            </Grid.Column>
                        );
                    })}
                </Grid.Row>
            </Grid>

            <Header size="large">Swings & Bouncers</Header>
            <Grid columns={3} divided>
                <Grid.Row>
                    {babyProducts.map((bp) => {
                        return (
                            <Grid.Column key={bp.id}>
                                <Header size="medium">{bp.name}</Header>
                                <Image src={bp.image} alt={bp.name} />
                            </Grid.Column>
                        );
                    })}
                </Grid.Row>
            </Grid>

            <Header size="large">Car Seats</Header>
            <Grid columns={3} divided>
                <Grid.Row>
                    {babyProducts.map((bp) => {
                        return (
                            <Grid.Column key={bp.id}>
                                <Header size="medium">{bp.name}</Header>
                                <Image src={bp.image} alt={bp.name} />
                            </Grid.Column>
                        );
                    })}
                </Grid.Row>
            </Grid> */}
        </>
    );
}
