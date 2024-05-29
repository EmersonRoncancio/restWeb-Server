import { prisma } from "../../data/postgres";
import { CreateDTOUsuarios, TodoDataSource, TodoEntity, UpdateDTOUsuarios } from "../../dominio";


export class TodoPostgres implements TodoDataSource {
    async createTodo(TodoDto: CreateDTOUsuarios): Promise<TodoEntity> {

        const todo = await prisma.usuarios.create({
            data: TodoDto
        })

        return todo
    }

    async getTodo(): Promise<TodoEntity[]> {
        const todo = await prisma.usuarios.findMany()

        return todo
    }

    async getTodoId(id: number): Promise<TodoEntity> {
        const todo = await prisma.usuarios.findFirst({
            where: {
                id: id
            }
        })

        if(!todo) throw `El id ${id} no existe`
        return todo
    }

    async UpdateTodo(TodoDto: UpdateDTOUsuarios): Promise<TodoEntity> {

        await this.getTodoId(TodoDto.id)

        const todo = await prisma.usuarios.update({
            where: {
                id: TodoDto.id
            },
            data: TodoDto!.values
        })

        return todo
    }

    async DeleteTodo(id: number): Promise<TodoEntity> {

        await this.getTodoId(id)
        
        const todo = await prisma.usuarios.delete({
            where: {
                id: id
            }
        })

        return todo
    }

}