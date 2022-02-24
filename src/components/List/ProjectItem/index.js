import React from "react";
import { getProjectById, deleteProject, editProject } from "../../../API/project";
import Button from "../../Button";
import Input from "../../Input";

const ProjectItem = (props) => {
  const { projectId, projectName, setProjectName, setCurrentProject, renderProject, isDone, onClick } =
    props;

  async function handleEditProject(id) {
    document.querySelector(".button-update-task").style.display = "inline";
    document.querySelector(".button-add-task").style.display = "none";
    setProjectName(projectName);
    const requestId = {
      _id: id,
    };
    const currentProject = await getProjectById(requestId);
    setCurrentProject(currentProject);
  }

  async function handleDeleteProject(id) {
    await deleteProject(id);
    renderProject();
  }

  async function handleCheckIsDone(id) {
    const requestId = {
      _id: id,
    };
    const currentProject = await getProjectById(requestId);
    currentProject.isDone = !currentProject.isDone;
    await editProject(currentProject);
    renderProject();
  }

  return (
    <div className="todo-item">
      <span className="todo-item-taskname">
        <Input
          inputType="checkbox"
          inputId="checkbox"
          checked={isDone}
          onClick={() => handleCheckIsDone(projectId)}
        />
        <label onClick={onClick}>{projectName}</label>
      </span>
      <span className="todo-item-option">
        <Button
          buttonClass="button-edit-task"
          buttonName="Edit"
          onClick={() => handleEditProject(projectId)}
        />
        <Button
          buttonClass="button-delete-task"
          buttonName="Delete"
          onClick={() => handleDeleteProject(projectId)}
        />
      </span>
    </div>
  );
};

export default ProjectItem;
