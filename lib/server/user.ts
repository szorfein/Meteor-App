import { User, RegisterUser } from '/both/models/user.model'
import { Users } from '/both/collections/users.collection'


class UserLib {

    public isAlrealyRegister(newNinja : RegisterUser) {
        const user = Users.find({ $or: [
            { username: newNinja.username },
            { 'emails.address': newNinja.email }
        ]})
        return !!user

    }
}
export const userLib = new UserLib()
