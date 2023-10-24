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

//Request Demo
// const getDataFromServer = async () => {
//   const firsStepResponse = await fetch("https://pokeapi.co/api/v2/pokemon/ditto", {
//       method: "GET",
//     })
//    let firsStepData = await firsStepResponse.json();
//     console.log(firsStepData)

//   }

const getDataFromServer = async () => {
    try{
        const data = JSON.stringify({
            name: "Liliana Aguirre",
            email: "aguirre.wl@gmail.com"
         });
        const firsStepResponse = await fetch("https://candidates.mifiel.com/api/v1/users",{
        method: "POST",
        mode: "no-cors",
        headers: {
            "Content-Type": "application/json",
          },
        body:data,
      });
     let firsStepData = await firsStepResponse.json();
     resultHistorial.id= firsStepData.id;
     resultHistorial.next_challenge.challenge = firsStepData.next_challenge.challenge;
     hash256Process();

    }catch (error){
        console.log("error: ",error)
    }
}

const putDataChallengePow= async () =>{
   const finalStepDataToSend = await fetch(`https://candidates.mifiel.com/api/v1/users/${resultHistorial.id}/challenge/pow`,{
       method: "PUT",
       body: JSON.stringify({result: resultHistorial.next_challenge.nonce
       }),
       headers: {"Content-Type": "application/json; charset=UTF-8"}
       })
      let finalStepResult = await finalStepDataToSend.json();
     console.log(finalStepResult)
}

const pOwProcess = async () =>{
    const thirdStepDataToSend = await fetch(`/api/v1/calculateNonce/pow`, {
        method: "POST",
        body: JSON.stringify({
            sha256Message:resultHistorial.next_challenge.challenge,
            difficulty:resultHistorial.next_challenge.difficulty,
        }),
        headers: {"Content-Type": "application/json; charset=UTF-8"}
      })
     let thirdStepData = await thirdStepDataToSend.json();
     resultHistorial.next_challenge.nonce = thirdStepData.next_challenge.nonce;
     putDataChallengePow();
}

const putDataSha256= async () =>{
    const secondStepDataToSend = await fetch(`https://candidates.mifiel.com/api/v1/users/${resultHistorial.id}/challenge/digest`, {
        method: "PUT",
        body: JSON.stringify({result: resultHistorial.next_challenge.sha256Message
        }),
        headers: {"Content-Type": "application/json; charset=UTF-8"}
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
        headers: {"Content-Type": "application/json; charset=UTF-8"}
      })
     let secondStepData = await secondStepResponse.json();
     resultHistorial.next_challenge.sha256Message = secondStepData;
     putDataSha256();
}

document.getElementById("btn").onclick = getDataFromServer();  

