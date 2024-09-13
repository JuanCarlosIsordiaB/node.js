import { CreateTodoDto, TodoEntity, TodoRepository, UpdateTodoDto } from "../../domain";



export class TodoRepositoryImpl implements TodoRepository {


    constructor(
        private readonly datasource: TodoDataSource
    ) {}

    create(TodoEntity: CreateTodoDto): Promise<TodoEntity> {
        return this.datasource.create(createTodoDto)
    }
    getAll(): Promise<TodoEntity[]> {
        return this.datasource.getAll()
    }
    findById(id: number): Promise<TodoEntity | null> {
        return this.datasource.findById(id)
    }
    updateTodo(updatedTodo: UpdateTodoDto): Promise<TodoEntity | null> {
        return this.datasource.updateById(updateodoDto)
    }
    deleteById(id: number): Promise<boolean> {
        return this.datasource.deleteTodo(deleteTodoDto)
    }

}