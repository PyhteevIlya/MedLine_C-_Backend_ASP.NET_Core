import { Button, Form, Modal } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";
import { EditOutlined } from '@ant-design/icons';
import { BoardInfo } from "../../../entities/BoardInfo/model/type/boardInfo";
import { updateBoard } from "../../../features/BoardInfo/updateBoardInfo/updateBoardInfo";

interface UpdateBoard {
    boardInfo: BoardInfo;
    onUpdateBoard: (updateBoard: BoardInfo) => void
}

const ModalEditTextBoard : React.FC<UpdateBoard> = ({boardInfo, onUpdateBoard}) => {

    const [formBoard] = Form.useForm();
    const [board, setBoard] = useState<BoardInfo>({
        id: boardInfo.id,
        headBoard: boardInfo.headBoard,
        textBoard: boardInfo.textBoard,
        endBoard: boardInfo.endBoard
    });
            
        const [open, setOpen] = useState(false);

        const showModal = () => {
            setOpen(true);
        };

        const handleOkAddSchedule = async () => {
            try{
                const fetchData = async () => {
                    await updateBoard(board!)
                    onUpdateBoard(board)
                }
                setOpen(false)
                fetchData();
            } catch {
                console.log("error")
            }
            formBoard.resetFields();
        };

        const handleCancelAddSchedule = () => {
            formBoard.resetFields()
            setOpen(false);
        };

        const handleChangetextboard = (e: any) => {
            setBoard({ ...board, textBoard:e.target.value})
        }

        const [modalText] = useState('');

    return (
        <div>
            <Button icon={<EditOutlined/>} onClick={showModal}></Button>
                <Modal title={<div style={{fontSize: '24px'}}>Редактирование доски объявлений</div>}
                            style={{}}
                            open={open}
                            onOk={handleOkAddSchedule}
                            onCancel={handleCancelAddSchedule}
                            cancelText="Отмена"
                            okText="Изменить"
                            width={1000} >
                        <p>{modalText}</p>
                        <Form form={formBoard} layout="vertical">
                            <Form.Item name='board.textBoard' initialValue={board?.textBoard} label='Объявление'>
                                <TextArea value={board?.textBoard} autoSize={{minRows: 5, maxRows: 30}} onChange={handleChangetextboard}></TextArea>
                            </Form.Item>
                        </Form>
                </Modal>
        </div>
    )
} 

export default ModalEditTextBoard