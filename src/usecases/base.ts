export default abstract class BaseUseCase {
    public context: any;
    public data: any;


    getData(): any {
        return this.data;
    }
    setContext(context: any) {
        this.context = context;
    }

    async execute(): Promise<void> {}
}