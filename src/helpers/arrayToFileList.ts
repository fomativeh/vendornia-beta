export function arrayToFileList(array: File[]): FileList {
    const dataTransfer = new DataTransfer();
    array.forEach((file) => dataTransfer.items.add(file));
    return dataTransfer.files;
}