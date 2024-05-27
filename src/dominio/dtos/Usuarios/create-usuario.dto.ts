

export class CreateDTOUsuarios {

    private constructor(
        public readonly nombre: string,
        public readonly apellido: string,
        public readonly edad: number
    ) { }

    static create(props: { [key: string]: any }): [string?, CreateDTOUsuarios?] {

        const { nombre, apellido, edad } = props

        if(!nombre) return ["El nombre es requerido", undefined]
        if(!apellido) return ["El apellido es requerido", undefined]
        if(!edad) return ["la edad es requerida", undefined]

        return[undefined, new CreateDTOUsuarios(nombre,apellido,edad)]
    }
}