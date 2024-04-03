import { acceptHMRUpdate, defineStore } from 'pinia';
import { PaginigModel } from 'src/models/APIModel';
import Notification from 'src/utils/Notification';
import { ProjectModel, ProjectResponseModel } from 'src/models/ProjectModel';
import { ref, Ref } from 'vue';
import { msApi } from 'src/api/authService';

export const useProjectsStore = defineStore('projects', () => {
  const paging: Ref<PaginigModel> = ref({} as PaginigModel);
  const projectsArray: Ref<Array<ProjectModel>> = ref([]);
  const currentProject: Ref<ProjectModel> = ref({} as ProjectModel);

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

  const getProjectById = async (id: number | string) => {
    try {
      const { data } = await msApi.get<ProjectModel>(`/projects/${id}`);
      currentProject.value = data;
    } catch (error) {
      Notification.error('Ошибка');
    }
  };

  /* const putTaskStatus = async (taskId: number, status: number) => {
    try {
      await msApi.put(
        `${import.meta.env.VITE_MS_API}/tasks/${taskId}/change_status/${status}`
      );
    } catch (error) {
      Notification.error('Ошибка');
    }
  };

  const getComments = async (taskId: number | string) => {
    try {
      const { data } = await msApi.get<Array<CommentModel>>(
        `${import.meta.env.VITE_MS_API}/tasks/task_comments/${taskId}`
      );
      currentComments.value = data.reverse();
    } catch (error) {
      Notification.error('Ошибка');
    }
  };

  const postComment = async (comment_text: string, taskId: number | string) => {
    try {
      await msApi.post(
        `${import.meta.env.VITE_MS_API}/tasks/task_comments/${taskId}`,
        { comment_text }
      );
    } catch (error) {
      Notification.error('Ошибка');
    }
  }; */

  return {
    paging,
    projectsArray,
    currentProject,
    getProjectById,
    getProjects,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useProjectsStore, import.meta.hot));
}
