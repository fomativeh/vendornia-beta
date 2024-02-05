export const getBg = (reaction: string) => {
    if (reaction === "like") {
        return "blue";
    } else if (reaction === "dislike") {
        return "#BBBB0C";
    } else if (reaction === "love") {
        return "green";
    } else if (reaction === "warn") {
        return "red";
    } else {
        return "#000";
    }
};
