import { makeAutoObservable } from "mobx";

class MenuStore {

    selectedKey = '';
    constructor() {
        makeAutoObservable(this)
    }

    setSelectedKey(key: string) {
        this.selectedKey = key
    }
}

const menuStore = new MenuStore();
export default menuStore