import { CreateDTOUsuarios, UpdateDTOUsuarios } from "../dtos";
import { TodoEntity } from "../enditades/todo.entity";


export abstract class TodoRepositorio {
    abstract createTodo(TodoDto: CreateDTOUsuarios): Promise<TodoEntity>
    abstract getTodo(): Promise<TodoEntity[]>
    abstract getTodoId(id: number): Promise<TodoEntity>
    abstract UpdateTodo(TodoDto: UpdateDTOUsuarios): Promise<TodoEntity>
    abstract DeleteTodo(id: number): Promise<TodoEntity>
}