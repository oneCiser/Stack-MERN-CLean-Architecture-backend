import {ICRUD} from "../domain/repositories/ICRUD";

export default class UserService<T, R, Q> {
    private repository: ICRUD<T, R, Q>;

    constructor(repository: ICRUD<T, R, Q>) {
        this.repository = repository;
    }
    getAll(): Promise<T[]> {
        return this.repository.getAll();
    }
    get(entity: Q): Promise<T | null> {
        return this.repository.get(entity);
    }
    create(entity: R): Promise<T | null> {
        return this.repository.create(entity);
    }
    update(query: Q, entity: R): Promise<T | null> {
        return this.repository.update(query, entity);
    }
    delete(query: Q): Promise<T | null> {
        return this.repository.delete(query);
    }
}