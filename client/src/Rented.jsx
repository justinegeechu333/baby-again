import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import * as confetti from 'confettis';

const Rented = () => {
    const { confirmationId } = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        confetti.create();
    }, []);
    return (
        <div className='w-screen h-[calc(100vh-10rem)] flex items-center justify-center backdrop-brightness-50 -mx-4'>
            <div className='w-[300px] h-[200px] shadow-lg rounded-md border-neutral-700 border bg-white flex flex-col p-4 relative gap-4'>
                <h2 className='text-2xl'>Rented Successfully!</h2>
                <h3>Confirmation Id: {confirmationId}</h3>
                <Button
                    data-test='test'
                    onClick={() => {
                        navigate('/');
                    }}
                    className='absolute bottom-4 right-4'
                >
                    Go back Home
                </Button>
            </div>
        </div>
    );
};

export default Rented;
