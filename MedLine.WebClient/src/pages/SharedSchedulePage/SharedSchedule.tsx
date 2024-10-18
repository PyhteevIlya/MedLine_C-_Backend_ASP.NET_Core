import './SharedSchedule.scss';
import ModalAddDoctor from "./ModalAddDoctor/ModalAddDoctor";
import { RecordTable } from "../../entities/Record/ui/RecordTable/RecordTable";
import { observer } from "mobx-react-lite";
import ModalDeleteDoctor from "./ModalDeleteDoctor/ModalDeleteDoctor";
import ModalAddSchedule from './../../widgets/ModalAddSchedule/ModalAddSchedule';


    function generateDateArrays(days: any) {
        const dates = [];
        const today = new Date();
        for(let i = 0; i < days; i++) {
            const date = new Date(today);
            date.setDate(today.getDate() + i);
            dates.push(date.toLocaleDateString()); 
        }
        return dates;
    }

    generateDateArrays(14);

    const SharedSchedule = observer(() => {
        
    return(
        <div>
            <div style={{marginBottom: 10, display: 'grid', alignItems: 'center', gridTemplateColumns: '1fr 1fr'}}>
            <div className="divForButtonSchedule grid justify-start">
                <ModalAddDoctor/>
            </div>
            <div className="divForButtonSchedule grid justify-end">
                <ModalAddSchedule/>
            </div>
            <div className="containerForDangerButton">
                <ModalDeleteDoctor/>
            </div>
            </div>
            <div className="containterSharedSchedule shadow-[0_0px_20px_10px_rgba(34,60,80,0.2)] rounded-md">
                <RecordTable/> 
            </div>
        </div>
        );
})

export default SharedSchedule