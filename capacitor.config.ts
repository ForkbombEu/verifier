import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
    appId: 'eu.forkbomb.didroom.verifier',
    appName: 'verifier',
    webDir: 'build',
    server: {
        androidScheme: 'https',
        cleartext: true
    }
};

export default config;
