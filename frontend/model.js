const userId = localStorage.getItem("userId");
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
export const changeTask = async (taskId, newStatus, newFlag, newCommenct) => {
  try {
    const jwtToken = localStorage.getItem("token");
    let updatedComment = ""
    if (newCommenct) {
      updatedComment = await pushNewComment(taskId, newCommenct)
    }
    const lastTask = await getTask(taskId);

    const updatedTask = {
      id: lastTask.id,
      title: lastTask.title,
      flag: newFlag ? newFlag : lastTask.flag,
      createdAt: lastTask.createdAt,
      publishedAt: lastTask.publishedAt,
      updatedAt: lastTask.updatedAt,
      description: lastTask.description,
      priority: lastTask.priority,
      status: newStatus ? newStatus : lastTask.status,
      comments: { data: updatedComment ? updatedComment : lastTask.comments.data }
    };
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
export const pushNewComment = async (taskId, newCommentData) => {
  try {
    const jwtToken = localStorage.getItem("token");
    const newComment = await addComment(newCommentData);

    const lastComments = await getComments(taskId);

    const updatedComment = lastComments.concat(
      {
        id: newComment.id,
        createdAt: newComment.data.attributes.createdAt,
        publishedAt: newComment.data.attributes.publishedAt,
        updatedAt: newComment.data.attributes.updatedAt,
        description: newComment.data.attributes.description,
      });

    return updatedComment
  } catch (err) {
    console.log(err);
  }
}
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
export const pushNewProject = async function (newProjectData) {
  try {
    const jwtToken = localStorage.getItem("token");

    const newProject = await submitNewProject(newProjectData, userId);

    const lastProjects = await getProjects(userId);

    const updatedProjects = lastProjects.concat({
      id: newProject.id,
      Name: newProject.attributes.Name,
      createdAt: newProject.attributes.createdAt,
      publishedAt: newProject.attributes.publishedAt,
      updatedAt: newProject.attributes.updatedAt,
      url: newProject.attributes.url
    });

    const res = await fetch(`http://localhost:1337/api/users/${userId}`, {
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