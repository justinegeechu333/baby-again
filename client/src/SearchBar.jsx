import { useContext, useState } from 'react';
import { Search } from 'semantic-ui-react';
import './SearchBar.css';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { BabyProductContext } from './BabyProductContext';
const SearchBar = () => {
    const navigate = useNavigate();
    const { babyProducts } = useContext(BabyProductContext);
    const [, setFilters] = useSearchParams();
    const source = babyProducts.map((bp, idx) => {
        return {
            title: bp.name + '/' + bp.age_group + idx,
            query: bp.name,
            description: `${bp.age_group} / ${bp.category}`,
            image: bp.image,
            price: bp.price,
        };
    });
    const [value, setValue] = useState('');
    // const [result, setResult] = useState([]);
    const handleSearchChange = (e, data) => {
        setValue(data.value);
        setFilters({ query: data.value });
    };
    const results = source.filter(
        src => src.title.includes(value) || src.description.includes(value)
    );
    console.log('result:', { results, value });
    const onResultSelect = (e, data) => {
        navigate(`/baby_products?query=${data.result?.query}`);
    };

    return (
        <div className='w-full flex flex-row justify-end items-end search-bar p-4'>
            <div className='w-72'>
                <Search
                    placeholder='Search...'
                    onResultSelect={onResultSelect}
                    onSearchChange={handleSearchChange}
                    results={results}
                    // resultRenderer={(val) => {
                    //     return <div>{JSON.stringify(val)}</div>;
                    // }}
                    showNoResults={true}
                    value={value}
                    className='w-full'
                />
            </div>
        </div>
    );
};

export default SearchBar;
