export const formatDate = (dateString) => {
    // Date
    const date = new Date(dateString);

    // Year
    const year = date.getFullYear();

    // Month
    const month = date.getMonth() + 1;

    // Day
    const day = date.getDate();

    // Hours
    const hours = date.getHours();

    // Minutes
    const minutes = date.getMinutes();

    // Formatted Date
    const formattedDate = `${day}/${month}/${year}`;

    // Formatted Time
    const formattedTime = `${hours}:${minutes}`;

    // Return
    return `${formattedTime} ngày ${formattedDate}`;
};
