import './Footer.css';

const Footer = () => {
    return (
        <footer className='p-4 mt-16'>
            <div className='flex flex-row justify-center items-center text-white'>
                <div className='flex flex-col justify-center items-center gap-2'>
                    <span className='text-2xl'>Baby Again</span>
                    <span className='text-sm'>
                        1234 Baby St, San Antonio, TX 78261
                    </span>
                    <span className='text-sm'>415-555-5555</span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
