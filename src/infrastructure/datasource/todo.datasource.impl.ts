
import { prisma } from "../../data/postgres";
import { CreateTodoDto, TodoDataSource, TodoEntity, UpdateTodoDto } from "../../domain";


export class TodoDataSourceImpl implements TodoDataSource {
    async create(TodoEntity: CreateTodoDto): Promise<TodoEntity> {
        const todo = await prisma.todo.create({
            data: createTodoDto!,
          });

          return TodoEntity.fromObject(todo);
      
    }
    async getAll(): Promise<TodoEntity[]> {
        const todos = await prisma.todo.findMany();
        return todos.map(todo =>  TodoEntity.fromObject(todo));
    }
    async findById(id: number): Promise<TodoEntity | null> {
        const todo = await prisma.todo.findFirst({
            where: {id}
        });
        if(!todo) return null;
        return TodoEntity.fromObject(todo);
    }
    async updateTodo(updatedTodo: UpdateTodoDto): Promise<TodoEntity | null> {
        const todo = await this.findById(updatedTodo.id);
        const updatedTodo = await prisma.todo.update({
            where: { id },
            data: updateTodoDto!.values,
          });

          return TodoEntity.fromObject(updatedTodo);
    }
    async deleteById(id: number): Promise<boolean> {
        const todo = await this.findById(updatedTodo.id);
        const todoDelted = await prisma.todo.delete({
            where: {
              id,
            },
          });

          return TodoEntity.fromObject(todoDelted);
    }
    
}