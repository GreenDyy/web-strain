import React from "react";
import './Main.scss'
import NewsPaper from "../../newspaper/NewsPaper";
import Project from "../project/Project";
import ContentWork from "../contentWork/ContentWork";
import ProjectContent from "../projectContent/ProjectContent";
import StrainManament from "../strainManament/StrainManament";
import AllStrain from "../allStrain/AllStrain";
import ProfileEmployee from "../Proflie/ProfileEmployee";

function Main({ nameScreen = 'contentWork', employee }) {
    return (
        <div className="Main">
            {nameScreen === 'contentWork' && <ContentWork employee={employee} />}
            {nameScreen === 'newPaper' && <NewsPaper />}
            {nameScreen === 'project' && <Project employee={employee} />}
            {nameScreen === 'projectContent' && <ProjectContent />}
            {nameScreen === 'strainManament' && <StrainManament employee={employee} />}
            {nameScreen === 'allStrain' && <AllStrain />}
            {nameScreen === 'profile' && <ProfileEmployee employee={employee}/>}
        </div>
    )
}

export default Main