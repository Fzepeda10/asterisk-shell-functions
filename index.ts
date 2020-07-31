/**
 * @author Fernando Enrique Zepeda Castellanos.
 * @author Juan Manuel Salazar Castro.
 */

import { promisify } from 'util';
import {createWriteStream, promises} from 'fs';
const exec = promisify(require('child_process').exec);

/**
 * Se comprueba si extiste la Queue.
 * @param {string} QUEUE Cola de llamada.
 * @returns 1 (true) ||  0 (false).
 */
export async function getQueueState(QUEUE:string) {
	const { stdout } = await exec(`/usr/sbin/asterisk -rx'queue show' | egrep \"^${QUEUE} has\" -q && echo -n 1 || echo -n 0`);
	return stdout;
}
/**
 * Valida el agente esta conectado a alguna Queue.
 * @param {string} AGENT Nombre del agente a buscar.
 * @returns 1 (true) ||  0 (false).
 */
export async function getAgentQueueState(AGENT:string) {
	const { stdout } = await exec(`/usr/sbin/asterisk -rx 'queue show' | grep -w "${AGENT}" | grep -w dynamic -q && echo -n 1 || echo -n 0`);
	return stdout;
}
/**
 * Se obtiene el nombre del agente apartir del número de extensión.
 * @param {string} EXT Extension.
 * @param {string} TYPE Tecnologia (SIP,IAX2,etc.).
 * @returns {string} Nombre del Agente
 */
export async function getAgentName(EXT:string, TYPE:string): Promise<string>{
	const { stdout } = await exec(`/usr/sbin/asterisk -rx 'queue show' | grep dynamic | egrep "${TYPE}/${EXT}" | head -n1 | awk '{print $1}' | tr -d "\n"`);
	return stdout;
}
/**
 * Valida si la extension esta conectada la extensión a alguna queue.
 * @param {string} EXT Extension.
 * @param {string} TYPE Tecnologia (SIP,IAX2,etc.).
 * @returns 1 (true) ||  0 (false).
 */
export async function getExtenQueueState(EXT:string, TYPE:string) {
	const { stdout } = await exec(`/usr/sbin/asterisk -rx 'queue show' | grep -w "${TYPE}/${EXT}" | grep -w dynamic -q && echo -n 1 || echo -n 0`);
	return stdout;
}
/**
 * Valida si la extensión esta en pausa.
 * @param {string} EXT Extension.
 * @param {string} TYPE Tecnologia (SIP,IAX2,etc.).
 * @returns 1 (true) ||  0 (false).
 */
export async function getExtenPauseState(EXT:string, TYPE:string) {
	const { stdout } = await exec(`/usr/sbin/asterisk -rx 'queue show' | grep -w "${TYPE}/${EXT}" | grep -w "paused" | grep -w dynamic -q && echo -n 1 || echo -n 0`);
	return stdout;
}
/**
 * Se obtiene la extensión a partir del agente.
 * @param {string} AGENT Nombre del agente a buscar.
 * @returns 1 (true) ||  0 (false).
 */
export async function getExtenAgent(AGENT:string) {
	const { stdout } = await exec(`/usr/sbin/asterisk -rx 'queue show' | egrep '${AGENT} \\\(' | grep 'dynamic' | head -n1 | grep -o '[0-9].*' | awk '{print $1}' | head -n1 | sed -e 's/)//g' | tr -d "\n"`);
	return stdout;
}
/**
 * Genera el archivo de llamada de Asterisk.
 * @param {string} NUM Numero de telefono al cual realizar la llamada.
 * @param {string} CID Caller ID.
 * @param {string} RETRIES Numero de reintentos.
 * @param {string} REC_MODE Modo de grabacion.
 * @param {string} AUDIO Nombre del audio.
 * @param {string} PREFIX Prefijo de Marcación.
 */
export function callFileCreate(NUM:string, CID:string, RETRIES:string, REC_MODE:string, AUDIO:string, PREFIX:string) {
	let call = createWriteStream(`/var/spool/asterisk/outgoing/${NUM}.call`);
	call.once('open', function (fd) {
		call.write(`Channel: Local/${PREFIX}${NUM}@from-internal\n`);
		call.write(`CallerID: ${CID}\n`);
		call.write(`MaxRetries: ${RETRIES}\n`);
		call.write("RetryTime: 30\n");
		call.write("WaitTime: 40\n");
		call.write("Context: seguritech-blacklist-callback\n");
		call.write("Extension: s\n");
		call.write("Priority: 1\n");
		call.write(`Setvar: AUDIO_FILE=${AUDIO}\n`);
		call.write(`Setvar: REC_POLICY_MODE=${REC_MODE}\n`);
		call.write("Account: BL-CallBack\n");
		call.end();
	});
}