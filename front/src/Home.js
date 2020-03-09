import React from "react";
import QuizzThumbnail from "./QuizzThumbnail";

function Home()  {

    return (
        <div>Home Page <br /><br />
            <QuizzThumbnail title={"Dora l'exploratrice"} date={"06/05/2000"} author={"auteur"} />
            <QuizzThumbnail title={"L'âne trotro"} date={"06/05/2000"} author={"auteur"} />
        </div>

    );
}

export default Home;