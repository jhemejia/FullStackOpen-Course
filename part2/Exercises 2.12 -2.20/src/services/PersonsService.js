import axios from "axios";

export default class PersonsService {
 
constructor(){
    // initi axios instance
    this.axios = axios;
    this.baseUrl = "http://localhost:3001/persons"
}

async createNewPerson (personData){
    return await this.axios.post(this.baseUrl,personData)
        .then(()=>{
            return {status:200, message:`Note: ${personData.name} has been added to the phonebook.`} 
        })
        .catch(()=>{
            return {status:400, message:`Error: ${personData.name} was not created, try again later.`} 
        })
}
async updatePerson (id, personData){
    return await this.axios.put(`${this.baseUrl}/${id}`, personData)
        .then(()=>{
            return {status:200, message:`Note: ${personData.name} has been updated.`} 
        })
        .catch(()=>{
            return {status:400, message:`Error: ${personData.name} was not updated, try again later.`} 
        })
}
async getAllPersons(){
    return await this.axios.get(this.baseUrl)
        .then((res)=> {return res.data})
        .catch(()=>{
            return {status:400, message:`Server Error - Not Found`} 
        })
}

async deletePerson(contactId){
    return await this.axios.delete(`${this.baseUrl}/${contactId}`)
        .then(()=>{
            return {status:200, message:`Note: contact has been deleted.`} 
        })
        .catch(()=>{
            return {status:400, message:`Error: contact has already been deleted.`} 
        })
}
}