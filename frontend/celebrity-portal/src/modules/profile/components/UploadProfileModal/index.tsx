import { Button, FileUploadInput, Modal } from '@fanbase/ui/components';
import { useImageUpload } from '@fanbase/ui/hooks';
import XIcon from '@fanbase/ui/icons/XIcon';
import Image from 'next/image';
import React from 'react';

export interface IProfileImageUploadProps {
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
                <div className="flex items-center justify-between border-b py-3 px-5 ">
                    <h2 className="text-xl font-semibold">Edit profile picturer</h2>
                    <button
                        aria-hidden={!isOpen}
                        onClick={onClose}
                        tabIndex={0}
                        role="button"
                        aria-label="Close Modal"
                        aria-details="Close the modal by tap"
                    >
                        <XIcon />
                    </button>
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
                    <Button size="sm" intend="secondary" className="w-28" onClick={onClose} rounded>
                        Cencel
                    </Button>
                    <Button className="w-28" size="sm" onClick={onUpload} rounded>
                        Save
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

export default UploadProfileModal;
