import { CreateTodoDto, UpdateTodoDto } from "../dtos";
import { TodoEntity } from "../entities/todo.entity";


export abstract class TodoDataSource {
    abstract create(TodoEntity: CreateTodoDto): Promise<TodoEntity>;


    //todo: paginacion
    abstract getAll(): Promise<TodoEntity[]>;

    abstract findById(id: number): Promise<TodoEntity | null>;
    abstract updateTodo(updatedTodo: UpdateTodoDto): Promise<TodoEntity | null>;
    abstract deleteById(id: number): Promise<boolean>;

}