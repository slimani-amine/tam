const userId = localStorage.getItem("userId");
export const getUsers = async () => {
  try {
    const res = await fetch(
      `http://localhost:1337/api/users?populate=*`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!res.ok) {
      throw new Error("Failed to getUser ");
    }
    const data = await res.json();
    if (data) {
      return data
    }
  } catch (error) {
    console.log(error);
  }
};
export const getUser = async (Id) => {
  try {
    const res = await fetch(
      `http://localhost:1337/api/users/${Id}?populate=*`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!res.ok) {
      throw new Error("Failed to getUser ");
    }
    const data = await res.json();
    if (data) {
      return data
    }
  } catch (error) {
    console.log(error);
  }
};
export const getProjects = async () => {
  try {
    const res = await fetch(
      `http://localhost:1337/api/users/${userId}?populate=*`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!res.ok) {
      throw new Error("Failed to getProjects of user");
    }
    const data = await res.json();
    if (data.projects) {
      return data.projects;
    }
  } catch (error) {
    console.log(error);
  }
};
export const getProject = async (Id) => {
  try {
    const res = await fetch(
      `http://localhost:1337/api/projects/${Id}?populate=*`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!res.ok) {
      throw new Error("Failed to getProject ");
    }
    const { data } = await res.json();
    if (data.attributes) {
      return data.attributes;
    }
  } catch (error) {
    console.log(error);
  }
};
const submitNewProject = async function (newProjectData) {
  try {
    const jwtToken = localStorage.getItem("token");
    const res = await fetch(`http://localhost:1337/api/projects`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
      body: JSON.stringify({ data: newProjectData }),
    });
    const { data } = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};
export const pushNewProject = async function (newProjectData, idUser = userId, idProject) {
  try {
    const jwtToken = localStorage.getItem("token");
    let newProject = undefined
    if (idUser === userId) {
      newProject = await submitNewProject(newProjectData, idUser);
    } else {

      newProject = { id: idProject * 1, attributes: newProjectData }
    }
    const lastProjects = await getProjects(idUser);
    console.log(newProject, "newProject");
    const updatedProjects = lastProjects.concat({
      id: newProject.id ? newProject.id : null,
      Name: newProject.attributes.Name,
      createdAt: newProject.attributes.createdAt,
      publishedAt: newProject.attributes.publishedAt,
      updatedAt: newProject.attributes.updatedAt,
      url: newProject.attributes.url
    });
    const res = await fetch(`http://localhost:1337/api/users/${idUser}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
      body: JSON.stringify({
        projects: updatedProjects,
      }),
    });

    const { data } = await res.json();
    return data;
  } catch (err) {
    console.error(err);
  }
};
export const changeProject = async (projectId, idOfNewAssigne) => {
  try {
    const jwtToken = localStorage.getItem("token");
    const newAssignee = await getUser(idOfNewAssigne)
    const newAssignees = { id: newAssignee.id, attributes: newAssignee }
    const lastProject = await getProject(projectId);
    console.log(lastProject.users, "last");
    let updatedProject = undefined
    if (lastProject) {
      updatedProject = {
        id: projectId,
        Name: lastProject.Name,
        url: lastProject.url,
        createdAt: lastProject.createdAt,
        publishedAt: lastProject.publishedAt,
        updatedAt: lastProject.updatedAt,
        users: lastProject.users.data.concat(newAssignees)
      };
    }
    console.log(updatedProject, "upp");
    const res = await fetch(`http://localhost:1337/api/projects/${ProjectId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
      body: JSON.stringify({
        data: updatedProject
      }),
    });
    const data = await res.json()
    return data;
  } catch (err) {
    console.log(err);
  }
}
export const deleteProject = async (projectId) => {
  try {
    const jwtToken = localStorage.getItem("token");
    const res = await fetch(`http://localhost:1337/api/projects/${projectId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
    });
    const data = await res.json()
    return data;
  } catch (err) {
    console.log(err);
  }
}
export const getTasks = async (projectId) => {
  try {
    const res = await fetch(
      `http://localhost:1337/api/projects/${projectId}?populate=*`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!res.ok) {
      throw new Error("Failed to getTasks ");
    }
    const { data } = await res.json();
    if (data.attributes) {
      return data.attributes.tasks.data;
    }
  } catch (error) {
    console.log(error);
  }
};
export const getTask = async (Id) => {
  try {
    const res = await fetch(
      `http://localhost:1337/api/tasks/${Id}?populate=*`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!res.ok) {
      throw new Error("Failed to getTasks ");
    }
    const { data } = await res.json();
    if (data.attributes) {
      return data.attributes;
    }
  } catch (error) {
    console.log(error);
  }
};
export const changeTask = async (taskId, newTitle, newDesc, newStatus, newFlag, newDeadline, newTags,newUser) => {
  try {
    const jwtToken = localStorage.getItem("token");
    const lastTask = await getTask(taskId);
    console.log(lastTask, "last");
    let updatedTask = undefined
    if (lastTask) {
      updatedTask = {
        id: taskId,
        title: newTitle ? newTitle : lastTask.title,
        flag: newFlag ? newFlag : lastTask.flag,
        createdAt: lastTask.createdAt,
        publishedAt: lastTask.publishedAt,
        updatedAt: lastTask.updatedAt,
        description: newDesc ? newDesc : lastTask.description,
        priority: lastTask.priority,
        status: newStatus ? newStatus : lastTask.status,
        deadline: newDeadline ? newDeadline : lastTask.deadline,
        tags: newTags ? newTags : lastTask.tags,
        users_assignees : newUser ? newUser : lastTask.users_assignees
      };
    }

    console.log(updatedTask, "upp");
    const res = await fetch(`http://localhost:1337/api/tasks/${taskId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
      body: JSON.stringify({
        data: updatedTask
      }),
    });
    const data = await res.json()
    return data;
  } catch (err) {
    console.log(err);
  }
}
export const deleteTask = async (taskId) => {
  try {
    const jwtToken = localStorage.getItem("token");
    const res = await fetch(`http://localhost:1337/api/tasks/${taskId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
    });
    const data = await res.json()
    return data;
  } catch (err) {
    console.log(err);
  }
}
export const getComments = async (taskId) => {
  try {
    const res = await fetch(
      `http://localhost:1337/api/tasks/${taskId}?populate=*`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!res.ok) {
      throw new Error("Failed to getComment ");
    }
    const { data } = await res.json();
    if (data.attributes) {
      return data.attributes.comments.data;
    }
  } catch (error) {
    console.log(error);
  }
};
const submitNewTask = async function (newTaskData) {
  try {
    const jwtToken = localStorage.getItem("token");
    const res = await fetch(`http://localhost:1337/api/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
      body: JSON.stringify({ data: newTaskData }),
    });
    const { data } = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};
export const pushNewTask = async function (newTaskData, projectId = 1) {
  try {
    const jwtToken = localStorage.getItem("token");
    const newTask = await submitNewTask(newTaskData);

    const lastTasks = await getTasks(projectId);

    const updatedTask = lastTasks.concat(
      {
        id: newTask.id,
        title: newTask.attributes.title,
        createdAt: newTask.attributes.createdAt,
        publishedAt: newTask.attributes.publishedAt,
        updatedAt: newTask.attributes.updatedAt,
        description: newTask.attributes.description,
        priority: newTask.attributes.priority,
        status: newTask.attributes.status
      });

    const res = await fetch(`http://localhost:1337/api/projects/${projectId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
      body: JSON.stringify({
        data: { tasks: updatedTask },
      }),
    });
    const data = await res.json()
    return data;
  } catch (err) {
    console.log(err);
  }
};
const addComment = async (newComment) => {
  try {
    const jwtToken = localStorage.getItem("token");

    const res = await fetch(`http://localhost:1337/api/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
      body: JSON.stringify({ data: { description: newComment } })
    });
    const data = await res.json()
    return data;
  } catch (err) {
    console.log(err);
  }
}

export const getTags = async () => {
  try {
    const res = await fetch(
      `http://localhost:1337/api/tags`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!res.ok) {
      throw new Error("Failed to getTags");
    }
    const { data } = await res.json();
    if (data) {
      return data
    }
  } catch (error) {
    console.log(error);
  }
};
export const changeTags = async (tagId, taskId) => {
  try {
    const jwtToken = localStorage.getItem("token");
    const res = await fetch(`http://localhost:1337/api/tags/${tagId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
      body: JSON.stringify({
        data: { tasks: taskId }
      }),
    });
    const data = await res.json()
    return data;
  } catch (err) {
    console.log(err);
  }
}
export const pushNewComment = async (taskId, newCommentData) => {
  try {
    const jwtToken = localStorage.getItem("token");
    const newComment = await addComment(newCommentData);
    const res = await fetch(`http://localhost:1337/api/comments/${newComment.data.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
      body: JSON.stringify({
        data: { task: taskId }
      }),
    });
    const data = await res.json()
    return data;
  } catch (err) {
    console.log(err);
  }
}