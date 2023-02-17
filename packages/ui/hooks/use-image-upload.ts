import { ImageType } from '@fanbase/schema';
import React, { useEffect, useState } from 'react';

export interface IUseImageUploadParams {
    previousUploadedFiles: IFile[];
    multiple: boolean;
}

type IFile = ImageType | File;

interface IFileWithType {
    name: string;
    url: string;
}

export interface IUseImageUploadReturn {
    files: IFileWithType[];
    onUpload: () => Promise<ImageType[]>;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    clear: () => void;
    onRemove: (index: number) => void;
}

function useImageFileUpload({
    previousUploadedFiles = [],
    multiple = true,
}: IUseImageUploadParams): IUseImageUploadReturn {
    const [files, setFiles] = useState<IFile[]>([]);

    useEffect(() => {
        if (previousUploadedFiles.length) {
            setFiles([...previousUploadedFiles]);
        }
    }, [previousUploadedFiles]);

    const clear = () => {
        setFiles([]);
    };

    const onUpload = async (): Promise<ImageType[]> => {
        const uploadImage = await import('../utils/uploadImage').then((upload) => upload.default);

        const response = await Promise.all(
            files.map(async (file) => {
                return 'lastModified' in file ? await uploadImage(file as File) : file;
            })
        );

        return response.filter((file) => 'lastModified' in file).map(({ value }: any) => ({ ...value }));
    };

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const input = event.currentTarget;

        if (input.files === null) return;

        setFiles(multiple ? [...files, ...input.files] : [...input.files]);
    };

    const onRemove = (index: number) => {
        setFiles(files.filter((_, i) => i !== index));
    };

    const generateUrl = (file: File | ImageType): IFileWithType => {
        if ('lastModified' in file && file.lastModified) {
            const url = URL.createObjectURL(file);
            const name = file.name ? file.name : '';
            return { url, name };
        } else {
            return { url: (file as ImageType).sizes.md.url, name: (file as ImageType).originalFileName };
        }
    };

    const generatedSelectFilesTypeAndUrl = (): IFileWithType[] => files.map(generateUrl);

    return {
        files: generatedSelectFilesTypeAndUrl(),
        onUpload,
        clear,
        onChange,
        onRemove,
    };
}

export default useImageFileUpload;
