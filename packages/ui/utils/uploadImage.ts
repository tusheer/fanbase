import { ImageType } from '@fanbase/schema';
import getImageBlurHash from './getImageBlurHash';

const uploadAsset = async (file: File) => {
    const formdata = new FormData();
    const url = URL.createObjectURL(file);
    const hashImage = await getImageBlurHash(url);

    formdata.append('image', file);
    formdata.append('blur_hash', hashImage);

    try {
        const response = await fetch('http://localhost:8000/api/upload/image', {
            method: 'POST',
            body: formdata,
            credentials: 'include',
        }).then((data) => data.json());

        return response as ImageType;
    } catch (error) {
        throw new Error();
    }
};

export default uploadAsset;
