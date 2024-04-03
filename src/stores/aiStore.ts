import { acceptHMRUpdate, defineStore } from 'pinia';
import { msApi } from 'src/api/authService';

export const useAiStore = defineStore('ai', {
  state: () => ({
    response: '',
  }),
  actions: {
    async makeQuestion(question: string) {
      try {
        const { data } = await msApi.post<{ answer: string }>(
          '/gigachat/answer',
          {},
          { params: { question } }
        );
        this.response = data.answer;
      } catch (error) {
        throw new Error(`${error}`);
      }
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAiStore, import.meta.hot));
}
