import { useEffect, useState } from 'react';
import './InformationPage.scss'
import ModalEditTextBoard from './ModalEditTextBoard/ModalEditTextBoard';
import { BoardInfo } from '../../entities/BoardInfo/model/type/boardInfo';
import { fetchBoard } from '../../features/BoardInfo/getBoardInfo/fetchBoardInfo';
import rootStore from '../../app/StoreProvider/rootStore/rootStore';
import { RoleEnum } from '../../entities/User/model/types/user';

const InformationPage = () => {

    const [board, setBoard] = useState<BoardInfo| null>(null);

    useEffect(() => {
        const fetchData = async () => {
            var response = await fetchBoard()
                setBoard(response)
        }
            fetchData();
    }, [])

    const handleBoardUpdate = (updateBoard: BoardInfo) => {
        setBoard(updateBoard)
    }
if(board == null)
return (
    <div>
        <h1>
            
        </h1>
    </div>
)
    return (
        <div className='board shadow-[0_0px_20px_10px_rgba(34,60,80,0.2)] bg-white rounded-md'>
        {(rootStore.User.role == RoleEnum.Администратор) || (rootStore.User.role == RoleEnum.Разработчик)
            ?   <div className='board__editButton'>
                    <ModalEditTextBoard boardInfo={board} onUpdateBoard={handleBoardUpdate}/>
                </div>
            : <></>
        }
            <div className='board__headBoard'>
                <h1>Доска объявлений</h1>
            </div>
            <div className='board__textBoard'>
                {board.textBoard}
            </div>
            <div className='board__endTextBoard'>
                {/* <p>
                    Вы также можете записаться на прием или обратится в регистратуру по тел.: 00-00
                </p> */}
                <p>
                    В случае возникновения проблем с записью или сбоя системы тел.техподдержки: 66-17; 66-18
                </p>
            </div>
        </div>     
    );
};

export default InformationPage