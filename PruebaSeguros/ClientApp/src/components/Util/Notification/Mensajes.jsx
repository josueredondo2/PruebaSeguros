import swal from 'sweetalert2';

/**
 * Clase util de Mensajes
 * @author Eleazar Martinez
 * */
export default class Mensajes {

    /**
     * Funcion para crear un mensaje de advertencia
     * @param {any} texto
     * @author Eleazar Martinez
     */
    static advertencia(texto) {
        swal.fire({ title: 'Advertencia', text: texto, icon: 'warning' });
    }

    /**
     * Funcion para crear un mensaje de error
     * @param {any} texto
     * @author Eleazar Martinez
     */
    static error(texto) {
        swal.fire({ title: 'Error', text: texto, icon: 'error' });
    }

    /**
     * Funcion para crear un mensaje de exito
     * @param {any} texto
     * @author Eleazar Martinez
     */
    static exitoso(texto) {
        swal.fire({ title: 'Exitoso', text: texto, icon: 'success' });
    }

    /**
     * Funcion para crear un mensaje confirmativo
     * @param {any} texto
     * @author Eleazar Martinez
     */
    static informativo(texto) {
        swal.fire({ title: 'Informativo', text: texto, icon: 'info' });
    }

    /**
     * Funcion para crear un mensaje de confirmacion
     * @param {any} titulo
     * @param {any} texto
     * @param {any} textoBotonConfirmacion
     * @author Eleazar Martinez
     */
    static async confirmacion(titulo, texto, textoBotonConfirmacion)
    {
        const result = await swal.fire({
            title: titulo,
            text: texto,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: textoBotonConfirmacion
        });
        return result.value;
    }
}