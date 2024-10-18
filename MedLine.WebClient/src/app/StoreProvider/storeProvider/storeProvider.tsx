import menuStore from "../menuStore/menuStore";
import rootStore from "../rootStore/rootStore";

class StoreProvider {
    rootStore = rootStore;
    menuStore = menuStore;

}

export default StoreProvider;