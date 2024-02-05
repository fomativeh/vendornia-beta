import React, { SetStateAction, Dispatch } from "react"
const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>,
    setImage: Dispatch<SetStateAction<string>>,
) => {
    const files = event.target.files;
    if (files && files.length > 0) {
        const file = files[0];
        const reader = new FileReader()
        reader.onload = (e) => {
            setImage(e.target?.result as string);
        };
        reader.readAsDataURL(file);
    }
};


export const handleMultipleUpload = (
    images: string[],
    event: React.ChangeEvent<HTMLInputElement>,
    setImages: Dispatch<SetStateAction<string[]>>
) => {
    const files = event.target.files;
    if (files && files.length > 0) {
        const promises: Promise<string>[] = [];

        for (let i = 0; i < files.length; i++) {
            const file = files[i];

            const promise = new Promise<string>((resolve) => {
                const reader = new FileReader();
                reader.onload = (e) => {
                    resolve(e.target?.result as string);
                };
                reader.readAsDataURL(file);
            });

            promises.push(promise);
        }

        Promise.all(promises).then((imageDataUrls) => {
            let allImages = [...images, ...imageDataUrls]
            setImages(Array.from(new Set(allImages)));
        });
    }
};


export default handleImageUpload
