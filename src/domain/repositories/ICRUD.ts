interface IGet<M,Q> {
    get(query: Q): Promise<M | null>;
}

interface IGetAll<M,R> {
    getAll(): Promise<M[]>;
}

interface ICreate<M,R> {
    create(entity: R): Promise<M | null>;
}

interface IUpdate<M,R,Q> {
    update(query: Q,entity: R): Promise<M | null>;
}

interface IDelete<M,Q> {
    delete(query: Q): Promise<M | null>;
}

interface ICRUD<M,R,Q> extends IGet<M,Q>, IGetAll<M,R>, ICreate<M,R>, IUpdate<M,R,Q>, IDelete<M,Q> {}

export {
    IGet,
    IGetAll,
    ICreate,
    IUpdate,
    IDelete,
    ICRUD,
}