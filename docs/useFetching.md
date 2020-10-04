# useFetching

Vue hook that wrap a promise Api function with the fetching ref.

## Usage

```jsx {6,17}
import { defineComponent, reactive } from '@vue/composition-api';
import { useFetching } from '@u3u/vue-hooks';

const Demo = defineComponent({
  setup() {
    const apiGetProductList = () => {
      const mock = [
        { name: 'iphone', price: '$2000' },
        { name: 'macbook pro', price: '$4000' },
        { name: 'jet plane', price: '$100000' }
      ]
      return new Promise((resolve, reject)  => {
        setTimeout(() => {
          resolve(mock)
        }, 2000)
      })
    }
    const { fetching, fn as fetchProductList } = useFetching(apiGetProductList)
    // fetch products
    const list = reactive([])
    fetchProductList().then((res) => list.push(...res))
    return {
      fetching,
      list
    };
  },

  render() {
    return (
      <div>
        {this.fetching ? (
          <div>loading...</div>
        ) : (
          <div>
            {this.list.map((item) => {
              return (
                <div>
                  {item.name} - {item.price}
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  },
});
```

## Reference

```typescript
function useFetching<A extends any[], T>(
  fetch: (...rest: A) => Promise<T>,
): {
  fn: (...rest: A) => Promise<T>;
  fetching: Ref<boolean>;
};
```

### `Arguments`

- `fetch`

  any function with a return value of promise.

  - Type: `function`
  - reqiured: `true`

### `ReturnValue`

0. fetching. [`Ref<boolean>`](https://github.com/vuejs/composition-api/blob/a7a68bda5d32139c6cf05b45e385cf8d4ce86707/src/reactivity/ref.ts#L8-L10)
1. fn. `function`
