

export class UpdateDTOUsuarios {

    private constructor(
        public readonly id: number,
        public readonly nombre?: string,
        public readonly apellido?: string,
        public readonly edad?: number | string
    ) { }

    get values() {
        const returnObj: { [key: string]: any } = {}

        if (this.nombre) returnObj.nombre = this.nombre
        if (this.apellido) returnObj.apellido = this.apellido
        if (this.edad) returnObj.edad = typeof(this.edad) === "string"? parseInt(this.edad): this.edad

        return returnObj
    }

    static create(props: { [key: string]: any }): [string?, UpdateDTOUsuarios?] {

        const { id, nombre, apellido, edad } = props

        if (!id || isNaN(parseInt(id))) return ["Id no es valido"]

        return [undefined, new UpdateDTOUsuarios(id, nombre, apellido, edad)]
    }
}