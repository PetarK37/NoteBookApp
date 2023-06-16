import axios, { AxiosError, AxiosResponse } from "axios";

const API_BASE_URL = 'http://localhost:8080/api/notes';
const NOT_FOUND_STATUS = 404
const headers = {"Content-Type": "application/json"}

export interface Note {
    uuid: React.Key;
    title: string;
    content: string;
    version: number;
}

export interface NoteRequestDTO {
    title: string;
    content: string;
}
  
export const getNotes = async () => {
    try{
        const response = await axios.get(API_BASE_URL);
        return response.data
    }catch (error){
        if((error as AxiosError).response?.status != NOT_FOUND_STATUS){
            throw new Error("There has been problem with getting your notes,please try again later.")
        }
    }
}

export const addNote = async (note:NoteRequestDTO) => {
    try{
        const response = await axios.post(API_BASE_URL,note,{headers: headers});
        return response.data;
    }catch(error){
        throw new Error("There has been problem while saving your note,please try again later.")
    }
}

export const updateNote = async (vesrion : number, id : string,note: NoteRequestDTO) => {
    try{
        const response = await axios.put(`${API_BASE_URL}/${vesrion}/${id}`,note,{headers: headers});
        return response.data;
    }catch(error){
        throw new Error("There has been problem while updating your note,please try again later.");
    }
}

export const deleteNote = async (vesrion : number, id : string) => {
    try{
        const response = await axios.delete(`${API_BASE_URL}/${vesrion}/${id}`);
        return response.data;
    }catch(error){
        throw new Error("There has been problem while deleting your note,please try again later.");
    }
}
