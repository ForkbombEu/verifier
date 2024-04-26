import { getPreference, setPreference } from "."

export const saveRuAndSid = async (sid:string, ru:string) =>{
    await setPreference(sid, ru)
}

export const getRuAndSid = async (sid:string) =>{
    return await getPreference(sid)
}