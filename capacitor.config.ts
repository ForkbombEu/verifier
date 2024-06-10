import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
    appId: 'com.didroom.verifier',
    appName: 'verifier',
    webDir: 'build',
    server: {
        androidScheme: 'https',
        cleartext: true
    }
};

export default config;
