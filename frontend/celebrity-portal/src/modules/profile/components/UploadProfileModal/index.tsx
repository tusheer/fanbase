import { Button, Modal } from '@fanbase/ui/components';
import React from 'react';

interface IProfileImageUploadProps {
    isOpen: boolean;
    onClose: () => void;
}

const UploadProfileModal: React.FC<IProfileImageUploadProps> = ({ isOpen, onClose }) => {
    return (
        <Modal className="max-w-2xl rounded-xl border" open={isOpen} onClose={onClose}>
            <div>
                <div className="border-b py-3 px-5 ">
                    <h2 className="text-xl font-semibold">Edit profile picturer</h2>
                </div>
                <div className="px-5 py-7">
                    <div className="mx-auto h-64 w-64 rounded-full bg-gray-200"></div>
                </div>
                <div className="flex justify-end gap-3 border-t px-5 py-3">
                    <Button rounded>Save Photo</Button>
                </div>
            </div>
        </Modal>
    );
};

export default UploadProfileModal;
