import { act, renderHook, RenderHookResult } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { useImageUpload } from '..';
import { IUseImageUploadParams, IUseImageUploadReturn } from '../use-image-upload';

const getBlobAndUrl = async (name: string) => {
    const blob = (await fetch(
        'https://images.pexels.com/photos/15494499/pexels-photo-15494499.jpeg?auto=compress&cs=tinysrgb&w=90&h=90&dpr=2'
    ).then((data) => data.blob())) as any;
    blob.lastModified = new Date();
    blob.name = name;

    return {
        blob,
    };
};

describe('useImageUpload', () => {
    it('Shoud render and return basic data', () => {
        let { result }: RenderHookResult<IUseImageUploadReturn, IUseImageUploadParams> = renderHook(useImageUpload, {
            initialProps: {
                previousUploadedFiles: [],
                multiple: false as boolean,
            } as IUseImageUploadParams,
        });
        expect(result.current.files).length(0);
    });

    it('Should add new file as a image', async () => {
        let { result }: RenderHookResult<IUseImageUploadReturn, IUseImageUploadParams> = renderHook(useImageUpload, {
            initialProps: {
                previousUploadedFiles: [],
                multiple: false as boolean,
            } as IUseImageUploadParams,
        });
        //create a file blob
        const blobFile = await getBlobAndUrl('file_name1.jpeg');

        act(() => {
            result.current.onChange({
                currentTarget: {
                    files: [blobFile.blob],
                },
            } as any);
        });

        expect(result.current.files).length(1);
    });
});
