import { RequestHandler } from 'express';
import { nanoid } from 'nanoid';
import sharp from 'sharp';

const sizes = [
    {
        size: 'xsm',
        quality: 5,
    },
    {
        size: 'sm',
        quality: 10,
    },
    {
        size: 'md',
        quality: 40,
    },
    {
        size: 'lg',
        quality: 60,
    },
];

export const singleImageUploadController: RequestHandler = async (req, res) => {
    const file = req.file;
    if (!file) {
        return new Error('File is required');
    }

    const files: { url: string; size: string }[] = [];

    await Promise.all(
        sizes.map(async ({ quality, size }) => {
            const filename = file.originalname.replace(/\..+$/, '');
            const newFilename = `${size}-${filename}-${Date.now()}${nanoid(6)}.jpeg`;
            const filePath = `${__dirname}/../../uploads/images/${newFilename}`;

            await sharp(file.buffer).toFormat('jpeg').jpeg({ quality: quality }).toFile(filePath);

            files.push({
                url: filePath,
                size,
            });
        })
    );

    res.status(200).send({
        message: 'SUCCESS',
        result: files,
    });
};