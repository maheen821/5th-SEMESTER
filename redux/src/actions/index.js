import { type } from "@testing-library/user-event/dist/type"

export const incNum = () => {
    return{
        type:"INCREMENT"
    }
}
export const decNum = ()  => {
    return{
        type:"DECREMENT"
    }
}