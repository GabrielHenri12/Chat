import * as os from "os";

export function getLocalIP() {
    const ifaces = os.networkInterfaces();

    for (const ifaceName in ifaces) {
        const iface = ifaces[ifaceName];
        if (iface) {
            for (let i = 0; i < iface.length; i++) {
                const alias = iface[i];
                if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                    return alias.address;
                }
            }
        }
    }
}