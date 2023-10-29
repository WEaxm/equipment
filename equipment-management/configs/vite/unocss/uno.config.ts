import { UserConfig, defineConfig, presetUno } from 'unocss';

const unoconfig: UserConfig = defineConfig({
  presets: [presetUno()],
  theme: {
    container: {
      center: true,
    },
  },
});

export default unoconfig;
