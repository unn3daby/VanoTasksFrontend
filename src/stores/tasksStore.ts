import { acceptHMRUpdate, defineStore } from 'pinia';
import { PaginigModel } from 'src/models/APIModel';
import Notification from 'src/utils/Notification';
import { SingleTaskModel, TaskModel } from 'src/models/TaskModel';
import { getAPI } from 'src/services/baseApiFabric';
import { ref, Ref } from 'vue';
import { CommentModel } from 'src/models/CommentModel';
import { msApi } from 'src/api/authService';

export const useTasksStore = defineStore('tasks', () => {
  const tasksApi = getAPI(`${import.meta.env.VITE_MS_API}`);
  const paging: Ref<PaginigModel> = ref({} as PaginigModel);
  const tasksArray: Ref<Array<TaskModel>> = ref([]);
  const currentTask: Ref<SingleTaskModel> = ref({} as SingleTaskModel);
  const currentComments: Ref<Array<CommentModel>> = ref([]);

  const getTasks = async () => {
    try {
      const { data } = await getAPI(import.meta.env.VITE_MS_API).getTasks<
        Array<TaskModel>
      >();
      tasksArray.value = data.items;
      const { page, pages, size, total } = data;
      paging.value = { page, pages, size, total };
    } catch (error) {
      Notification.error('Ошибка');
    }
  };

  const getTaskById = async (id: number | string) => {
    try {
      const { data } = await msApi.get(`/tasks/${id}`);
      currentTask.value = data;
      const { page, pages, size, total } = data;
      paging.value = { page, pages, size, total };
    } catch (error) {
      Notification.error('Ошибка');
    }
  };

  const putTaskStatus = async (taskId: number, status: number) => {
    try {
      await msApi.put(
        `${import.meta.env.VITE_MS_API}/tasks/${taskId}/change_status/${status}`
      );
      Notification.success('Статус задачи успешно изменен');
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
      Notification.success('Комментарий добавлен');
    } catch (error) {
      Notification.error('Ошибка');
    }
  };

  return {
    tasksApi,
    tasksArray,
    currentTask,
    currentComments,
    getTasks,
    putTaskStatus,
    getTaskById,
    getComments,
    postComment,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useTasksStore, import.meta.hot));
}
