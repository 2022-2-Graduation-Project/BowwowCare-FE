export const getAge = (date) => {
    const now = new Date();
    const nowYear = now.getFullYear(); 
    const birthYear = date.getFullYear();
    
    const age = nowYear - birthYear

    return age;
};

export const getBwDate = (date) => {
    const now = new Date();
    const stDate = new Date(date.getFullYear(), date.getMonth() + 1, date.getDate());
    const endDate = new Date(now.getFullYear(), now.getMonth() + 1, now.getDate());

    const btMs = endDate.getTime() - stDate.getTime() ;
    const btDay = btMs / (1000*60*60*24);

    return btDay;
}