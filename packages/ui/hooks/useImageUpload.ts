import React, { useEffect, useState } from 'react';
import { getFileType, uploadImage } from '../utils';

interface IUseImageUploadParams {
    previousUploadedFiles: IFile[];
    multiple?: boolean;
}

interface UploadedType {
    name: string;
    url: string;
    originalFileName: string;
    imageHashUrl: string;
}

type IFile = UploadedType | File;

interface IFileWithType {
    type: string;
    name: string;
    url: string;
    originalFileName: string;
    imageHashUrl: string;
}

interface IUseImageUploadReturn {
    files: IFileWithType[];
    onUpload: () => Promise<{ name: string; url: string; originalFileName: string }[]>;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    clear: () => void;
    onRemove: (index: number) => void;
}

const useImageFileUpload = ({
    previousUploadedFiles,
    multiple = true,
}: IUseImageUploadParams): IUseImageUploadReturn => {
    const [files, setFiles] = useState<IFile[]>([]);

    useEffect(() => {
        if (previousUploadedFiles.length) {
            setFiles([...previousUploadedFiles]);
        }
    }, [previousUploadedFiles]);

    const clear = () => {
        setFiles([]);
    };

    const onUpload = async (): Promise<any[]> => {
        const _files = files.filter((file) => 'lastModified' in file && file.lastModified);
        const response = await Promise.allSettled(
            _files.map(async (file) => {
                return await uploadImage(file as File);
            })
        );

        const filterResponse = response
            .filter((file) => file.status === 'fulfilled')
            .map(({ value }: any) => ({
                name: value.name,
                url: value.url || '',
                originalFileName: value.originalFileName,
            }));

        const previousFiles = files
            .filter((file) => !('lastModified' in file))
            .map((file) => ({
                ...file,
            }));
        return [...previousFiles, ...filterResponse];
    };

    const onChange = ({ currentTarget: input }: React.ChangeEvent<HTMLInputElement>) => {
        if (input.files === null) return;
        if (multiple) {
            setFiles([...files, ...input.files]);
        } else {
            setFiles([...input.files]);
        }
    };

    const onRemove = (index: number) => {
        const _files = [...files];
        _files.splice(index, 1);
        setFiles(_files);
    };

    const genaretedPreviousUploadedTypes = (file: any): IFileWithType => {
        const ext = getFileType(file.url);
        return {
            ...file,
            type: ext,
        };
    };

    //TODO : need to refactor here

    const genaretedSelectFilesTypeAndUrl = (): IFileWithType[] => {
        return files.map((file) => {
            if ('lastModified' in file && file.lastModified) {
                const type = getFileType(file.name ? file.name : '') || '';
                const url = URL.createObjectURL(file as File);
                const name = file.name ? file.name : '';
                const originalFileName = file.name;

                return {
                    type,
                    url,
                    name,
                    originalFileName,
                    imageHashUrl: '',
                };
            } else {
                return genaretedPreviousUploadedTypes(file);
            }
        });
    };

    return {
        files: genaretedSelectFilesTypeAndUrl(),
        onUpload,
        clear,
        onChange,
        onRemove,
    };
};

export default useImageFileUpload;
