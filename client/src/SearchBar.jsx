import { useContext, useState } from 'react';
import { Search } from 'semantic-ui-react';
import './SearchBar.css';
import { useNavigate } from 'react-router-dom';
import { BabyProductContext } from './BabyProductContext';
const SearchBar = () => {
    const navigate = useNavigate();
    const { babyProducts } = useContext(BabyProductContext);
    const source = babyProducts.map(bp => {
        return {
            title: bp.name + '/' + bp.age_group,
            query: bp.name,
            description: `${bp.age_group} / ${bp.category}`,
            image: bp.image,
            price: bp.price,
        };
    });
    const [value, setValue] = useState('');
    const [result, setResult] = useState([]);
    const handleSearchChange = (e, data) => {
        setValue(data.value);
        console.log('handleSearchChange:', { e, data });
        setResult(source.filter(src => src.title.includes(data.value)));
    };
    const onResultSelect = (e, data) => {
        console.log('on result select:', { e, data });
        navigate(`/baby_products?query=${data.result?.query}`);
    };

    return (
        <div className='w-full flex flex-row justify-end items-end search-bar p-4'>
            <div className='w-72'>
                <Search
                    loading={false}
                    placeholder='Search...'
                    onResultSelect={onResultSelect}
                    onSearchChange={handleSearchChange}
                    results={result}
                    // resultRenderer={(val) => {
                    //     return <div>{JSON.stringify(val)}</div>;
                    // }}
                    showNoResults={false}
                    value={value}
                    className='w-full'
                />
            </div>
        </div>
    );
};

export default SearchBar;
