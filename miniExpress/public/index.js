'use strict';
var resultHistorial = {
    id:0,
    next_challenge:{
     challenge:"",
     difficulty:0,
     nonce:"",
     sha256Message:"",
     noncePlusSha256:""
    }
} ;
const getDataFromServer = async () => {
    const firsStepResponse = await fetch("http://localhost:4000/api/v1/users", {
        method: "POST",
        body: JSON.stringify({
           name: "Liliana Aguirre",
           email: "aguirre.wl@gmail.com"
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      })
     let firsStepData = await firsStepResponse.json();
     resultHistorial.id= firsStepData.id;
     resultHistorial.next_challenge.challenge = firsStepData.next_challenge.challenge
     hash256Process();
}

const putDataSha256= async () =>{
    const secondStepDataToSend = await fetch(`/api/v1/users/${resultHistorial.id}/challenge/digest`, {
        method: "PUT",
        body: JSON.stringify({result: resultHistorial.next_challenge.sha256Message
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      })
     let secondStepResult = await secondStepDataToSend.json();
    resultHistorial.next_challenge.difficulty = secondStepResult.next_challenge.difficulty;
    resultHistorial.next_challenge.challenge = secondStepResult.next_challenge.challenge;
    pOwProcess();
}

const hash256Process = async () =>{
    const secondStepResponse = await fetch(`http://localhost:4000/api/v1/createSha256/message`, {
        method: "POST",
        body: JSON.stringify({message: resultHistorial.next_challenge.challenge
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      })
     let secondStepData = await secondStepResponse.json();
     resultHistorial.next_challenge.sha256Message = secondStepData;
     putDataSha256();
}
const pOwProcess = async () =>{

}
document.getElementById("btn").onclick = getDataFromServer();  

