/* eslint import/no-extraneous-dependencies: off */
import 'vue-tsx-support/enable-check';
import { storiesOf } from '@storybook/vue';
import { createComponent, reactive } from '@vue/composition-api';
import { useFetching } from '..';
import { ShowDocs } from './components';

const Docs = () => <ShowDocs md={require('../../docs/useFetching.md')} />;

const Demo = createComponent({
  setup() {
    const apiGetProductList: () => Promise<
      { name: string; price: string }[]
    > = () => {
      const mock = [
        { name: 'iphone', price: '$2000' },
        { name: 'macbook pro', price: '$4000' },
        { name: 'jet plane', price: '$100000' },
      ];
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(mock);
        }, 2000);
      });
    };
    const { fetching, fn: fetchProductList } = useFetching(apiGetProductList);
    // fetch products
    const list = reactive([]);
    fetchProductList().then((res) => list.push(...res));
    return {
      fetching,
      list,
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

storiesOf('useFetching', module)
  // @ts-ignore
  .add('docs', () => Docs)
  .add('demo', () => Demo);
