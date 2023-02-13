import React, { useEffect, useState } from 'react';
import { getFileType, uploadImage } from '../utils';

interface IUseFileUpload {
    previousUploadedFiles: { name: string; url: string }[];
    multiple?: boolean;
}

interface IFile extends Partial<File> {
    name?: string;
    url?: string;
    originalFileName?: string;
}

interface IFileWithType {
    type: string;
    name: string;
    url: string;
    originalFileName?: string;
}

interface IUseImageUploadReturn {
    files: IFileWithType[];
    onUpload: () => Promise<{ name: string; url: string; originalFileName: string }[]>;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    clear: () => void;
    onRemove: (index: number) => void;
}

const useImageFileUpload = ({ previousUploadedFiles, multiple = true }: IUseFileUpload): IUseImageUploadReturn => {
    const [files, setFiles] = useState<IFile[]>([]);

    useEffect(() => {
        if (previousUploadedFiles.length) {
            setFiles([...previousUploadedFiles]);
        }
    }, [previousUploadedFiles]);

    const clear = () => {
        setFiles([]);
    };

    const onUpload = async (): Promise<{ name: string; url: string; originalFileName: string }[]> => {
        const _files = files.filter((file) => file.lastModified);
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
            .filter((file) => !file.lastModified)
            .map(({ name, url, originalFileName }) => ({
                name: name || '',
                url: url || '',
                originalFileName: originalFileName || '',
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

    const genaretedSelectFilesTypeAndUrl = (): IFileWithType[] => {
        return files.map((file) => {
            if (file.lastModified) {
                const type = getFileType(file.name ? file.name : '') || '';
                const url = URL.createObjectURL(file as File);
                const name = file.name ? file.name : '';
                const originalFileName = file.originalFileName;

                return {
                    type,
                    url,
                    name,
                    originalFileName,
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
