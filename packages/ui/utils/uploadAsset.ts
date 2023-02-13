const uploadAsset = async (file: File) => {
    try {
        await fetch('', {
            method: 'PUT',
            body: '',
        });

        return {
            isError: false,
            name: name,
            originalFileName: file.name,
            url: `localho`,
        };
    } catch (error) {
        throw new Error();
    }
};

export default uploadAsset;
