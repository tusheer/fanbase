import { ImageType } from '@fanbase/schema';
import React, { useEffect, useState } from 'react';

interface IUseImageUploadParams {
    previousUploadedFiles: IFile[];
    multiple?: boolean;
}

type IFile = ImageType | File;

interface IFileWithType {
    name: string;
    url: string;
}

interface IUseImageUploadReturn {
    files: IFileWithType[];
    onUpload: () => Promise<ImageType[]>;
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

    const onUpload = async (): Promise<ImageType[]> => {
        const _files = files.filter((file) => 'lastModified' in file);

        //lazy import
        const uploadImage = await import('../utils/uploadImage').then((upload) => upload.default);
        const response = await Promise.allSettled(
            _files.map(async (file) => {
                return await uploadImage(file as File);
            })
        );

        const filterResponse = response
            .filter((file) => file.status === 'fulfilled')
            .map(({ value }: any) => ({
                ...value,
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

    const genareteUrlFromPreviousUploadedImage = (file: ImageType) => {
        return {
            url: file.sizes.md.url,
            name: file.originalFileName,
        };
    };

    const genareteUrlFromRecentSelectedImage = (file: File) => {
        const url = URL.createObjectURL(file);
        const name = file.name ? file.name : '';

        return {
            url,
            name,
        };
    };

    const genaretedSelectFilesTypeAndUrl = (): IFileWithType[] => {
        return files.map((file) => {
            if ('lastModified' in file && file.lastModified) {
                return genareteUrlFromRecentSelectedImage(file);
            } else {
                return genareteUrlFromPreviousUploadedImage(file as ImageType);
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
