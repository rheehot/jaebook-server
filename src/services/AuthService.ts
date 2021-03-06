import { Service } from "typedi";
import { InjectRepository } from "typeorm-typedi-extensions";
import { User } from "../entities/User";
import { UserRepository } from "../repositories/UserRepository";

@Service()
export class AuthService {
    constructor(@InjectRepository() private userRepository: UserRepository) {}

    public async validateUser(email: string, password: string): Promise<User> {
        const user = await this.userRepository.findOne({
            where: {
                email,
            },
        });

        if (User.comparePassword(user, password)) {
            return user;
        }

        return undefined;
    }

    public async saveRefreshToken(user: User, token: string): Promise<void> {
        user.refreshToekn = token;
        this.userRepository.save(user);
    }
}
