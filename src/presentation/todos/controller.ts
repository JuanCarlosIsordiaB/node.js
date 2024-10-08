import { Request, Response } from "express";
import { prisma } from "../../data/postgres";
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos";

const todos = [
  { id: 1, text: "Buy milk", completedAt: new Date() },
  { id: 2, text: "Buy bread", completedAt: null },
  { id: 3, text: "Buy butter", completedAt: new Date() },
];

export class TodosController {
  todoRepository: any;
  //* DI
  constructor() {}

  public getTodos = async (req: Request, res: Response) => {
    const todos = await this.todoRepository.getAll();
    console.log(todos);
    return res.json(todos);
  };

  public getTodoById = async (req: Request, res: Response) => {
    const id = +req.params.id;
    const tod = this.todoRepository.findById(id);

    try{
      const todo = await this.todoRepository.findById(id);
      res.json(todo);
    }catch(){
      res.status(404).json({error: `Todo with id ${id} not found`});
    }
  };

  public createTodo = async (req: Request, res: Response) => {
    const [error, createTodoDto] = CreateTodoDto.create(req.body);
    if (error) return res.status(400).json({ error });

    const todo = await prisma.todo.create({
      data: createTodoDto!,
    });

    res.json({ msg: "Created Successfully", todo });
  };

  public updateTodo = async (req: Request, res: Response) => {
    const id = +req.params.id;
    const [error, updateTodoDto] = UpdateTodoDto.create({ id, ...req.body });

    if (error) return res.status(400).json({ error });

    const todo = await prisma.todo.findUnique({
      where: {
        id,
      },
    });
    if (!todo)
      return res.status(404).json({ error: `Todo with id ${id} not found` });

    const updatedTodo = await prisma.todo.update({
      where: { id },
      data: updateTodoDto!.values,
    });

    res.json(updatedTodo);
  };

  public deleteTodo = async (req: Request, res: Response) => {
    const id = +req.params.id;

    const todoDelted = await prisma.todo.delete({
      where: {
        id,
      },
    });
    if (!todoDelted)
      return res.status(404).json({ error: `Todo with id ${id} not found` });

    res.json(todoDelted);
  };
}
