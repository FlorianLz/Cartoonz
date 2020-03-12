import React, {useEffect, useState} from "react";
import axios from "axios";
import FinAjoutQuizz from "./FinAjoutQuizz";

function AddQuest(props)  {
    let nomQuizz=props.match.params.nomquizz;
    const [questActuelle,setQuestActuelle] = useState(1);
    const [idQuizz,setIdQuizz] = useState(0);
    const [imgQuizz,setImgQuizz] = useState('');
    const [termine, setTermine] = useState(0);

    function gBox(nbCheck){
        if(nbCheck.checked == true){
            return 1;
        }
        else{
            return 0;
        }
    }

    async function ajoutrep(r1,r2,r3,r4) {
        const data = (await axios.get('http://localhost:8000/dernierid')).data;
        let dernierId=data;
        console.log(dernierId);
        axios.post('http://localhost:8000/addAnswer/'+dernierId, r1).then(axios.post('http://localhost:8000/addAnswer/'+dernierId, r2));
        //await axios.post('http://localhost:8000/addAnswer/'+dernierId, r2);
        //await axios.post('http://localhost:8000/addAnswer/'+dernierId, r3);
        //await axios.post('http://localhost:8000/addAnswer/'+dernierId, r4);
        setQuestActuelle(questActuelle+1);
    }

    function ajout(e) {
        e.preventDefault();
        if(questActuelle < 10){
            //console.log(e.target.elements[0].value);
            //console.log(e.target.elements[2].value);
            //console.log(e.target.elements[4].value);
            //console.log(e.target.elements[6].value);
            //console.log(e.target.elements[8].value);
            //console.log(e.target.elements[9].value);

            let q = {
                question : e.target.elements[0].value,
                score : e.target.elements[9].value,
                idquizz : idQuizz,
            };
            let r1 = {
                reponse : e.target.elements[2].value,
                solucereponse : gBox(e.target.elements[1]),
            };
            let r2 = {
                reponse : e.target.elements[4].value,
                solucereponse : gBox(e.target.elements[3]),
            };
            let r3 = {
                reponse : e.target.elements[6].value,
                solucereponse : gBox(e.target.elements[5]),
            };
            let r4 = {
                reponse : e.target.elements[8].value,
                solucereponse : gBox(e.target.elements[7]),
            };
            axios.post('http://localhost:8000/addQuestion/'+idQuizz, q).then(ajoutrep());

        }else{
            setTermine(1);
        }


    }

    async function getIdQuizz() {
        const data = (await axios.get('http://localhost:8000/idquizz/'+nomQuizz)).data;
        setIdQuizz(data.id);
    }
    async function getImgQuizz() {
        const data = (await axios.get('http://localhost:8000/imgquizz/'+nomQuizz)).data;
        setImgQuizz(data.picture_url);
    }

    useEffect(() => {
        getIdQuizz();
    },[]);


    if(termine === 0){
        return (
            <div className={"Rep endRep"}>
                <div align="center"><img src="../images/logo_final.png" alt="Image de dessins animée" className="logo"/></div>
                <h2> Add quest {questActuelle} for {nomQuizz}</h2>
                <form onSubmit={e => ajout(e)} id={"myform"}>
                    <div className={"infosLog"}>
                        <center><input type={"text"} placeholder={"question"} name={"quest1"} className={"quest"}/></center>
                        <div className={"addRep"}>
                            <div>
                                <div><input type="checkbox" id="scales" name="scales" /><input type={"text"} placeholder={"Response 1"} name={"rep1"}/></div>
                                <div><input type="checkbox" id="scales" name="scales" /><input type={"text"} placeholder={"Response 2"} name={"rep2"}/></div>
                            </div>
                            <div>
                                <div><input type="checkbox" id="scales" name="scales" /><input type={"text"} placeholder={"Response 3"} name={"rep3"}/></div>
                                <div><input type="checkbox" id="scales" name="scales" /><input type={"text"} placeholder={"Response 4"} name={"rep4"}/></div>
                            </div>
                        </div>
                        <center><input type={"text"} placeholder={"score"} name={"score1"} className={"score"}/></center>
                    </div>
                    <center><input type={"submit"} value={"Next"} className={"buttonLog"}/></center>
                </form>
            </div>
        );
    }

    if (termine === 1){
        return(
            <FinAjoutQuizz idquizz={idQuizz} nomquizz={nomQuizz} imgquizz={imgQuizz} />
        );
    }

}

export default AddQuest;