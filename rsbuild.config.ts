import { defineConfig } from '@rsbuild/core';
import { pluginBabel } from '@rsbuild/plugin-babel';
import { pluginSolid } from '@rsbuild/plugin-solid';
import { pluginTypeCheck } from '@rsbuild/plugin-type-check';
import type RspackChain from '@rsbuild/core/compiled/rspack-chain';

const prod = process.env.NODE_ENV === 'production';
export default defineConfig({
  plugins: [
    pluginTypeCheck(),
    pluginBabel({
      include: /\.(?:jsx|tsx)$/,
    }),
    pluginSolid(),
  ],
  dev: {
    hmr: false,
    liveReload: false,
  },
  source: {
    define: {
      __BUILD_DATE__: Date.now(),
    },
  },
  output: {
    charset: 'utf8',
    cleanDistPath: prod,
    distPath: { js: '', css: '' },
    sourceMap: {
      js: !prod && 'cheap-source-map',
    },
  },
  html: {
    template: './src/index.html',
    favicon: './src/favicon.png',
  },
  server: {
    htmlFallback: false,
  },
  tools: {
    bundlerChain: chain => chain
      .output
        .publicPath('auto')
        .end()
      .module
        .rule('js')
        .batch(useSimpleFunctionalLoader(
          'tagged-template-reactivity-fix',
          source => source.replace(/(_\$insert\([^,]+, ?)(t`)/g, '$1()=>$2'),
        ))
        .end().end()
      // .optimization.concatenateModules(false).end()  // for bundle analyze
      .experiments({
        rspackFuture: {
          bundlerInfo: {
            force: false,
          },
        },
      }).end(),
  },
  performance: {
    // bundleAnalyze: {},
    chunkSplit: {
      strategy: 'all-in-one',
    },
  },
});

function useSimpleFunctionalLoader(name: string, processor: (source: string) => string) {
  return (chained: RspackChain.Rule) => chained
    .use(name)
    .loader('simple-functional-loader')
    .set('ident', name)
    .options({ processor });
}
