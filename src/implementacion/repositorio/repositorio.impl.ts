import { CreateDTOUsuarios, TodoDataSource, TodoEntity, TodoRepositorio, UpdateDTOUsuarios } from "../../dominio";


export class RepositorioImpl implements TodoRepositorio {

    constructor(
        private readonly datasoruce: TodoDataSource
    ) { }

    createTodo(TodoDto: CreateDTOUsuarios): Promise<TodoEntity> {
        return this.datasoruce.createTodo(TodoDto)
    }
    getTodo(): Promise<TodoEntity[]> {
        return this.getTodo()
    }
    getTodoId(id: number): Promise<TodoEntity> {
        return this.datasoruce.getTodoId(id)
    }
    UpdateTodo(TodoDto: UpdateDTOUsuarios): Promise<TodoEntity> {
        return this.datasoruce.UpdateTodo(TodoDto)
    }
    DeleteTodo(id: number): Promise<TodoEntity> {
        return this.datasoruce.DeleteTodo(id)
    }

}