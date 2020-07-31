/**
 * @author Fernando Enrique Zepeda Castellanos.
 * @author Juan Manuel Salazar Castro.
 */
/**
 * Se comprueba si extiste la Queue.
 * @param {string} QUEUE Cola de llamada.
 * @returns 1 (true) ||  0 (false).
 */
export declare function getQueueState(QUEUE: string): Promise<any>;
/**
 * Valida el agente esta conectado a alguna Queue.
 * @param {string} AGENT Nombre del agente a buscar.
 * @returns 1 (true) ||  0 (false).
 */
export declare function getAgentQueueState(AGENT: string): Promise<any>;
/**
 * Se obtiene el nombre del agente apartir del número de extensión.
 * @param {string} EXT Extension.
 * @param {string} TYPE Tecnologia (SIP,IAX2,etc.).
 * @returns {string} Nombre del Agente
 */
export declare function getAgentName(EXT: string, TYPE: string): Promise<string>;
/**
 * Valida si la extension esta conectada la extensión a alguna queue.
 * @param {string} EXT Extension.
 * @param {string} TYPE Tecnologia (SIP,IAX2,etc.).
 * @returns 1 (true) ||  0 (false).
 */
export declare function getExtenQueueState(EXT: string, TYPE: string): Promise<any>;
/**
 * Valida si la extensión esta en pausa.
 * @param {string} EXT Extension.
 * @param {string} TYPE Tecnologia (SIP,IAX2,etc.).
 * @returns 1 (true) ||  0 (false).
 */
export declare function getExtenPauseState(EXT: string, TYPE: string): Promise<any>;
/**
 * Se obtiene la extensión a partir del agente.
 * @param {string} AGENT Nombre del agente a buscar.
 * @returns 1 (true) ||  0 (false).
 */
export declare function getExtenAgent(AGENT: string): Promise<any>;
/**
 * Genera el archivo de llamada de Asterisk.
 * @param {string} NUM Numero de telefono al cual realizar la llamada.
 * @param {string} CID Caller ID.
 * @param {string} RETRIES Numero de reintentos.
 * @param {string} REC_MODE Modo de grabacion.
 * @param {string} AUDIO Nombre del audio.
 * @param {string} PREFIX Prefijo de Marcación.
 */
export declare function callFileCreate(NUM: string, CID: string, RETRIES: string, REC_MODE: string, AUDIO: string, PREFIX: string): void;
//# sourceMappingURL=index.d.ts.map