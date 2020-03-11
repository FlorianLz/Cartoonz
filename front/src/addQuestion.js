import React from "react";

function addQuest()  {

    return (
        <div className={"Rep"}>
            <center><h2> Add quest</h2></center>
            <form action="#">
                <div className={"infosLog"}>
                    <center><input type={"text"} placeholder={"question 1"} name={"quest1"} className={"quest"}/></center>
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
                    <center><input type={"text"} placeholder={"score 1"} name={"score1"} className={"score"}/></center>
                </div>
                <center><input type={"submit"} value={"Next"} className={"buttonLog"}/></center>
            </form>
        </div>

    );
}

export default addQuest;