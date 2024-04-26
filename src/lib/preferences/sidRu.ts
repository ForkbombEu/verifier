import { getStructuredPreferences, setStructuredPreferences } from "."
import dayjs from "dayjs"

export const saveRuAndSid = async (sid:string, ru:string) =>{
    const at = dayjs().unix()
    await setStructuredPreferences(sid, {ru, at})
}

export const getRuAndSid = async (sid:string) =>{
    return await getStructuredPreferences(sid)
}