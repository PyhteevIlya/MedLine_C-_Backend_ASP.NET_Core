import { makeAutoObservable } from "mobx";
import { Record } from "../../../entities/Record/model/type/record";
import { User } from "../../../entities/User/model/types/user";

class RootStore {
    constructor() {
        makeAutoObservable(this)
    }

    record!: Record;
    User!: User;
    auth!: boolean;

    async fetchUserInfo(user: User)
    {
        try{
            this.User = user;
            this.auth = true;
        }catch(error) {
            console.log(error)
        }
    }
}

const rootStore = new RootStore();
export default rootStore