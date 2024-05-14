import { acceptHMRUpdate, defineStore } from 'pinia';
import { PaginigModel } from 'src/models/APIModel';
import Notification from 'src/utils/Notification';
import { UserModel } from 'src/models/UserModel';
import {
  ProjectCreationModel,
  ProjectModel,
  ProjectResponseModel,
  SingleProjectModel,
} from 'src/models/ProjectModel';
import { ref, Ref } from 'vue';
import { msApi } from 'src/api/authService';
import { TaskModel } from 'src/models/TaskModel';
import { AxiosError } from 'axios';

export const useProjectsStore = defineStore('projects', () => {
  const paging: Ref<PaginigModel> = ref({} as PaginigModel);
  const projectsArray: Ref<Array<ProjectModel>> = ref([]);
  const currentProject: Ref<SingleProjectModel> = ref({
    project: {
      id: 0,
      project_name: '',
      description: '',
      project_code: '',
      created_by: 0,
      created_at: '',
    },
    tasks_count: 0,
  });
  const currentProjectUsers: Ref<Array<UserModel>> = ref([]);
  const currentProjectTasks: Ref<TaskModel[]> = ref([]);

  const getProjects = async () => {
    try {
      const { data } = await msApi.get<ProjectResponseModel>('/projects');
      projectsArray.value = data.items;
      const { page, pages, size, total } = data;
      paging.value = { page, pages, size, total };
    } catch (error) {
      Notification.error('Ошибка');
    }
  };

  const getProjectsByUserId = async (userId: number | string) => {
    try {
      const { data } = await msApi.get<Array<ProjectModel>>(
        `/projects/user_projects/${userId}`
      );
      projectsArray.value = data;
    } catch (error) {
      Notification.error('Ошибка');
    }
  };

  const postProject = async (payload: ProjectCreationModel) => {
    try {
      await msApi.post<ProjectResponseModel>('/projects/', payload);
      Notification.success('Проект создан');
    } catch (error) {
      Notification.error('Ошибка');
    }
  };

  const getProjectById = async (id: number | string) => {
    try {
      const { data } = await msApi.get<SingleProjectModel>(`/projects/${id}`);
      currentProject.value = data;
    } catch (error) {
      Notification.error('Ошибка');
    }
  };

  const getTaskByProjectId = async (projectId: number | string) => {
    try {
      const { data } = await msApi.get<Array<TaskModel>>(
        `/tasks/project_tasks/${projectId}/`
      );
      currentProjectTasks.value = data;
    } catch (error) {
      Notification.error('Ошибка');
    }
  };

  const getProjectUsersById = async (projectId: number | string) => {
    try {
      const { data } = await msApi.get<Array<UserModel>>(
        `/projects/project_users/${projectId}`
      );
      currentProjectUsers.value = data;
    } catch (error) {
      Notification.error('Ошибка');
    }
  };

  const postProjectsUsersById = async (
    projectId: number | string,
    userId: number | string
  ) => {
    try {
      const { data } = await msApi.post<Array<UserModel>>(
        `/projects/user_projects/${userId}/${projectId}`
      );
      currentProjectUsers.value = data;
      Notification.success('Пользователь успешно добавлен');
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(error.response?.data?.detail || 'Ошибка');
      }
    }
  };

  const putProjectById = async (
    projectId: number | string,
    payload: ProjectCreationModel
  ) => {
    try {
      await msApi.put<Array<UserModel>>(`/projects/${projectId}`, payload);
      Notification.success('Проект успешно обновлен');
    } catch (error) {
      Notification.error('Ошибка');
    }
  };

  return {
    paging,
    projectsArray,
    currentProject,
    currentProjectUsers,
    currentProjectTasks,
    getProjectUsersById,
    getProjectById,
    getTaskByProjectId,
    postProjectsUsersById,
    getProjects,
    getProjectsByUserId,
    postProject,
    putProjectById,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useProjectsStore, import.meta.hot));
}
