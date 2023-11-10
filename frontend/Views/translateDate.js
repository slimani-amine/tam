export const translateDate = (datetochange)=>{
    const date = new Date(datetochange);

    const options = { day: '2-digit', month: 'short' };
    const formattedDate = date.toLocaleDateString('en-US', options)
    
    return formattedDate
}
