import axios from "axios";

export default class PersonsService {
 
constructor(){
    // initi axios instance
    this.axios = axios;
    this.baseUrl = "http://localhost:3001/persons"
}

async createNewPerson (personData){
 await this.axios.post(this.baseUrl,personData)
    .then(()=>{
        return {status:200, message:`Note: ${personData.name} has been added to the phonebook.`} 
    })
    .catch(()=>{
        return {status:400, message:`Error: ${personData.name} was not created, try again later.`} 
    })
}
async updatePerson (id, personData){
 await this.axios.put(`${this.baseUrl}/${id}`, personData)
    .then(()=>{
        return {status:200, message:`Note: ${personData.name} has been updated.`} 
    })
    .catch(()=>{
        return {status:400, message:`Error: ${personData.name} was not updated, try again later.`} 
    })

}
async getAllPersons(){
    const response = await this.axios.get(this.baseUrl).then((res)=> res.data)
    return response
}
async deletePerson(contactId){
    const response = await this.axios.delete(`${this.baseUrl}/${contactId}`).then(res=>res.data)
    console.log(response)
    return response
}
}