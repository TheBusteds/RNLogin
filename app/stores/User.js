import { action, extendObservable } from 'mobx';
import { Platform } from 'react-native';

class Default {
    constructor() {
        this.reset();
    }
    @action reset() {
        extendObservable(this, {
            user: 'ahmad@subarja.com',
            password: '123456',
        });
    }
}
export default new Default();