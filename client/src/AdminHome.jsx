import { useContext, useState } from 'react';
import { BabyProductContext } from './BabyProductContext';
import {
    Button,
    Header,
    Image,
    Input,
    Table,
    TextArea,
} from 'semantic-ui-react';

export function AdminHome() {
    const { babyProducts, setBabyProducts } = useContext(BabyProductContext);
    const onDeleteClick = id => {
        fetch(`http://localhost:5555/baby_products/${id}`, {
            method: 'DELETE',
        })
            .then(() => {
                setBabyProducts(curr => curr.filter(bp => bp.id !== id));
            })
            .catch(err => console.error(err));
    };
    const onUpdateClick = id => {
        const dataToUpdate = {};
        dataToUpdate['image'] = document.querySelector(
            `tr#row-${id} input[name="image"]`
        ).value;
        dataToUpdate['category'] = document.querySelector(
            `tr#row-${id} input[name="category"]`
        ).value;
        dataToUpdate['name'] = document.querySelector(
            `tr#row-${id} input[name="name"]`
        ).value;
        dataToUpdate['age_group'] = document.querySelector(
            `tr#row-${id} input[name="age_group"]`
        ).value;
        dataToUpdate['price'] = document.querySelector(
            `tr#row-${id} input[name="price"]`
        ).value;
        dataToUpdate['details'] = document.querySelector(
            `tr#row-${id} textarea[name="details"]`
        ).value;

        fetch(`http://localhost:5555/baby_products/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataToUpdate),
        })
            .then(res => {
                console.log('succeeded:', res);
                // update defaultValue of input boxes so checkChanged function will know if it is changed
                // comparing defaultValue and value
                document.querySelector(
                    `tr#row-${id} input[name="category"]`
                ).defaultValue = dataToUpdate['category'];
                document.querySelector(
                    `tr#row-${id} input[name="name"]`
                ).defaultValue = dataToUpdate['name'];
                document.querySelector(
                    `tr#row-${id} input[name="age_group"]`
                ).defaultValue = dataToUpdate['age_group'];
                document.querySelector(
                    `tr#row-${id} input[name="price"]`
                ).defaultValue = dataToUpdate['price'];
                document.querySelector(
                    `tr#row-${id} textarea[name="details"]`
                ).defaultValue = dataToUpdate['details']; // textarea
                const row = document.querySelector(
                    `tr#row-${id} textarea[name="details"]`
                ).parentNode.parentNode.parentNode;
                row.classList.remove('negative');
            })
            .catch(err => console.error(err));
    };

    const checkChanged = e => {
        if (e.target.defaultValue !== e.target.value) {
            const row = e.target.parentNode?.parentNode?.parentNode;
            console.log('row', row);
            row.classList.add('negative');
        }
    };
    const [currImage, setCurrImage] = useState('');
    const onNewProduct = () => {
        const dataToUpdate = {};
        dataToUpdate['image'] = document.querySelector(
            `tr#row-0 input[name="image"]`
        ).value;
        dataToUpdate['category'] = document.querySelector(
            `tr#row-0 input[name="category"]`
        ).value;
        dataToUpdate['name'] = document.querySelector(
            `tr#row-0 input[name="name"]`
        ).value;
        dataToUpdate['age_group'] = document.querySelector(
            `tr#row-0 input[name="age_group"]`
        ).value;
        dataToUpdate['price'] = document.querySelector(
            `tr#row-0 input[name="price"]`
        ).value;
        dataToUpdate['details'] = document.querySelector(
            `tr#row-0 textarea[name="details"]`
        ).value;

        fetch(`http://localhost:5555/baby_products`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataToUpdate),
        })
            .then(res => res.json())
            .then(res => {
                setBabyProducts(curr => [res, ...curr]);
                console.log('succeeded:', res);
                // update defaultValue of input boxes so checkChanged function will know if it is changed
                // comparing defaultValue and value
                document.querySelector(
                    `tr#row-0 input[name="category"]`
                ).value = '';
                document.querySelector(`tr#row-0 input[name="name"]`).value =
                    '';
                document.querySelector(
                    `tr#row-0 input[name="age_group"]`
                ).value = '';
                document.querySelector(`tr#row-0 input[name="price"]`).value =
                    '';
                document.querySelector(
                    `tr#row-0 textarea[name="details"]`
                ).value = ''; // textarea
            })
            .catch(err => console.error(err));
    };

    const onNewImage = () => {
        let image = prompt('please add image', '');
        if (!image) return;
        if (image?.includes('http')) {
            setCurrImage(image);
        } else {
            alert('image url should start with http(s)');
        }
        console.log('image clicked');
    };

    const onImageUpdate = id => {
        const imageElement = document.querySelector(
            `tr#row-${id} input[name="image"]`
        );
        const currImage = imageElement.value;
        let image = prompt('please add image', currImage);
        if (!image) return;
        if (image?.includes('http')) {
            document.querySelector(`tr#row-${id} input[name="image"]`).value =
                image;
            if (imageElement.defaultValue !== imageElement.value) {
                const row = imageElement.parentNode?.parentNode?.parentNode;
                console.log('row', row);
                row.classList.add('negative');
            }
            setBabyProducts(curr =>
                curr.map(bp => {
                    if (bp.id === id) {
                        return {
                            ...bp,
                            image: image,
                        };
                    }
                    return bp;
                })
            );
        } else {
            alert('image url should start with http(s)');
        }
        console.log('image clicked');
    };
    return (
        <>
            <div className='mt-4'></div>
            <Header size='huge'>Baby Products</Header>

            <section className='flex flex-col gap-16'>
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell></Table.HeaderCell>
                            <Table.HeaderCell>category</Table.HeaderCell>
                            <Table.HeaderCell>name</Table.HeaderCell>
                            <Table.HeaderCell>age group</Table.HeaderCell>
                            <Table.HeaderCell>details</Table.HeaderCell>
                            <Table.HeaderCell>price</Table.HeaderCell>
                            <Table.HeaderCell></Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        <Table.Row id={`row-0`}>
                            <Table.Cell
                                onClick={onNewImage}
                                className='cursor-pointer'
                            >
                                <Image
                                    size='tiny'
                                    src={currImage}
                                    className='rounded-full overflow-hidden'
                                />
                                <input
                                    hidden
                                    name='image'
                                    defaultValue={currImage}
                                />
                            </Table.Cell>
                            <Table.Cell>
                                <Input
                                    name='category'
                                    placeholder='category'
                                    className='w-full'
                                    onChange={checkChanged}
                                />
                            </Table.Cell>
                            <Table.Cell>
                                <Input
                                    name='name'
                                    placeholder='name'
                                    defaultValue={''}
                                    className='w-full'
                                    onChange={checkChanged}
                                />
                            </Table.Cell>
                            <Table.Cell>
                                <Input
                                    name='age_group'
                                    placeholder='age_group'
                                    className='w-full'
                                    onChange={checkChanged}
                                />
                            </Table.Cell>
                            <Table.Cell>
                                <div>
                                    {/**
                                     * text area does not make div structure like Input component.
                                     * that makes parentNode level less than Input component.
                                     * to make .parentNode.parentNode.parentNode to point Table.Row,
                                     * adding div additionally.
                                     */}
                                    <TextArea
                                        name='details'
                                        placeholder='details'
                                        className='w-full'
                                        onChange={checkChanged}
                                    />
                                </div>
                            </Table.Cell>
                            <Table.Cell>
                                <Input
                                    name='price'
                                    placeholder='price'
                                    className='w-full'
                                    onChange={checkChanged}
                                />
                            </Table.Cell>
                            <Table.Cell>
                                <div className='flex flex-col gap-2'>
                                    <Button
                                        onClick={onNewProduct}
                                        color='green'
                                    >
                                        Create
                                    </Button>
                                </div>
                            </Table.Cell>
                        </Table.Row>
                        {babyProducts.map(bp => {
                            return (
                                <Table.Row key={bp.id} id={`row-${bp.id}`}>
                                    <Table.Cell
                                        onClick={() => onImageUpdate(bp.id)}
                                        className='cursor-pointer'
                                    >
                                        <Image
                                            size='tiny'
                                            src={bp.image}
                                            className='rounded-full overflow-hidden'
                                        />
                                        <input
                                            hidden
                                            name='image'
                                            defaultValue={bp.image}
                                        />
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Input
                                            name='category'
                                            placeholder='category'
                                            defaultValue={bp.category}
                                            className='w-full'
                                            onChange={checkChanged}
                                        />
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Input
                                            name='name'
                                            placeholder='name'
                                            defaultValue={bp.name}
                                            className='w-full'
                                            onChange={checkChanged}
                                        />
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Input
                                            name='age_group'
                                            placeholder='age_group'
                                            defaultValue={bp.age_group}
                                            className='w-full'
                                            onChange={checkChanged}
                                        />
                                    </Table.Cell>
                                    <Table.Cell>
                                        <div>
                                            {/**
                                             * text area does not make div structure like Input component.
                                             * that makes parentNode level less than Input component.
                                             * to make .parentNode.parentNode.parentNode to point Table.Row,
                                             * adding div additionally.
                                             */}
                                            <TextArea
                                                name='details'
                                                placeholder='details'
                                                defaultValue={bp.details}
                                                className='w-full'
                                                onChange={checkChanged}
                                            />
                                        </div>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Input
                                            name='price'
                                            placeholder='price'
                                            defaultValue={bp.price}
                                            className='w-full'
                                            onChange={checkChanged}
                                        />
                                    </Table.Cell>
                                    <Table.Cell>
                                        <div className='flex flex-col gap-2'>
                                            <Button
                                                onClick={() =>
                                                    onUpdateClick(bp.id)
                                                }
                                                color='vk'
                                            >
                                                Update
                                            </Button>
                                            <Button
                                                onClick={() =>
                                                    onDeleteClick(bp.id)
                                                }
                                                negative
                                            >
                                                Delete
                                            </Button>
                                        </div>
                                    </Table.Cell>
                                </Table.Row>
                            );
                        })}
                    </Table.Body>
                </Table>
            </section>
        </>
    );
}
