export const wp = (percentage, width) => {
    const value = (percentage * width) / 100;
    return Math.round(value);
};

export const hp = (percentage, height) => {
    const value = (percentage * height) / 100;
    return Math.round(value);
};
