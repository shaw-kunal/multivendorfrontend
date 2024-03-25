export const saveToLocalStorage = (key,state)=>{
    localStorage.setItem(key,JSON.stringify(state))
}