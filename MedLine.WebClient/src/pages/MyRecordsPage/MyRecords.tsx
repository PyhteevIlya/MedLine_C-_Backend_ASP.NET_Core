import './MyRecords.scss';
import HistoryTable from './HistoryTable/HistoryTable';

const MyRecords = () => {
    
    return (
        <>
            <div className='containerMyRecords shadow-[0_0px_20px_10px_rgba(34,60,80,0.2)] bg-white rounded-md'>
                <HistoryTable/>
            </div>  
        </>
    );
};

export default MyRecords
