import { ref } from '@vue/composition-api';

export default function useFetching<A extends any[], T>(
  fetch: (...rest: A) => Promise<T>,
) {
  const fetching = ref(false);
  return {
    fn: (...rest: A) => {
      fetching.value = true;
      return fetch(...rest).finally(() => {
        fetching.value = false;
      });
    },
    fetching,
  };
}
