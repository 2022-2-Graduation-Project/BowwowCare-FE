export const getAge = (date) => {
    const now = new Date();
    const nowYear = now.getFullYear(); 
    const birthYear = date.getFullYear();
    
    const age = nowYear - birthYear

    return age;
};

export const getDurationDate = (date) => {
    const now = new Date();
    const startDate = new Date(date.getFullYear(), date.getMonth() + 1, date.getDate());
    const endDate = new Date(now.getFullYear(), now.getMonth() + 1, now.getDate());

    const ms = endDate.getTime() - startDate.getTime() ;
    const durationDate = ms / (1000*60*60*24);

    return durationDate;
}