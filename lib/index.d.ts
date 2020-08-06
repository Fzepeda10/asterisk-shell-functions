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
 * @param {string} SSH Conexion SSH
 * @returns 1 (true) ||  0 (false).
 */
export declare function getQueueState(QUEUE: string, SSH: string): Promise<any>;
/**
 * Valida el agente esta conectado a alguna Queue.
 * @param {string} AGENT Nombre del agente a buscar.
 * @param {string} SSH Conexion SSH.
 * @returns 1 (true) ||  0 (false).
 */
export declare function getAgentQueueState(AGENT: string, SSH: string): Promise<any>;
/**
 * Se obtiene el nombre del agente apartir del número de extensión.
 * @param {string} EXT Extension.
 * @param {string} TYPE Tecnologia (SIP,IAX2,etc.).
 * @param {string} SSH Conexion SSH.
 * @returns {Promise<string>} Nombre del agente.
 */
export declare function getAgentName(EXT: string, TYPE: string, SSH: string): Promise<any>;
/**
 * Valida si la extension esta conectada a alguna queue.
 * @param {string} EXT Extension.
 * @param {string} TYPE Tecnologia (SIP,IAX2,etc.).
 * @param {string} SSH Conexion SSH.
 * @returns 1 (true) ||  0 (false).
 */
export declare function getExtenQueueState(EXT: string, TYPE: string, SSH: string): Promise<any>;
/**
 * Valida si la extensión esta en pausa.
 * @param {string} EXT Extension.
 * @param {string} TYPE Tecnologia (SIP,IAX2,etc.).
 * @param {string} SSH Conexion SSH.
 * @returns 1 (true) ||  0 (false).
 */
export declare function getExtenPauseState(EXT: string, TYPE: string, SSH: string): Promise<any>;
/**
 * Se obtiene la extensión a partir del agente.
 * @param {string} AGENT Nombre del agente a buscar.
 * @param {string} SSH Conexion SSH.
 * @returns {Promise<string>} Numero de extension.
 */
export declare function getExtenAgent(AGENT: string, SSH: string): Promise<string>;
/**
 * Genera el archivo de llamada de Asterisk.
 * @param {CallFile} CF Del tipo CallFile.
 * @param {string} SSH Conexion SSH.
 */
export declare function callFileCreate(CF: CallFile, SSH: string): void;
/**
 * Se obtiene el canal de la llamada actual.
 * @param {string} AGENT Nombre del agente a buscar.
 * @param {string} SSH Conexion SSH.
 * @returns {Promise<string>} Canal.
 */
export declare function getThisCall(EXT: string, NUM: string, SSH: string): Promise<string>;
//# sourceMappingURL=index.d.ts.map