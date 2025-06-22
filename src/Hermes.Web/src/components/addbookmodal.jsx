import React, { useState } from 'react';
import { Button, Modal, Checkbox, Form, Input, Select, InputNumber, Space, Radio, Flex, message, Upload } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { UploadOutlined, } from '@ant-design/icons';
import BookDetailsForm from './bookdetailsform'

const { TextArea } = Input;


const props = {
    name: 'file',
    action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
    headers: {
        authorization: 'authorization-text',
    },
    onChange(info) {
        if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
};

const onFinish = values => {
    console.log('Success:', values);
};
const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
};

const options = [];
for (let i = 10; i < 36; i++) {
    options.push({
        value: i.toString(36) + i,
        label: i.toString(36) + i,
    });
}
const handleChange = value => {
    console.log(`selected ${value}`);
};

const options2 = [
    {
        label: 'Biografie',
        value: 'Biografie',
        desc: 'Biografie ',
    },
    {
        label: 'Dramat',
        value: 'Dramat',
        desc: 'Dramat',
    },
    {
        label: 'Horror',
        value: 'Horror',
        desc: 'Horror',
    },
    {
        label: 'Naukowe',
        value: 'Naukowe',
        desc: 'Naukowe',
    },
];

const AddBookModal = ({ isWorker }) => {
    const [form] = Form.useForm();
    const [isFormValid, setIsFormValid] = useState(false);

    const checkFormValid = async () => {
        try {
            await form.validateFields();
            setIsFormValid(true);
        } catch {
            setIsFormValid(false);
        }
    };

    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false); // <- zamyka modal po kliknieciu x 
    };


    const onChange = value => {
        console.log('changed', value);
    }; // cena



    return (
        <>
            {isWorker && (<Button type="primary" className='Button-primary button-add-position' onClick={showModal}>Dodaj nową pozycje</Button>
            )}

        


            <Modal
                title="Dodawanie ksiazki"
                closable={{ 'aria-label': 'Custom Close Button' }}
                open={isModalOpen}
                onCancel={handleCancel}
                footer={null}
            >

                <BookDetailsForm isEditMode={false}></BookDetailsForm>

            </Modal>
        </>
    );
};
export default AddBookModal;

