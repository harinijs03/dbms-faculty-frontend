import axios from "axios";

export async function postQuestion(quesDesc) {
  try{
    const res = await axios.post('http://localhost:5001/api/createquesdesc', quesDesc);
    let data = res.data;
    return data;
  }catch(err){
    console.log(err);
  }
}