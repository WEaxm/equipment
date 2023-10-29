import { PluginOption, UserConfig } from 'vite';
import react from '@vitejs/plugin-react';
import unocss from './unocss';
const plugins: PluginOption[] = [react(), unocss()];

const ViteUserConfig: UserConfig = {
  plugins,
};
export default ViteUserConfig;
