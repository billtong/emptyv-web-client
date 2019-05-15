export const formatDateTime = (timeStamp) => {
    let now;
    if (timeStamp) {
        now = new Date(timeStamp);
    } else {
        now = new Date();
    }
    const Y = now.getFullYear();
    const M = now.getMonth() + 1;
    const D = now.getDate();
    const m = M < 10 ? `0${M}` : M;
    const d = D < 10 ? `0${D}` : D;
    return `${Y}-${m}-${d} ${now.toTimeString().substr(0, 8)}`;
};
