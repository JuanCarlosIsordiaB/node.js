
import { CreateTodoDto, TodoDataSource, TodoEntity, UpdateTodoDto } from "../../domain";


export class TodoDataSourceImpl implements TodoDataSource {
    create(TodoEntity: CreateTodoDto): Promise<TodoEntity> {
        throw new Error("Method not implemented.");
    }
    async getAll(): Promise<TodoEntity[]> {
        const todos = await prisma.todo.findMany();
        return todos.map(todo =>  TodoEntity.fromObject(todo));
    }
    findById(id: number): Promise<TodoEntity | null> {
        throw new Error("Method not implemented.");
    }
    updateTodo(updatedTodo: UpdateTodoDto): Promise<TodoEntity | null> {
        throw new Error("Method not implemented.");
    }
    deleteById(id: number): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    
}