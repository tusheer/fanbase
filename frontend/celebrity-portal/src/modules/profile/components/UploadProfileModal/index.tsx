import { Button, FileUploadInput, Modal } from '@fanbase/ui/components';
import { useImageUpload } from '@fanbase/ui/hooks';
import Image from 'next/image';
import React from 'react';

interface IProfileImageUploadProps {
    isOpen: boolean;
    onClose: () => void;
}

const UploadProfileModal: React.FC<IProfileImageUploadProps> = ({ isOpen, onClose }) => {
    const { files, onChange, onUpload } = useImageUpload({
        previousUploadedFiles: [],
        multiple: false,
    });
    return (
        <Modal className="max-w-2xl rounded-xl border" open={isOpen} onClose={onClose}>
            <div>
                <div className="border-b py-3 px-5 ">
                    <h2 className="text-xl font-semibold">Edit profile picturer</h2>
                </div>
                <div className="px-5 py-7">
                    <FileUploadInput
                        multiple={false}
                        accept="image/*"
                        className="mx-auto block h-64 w-64 rounded-full"
                        onChange={onChange}
                    >
                        <div className="relative mx-auto h-64 w-64 overflow-hidden rounded-full  border border-gray-100">
                            <Image
                                className="absolute h-full w-full object-cover"
                                fill={true}
                                alt=""
                                placeholder="blur"
                                src={files[0]?.url || '/images/profile/blank_profile.png'}
                                blurDataURL="LEHV6nWB2yk8pyo0adR*.7kCMdnj"
                            />
                        </div>
                    </FileUploadInput>
                </div>
                <div className="flex justify-end gap-3 border-t px-5 py-3">
                    <Button onClick={onUpload} rounded>
                        Save Photo
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

export default UploadProfileModal;
