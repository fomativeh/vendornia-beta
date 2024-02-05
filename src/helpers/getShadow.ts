export const getShadow = (type: string) => {
    switch (type) {
        case "like":
            return "shadow-blue";
            break;
        case "dislike":
            return "shadow-yellow";
            break;
        case "love":
            return "shadow-green";
            break;
        default:
            return "shadow-red";
    }
};