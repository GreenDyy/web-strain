import React from "react";
import './Main.scss'
import NewsPaper from "../../newspaper/NewsPaper";
import Project from "../project/Project";
import ContentWork from "../contentWork/ContentWork";
import ProjectContent from "../projectContent/ProjectContent";

function Main({ nameScreen = 'contentWork' }) {
    return (
        <div className="Main">
            {nameScreen === 'contentWork' && <ContentWork />}
            {nameScreen === 'newPaper' && <NewsPaper />}
            {nameScreen === 'project' && <Project />}
            {nameScreen === 'projectContent' && <ProjectContent />}
        </div>
    )
}

export default Main