
interface Usuarios {
    id: number
    nombre: string
    apellido: string
    edad: number
}

export class TodoEntity {

    constructor(
        public readonly id: number,
        public readonly nombre: string,
        public readonly apellido: string,
        public readonly edad: number
    ) {}


}