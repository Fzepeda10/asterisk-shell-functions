/**
 * @author Fernando Enrique Zepeda Castellanos.
 * @author Juan Manuel Salazar Castro.
 */

import { promisify } from 'util';
import { createWriteStream } from 'fs';
const exec = promisify(require('child_process').exec);

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
export type CallFile = {
	num: string,
	cid: string,
	retries: string,
	rec_mode: string,
	audio: string,
	prefix: string
}
/**
 * Se comprueba si extiste la Queue.
 * @param {string} QUEUE Cola de llamada.
 * @param {boolean} TEST Modo test.
 * @param {any} VAL Valor de retorno (Test).
 * @returns 1 (true) ||  0 (false).
 */
export async function getQueueState(QUEUE: string, TEST: boolean, VAL: any) {
	if (TEST) {
		return VAL;
	} else {
		const { stdout } = await exec(`/usr/sbin/asterisk -rx'queue show' | egrep \"^${QUEUE} has\" -q && echo -n 1 || echo -n 0`);
		return stdout;
	}
}
/**
 * Valida el agente esta conectado a alguna Queue.
 * @param {string} AGENT Nombre del agente a buscar.
 * @param {boolean} TEST Modo test.
 * @param {any} VAL Valor de retorno (Test).
 * @returns 1 (true) ||  0 (false).
 */
export async function getAgentQueueState(AGENT: string, TEST: boolean, VAL: any) {
	if (TEST) {
		return VAL;
	} else {
		const { stdout } = await exec(`/usr/sbin/asterisk -rx 'queue show' | grep -w "${AGENT}" | grep -w dynamic -q && echo -n 1 || echo -n 0`);
		return stdout;
	}
}
/**
 * Se obtiene el nombre del agente apartir del número de extensión.
 * @param {string} EXT Extension.
 * @param {string} TYPE Tecnologia (SIP,IAX2,etc.).
 * @param {boolean} TEST Modo test.
 * @param {any} VAL Valor de retorno (Test).
 * @returns {string} Nombre del Agente
 */
export async function getAgentName(EXT: string, TYPE: string, TEST: boolean, VAL: any) {
if (TEST) {
	return VAL;
} else {
	const { stdout } = await exec(`/usr/sbin/asterisk -rx 'queue show' | grep dynamic | egrep "${TYPE}/${EXT}" | head -n1 | awk '{print $1}' | tr -d "\n"`);
	return stdout;
}
}
/**
 * Valida si la extension esta conectada la extensión a alguna queue.
 * @param {string} EXT Extension.
 * @param {string} TYPE Tecnologia (SIP,IAX2,etc.).
 * @param {boolean} TEST Modo test.
 * @param {any} VAL Valor de retorno (Test).
 * @returns 1 (true) ||  0 (false).
 */
export async function getExtenQueueState(EXT: string, TYPE: string, TEST: boolean, VAL: any) {
if (TEST) {
	return VAL;
} else {
	const { stdout } = await exec(`/usr/sbin/asterisk -rx 'queue show' | grep -w "${TYPE}/${EXT}" | grep -w dynamic -q && echo -n 1 || echo -n 0`);
	return stdout;
}
}
/**
 * Valida si la extensión esta en pausa.
 * @param {string} EXT Extension.
 * @param {string} TYPE Tecnologia (SIP,IAX2,etc.).
 * @param {boolean} TEST Modo test.
 * @param {any} VAL Valor de retorno (Test).
 * @returns 1 (true) ||  0 (false).
 */
export async function getExtenPauseState(EXT: string, TYPE: string, TEST: boolean, VAL: any) {
if (TEST) {
	return VAL;
} else {
	const { stdout } = await exec(`/usr/sbin/asterisk -rx 'queue show' | grep -w "${TYPE}/${EXT}" | grep -w "paused" | grep -w dynamic -q && echo -n 1 || echo -n 0`);
	return stdout;
}
}
/**
 * Se obtiene la extensión a partir del agente.
 * @param {string} AGENT Nombre del agente a buscar.
 * @param {boolean} TEST Modo test.
 * @param {any} VAL Valor de retorno (Test).
 * @returns 1 (true) ||  0 (false).
 */
export async function getExtenAgent(AGENT: string, TEST: boolean, VAL: any) {
if (TEST) {
	return VAL;
} else {
	const { stdout } = await exec(`/usr/sbin/asterisk -rx 'queue show' | egrep '${AGENT} \\\(' | grep 'dynamic' | head -n1 | grep -o '[0-9].*' | awk '{print $1}' | head -n1 | sed -e 's/)//g' | tr -d "\n"`);
	return stdout;
}
}
/**
 * Genera el archivo de llamada de Asterisk.
 * @param {CallFile} CF Del tipo CallFile.
 * @param {boolean} TEST Modo test.
 * @param {any} VAL Valor de retorno (Test).
 */
export function callFileCreate(CF: CallFile, TEST: boolean, VAL: any) {
	let call = createWriteStream(`/var/spool/asterisk/outgoing/${CF.num}.call`);
	call.once('open', function (fd) {
		call.write(`Channel: Local/${CF.prefix}${CF.num}@from-internal\n`);
		call.write(`CallerID: ${CF.cid}\n`);
		call.write(`MaxRetries: ${CF.retries}\n`);
		call.write("RetryTime: 30\n");
		call.write("WaitTime: 40\n");
		call.write("Context: seguritech-blacklist-callback\n");
		call.write("Extension: s\n");
		call.write("Priority: 1\n");
		call.write(`Setvar: AUDIO_FILE=${CF.audio}\n`);
		call.write(`Setvar: REC_POLICY_MODE=${CF.rec_mode}\n`);
		call.write("Account: BL-CallBack\n");
		call.end();
	});
}