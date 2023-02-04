import { Request, Response } from 'express';
import sharp from 'sharp';
import { nanoid } from 'nanoid';
import fs from 'fs';
import path from 'path';

export const singleImageUploadController = async (req: Request, res: Response) => {
    const file = req.file;
    if (!file) {
        return res.status(400).send({
            message: 'NOT_UPLOADED',
        });
    }

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

    const files: any[] = [];

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
