import { ImageType } from '@fanbase/schema';

const uploadAsset = async (file: File) => {
    const formdata = new FormData();
    formdata.append('file', file);
    try {
        const response = await fetch('http://localhost:4000/api/uploads/image', {
            method: 'POST',
            body: formdata,
        }).then((data) => data.json());

        return response as ImageType;
    } catch (error) {
        throw new Error();
    }
};

export default uploadAsset;
