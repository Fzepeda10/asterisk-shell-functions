/**
 * @author Fernando Enrique Zepeda Castellanos.
 * @author Juan Manuel Salazar Castro.
 */
/**
 * @exports
 * @type {CallFile}
 * @param {string} num Numero de telefono.
 * @param {string} cid Caller ID.
 * @param {string} retries Numero de intentos.
 * @param {string} rec_mode Modo de grabacion.
 * @param {string} audio Audio.
 * @param {string} prefix Prefijo.
 */
export declare type CallFile = {
    num: string;
    cid: string;
    retries: string;
    rec_mode: string;
    audio: string;
    prefix: string;
};
/**
 * Se comprueba si extiste la Queue.
 * @param {string} QUEUE Cola de llamada.
 * @param {boolean} TEST Modo test.
 * @param {any} VAL Valor de retorno (Test).
 * @returns 1 (true) ||  0 (false).
 */
export declare function getQueueState(QUEUE: string, TEST: boolean, VAL: any): Promise<any>;
/**
 * Valida el agente esta conectado a alguna Queue.
 * @param {string} AGENT Nombre del agente a buscar.
 * @param {boolean} TEST Modo test.
 * @param {any} VAL Valor de retorno (Test).
 * @returns 1 (true) ||  0 (false).
 */
export declare function getAgentQueueState(AGENT: string, TEST: boolean, VAL: any): Promise<any>;
/**
 * Se obtiene el nombre del agente apartir del número de extensión.
 * @param {string} EXT Extension.
 * @param {string} TYPE Tecnologia (SIP,IAX2,etc.).
 * @param {boolean} TEST Modo test.
 * @param {any} VAL Valor de retorno (Test).
 * @returns {string} Nombre del Agente
 */
export declare function getAgentName(EXT: string, TYPE: string, TEST: boolean, VAL: any): Promise<any>;
/**
 * Valida si la extension esta conectada la extensión a alguna queue.
 * @param {string} EXT Extension.
 * @param {string} TYPE Tecnologia (SIP,IAX2,etc.).
 * @param {boolean} TEST Modo test.
 * @param {any} VAL Valor de retorno (Test).
 * @returns 1 (true) ||  0 (false).
 */
export declare function getExtenQueueState(EXT: string, TYPE: string, TEST: boolean, VAL: any): Promise<any>;
/**
 * Valida si la extensión esta en pausa.
 * @param {string} EXT Extension.
 * @param {string} TYPE Tecnologia (SIP,IAX2,etc.).
 * @param {boolean} TEST Modo test.
 * @param {any} VAL Valor de retorno (Test).
 * @returns 1 (true) ||  0 (false).
 */
export declare function getExtenPauseState(EXT: string, TYPE: string, TEST: boolean, VAL: any): Promise<any>;
/**
 * Se obtiene la extensión a partir del agente.
 * @param {string} AGENT Nombre del agente a buscar.
 * @param {boolean} TEST Modo test.
 * @param {any} VAL Valor de retorno (Test).
 * @returns 1 (true) ||  0 (false).
 */
export declare function getExtenAgent(AGENT: string, TEST: boolean, VAL: any): Promise<any>;
/**
 * Genera el archivo de llamada de Asterisk.
 * @param {CallFile} CF Del tipo CallFile.
 * @param {boolean} TEST Modo test.
 * @param {any} VAL Valor de retorno (Test).
 */
export declare function callFileCreate(CF: CallFile, TEST: boolean, VAL: any): void;
//# sourceMappingURL=index.d.ts.map