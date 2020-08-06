"use strict";
/**
 * @author Fernando Enrique Zepeda Castellanos.
 * @author Juan Manuel Salazar Castro.
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getThisCall = exports.callFileCreate = exports.getExtenAgent = exports.getExtenPauseState = exports.getExtenQueueState = exports.getAgentName = exports.getAgentQueueState = exports.getQueueState = void 0;
var util_1 = require("util");
var fs_1 = require("fs");
var exec = util_1.promisify(require('child_process').exec);
/**
 * Se comprueba si extiste la Queue.
 * @param {string} QUEUE Cola de llamada.
 * @param {string} SSH Conexion SSH
 * @returns 1 (true) ||  0 (false).
 */
function getQueueState(QUEUE, SSH) {
    return __awaiter(this, void 0, void 0, function () {
        var stdout;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, exec(SSH + " \"/usr/sbin/asterisk -rx'queue show' | egrep '^" + QUEUE + " has' -q && echo -n 1 || echo -n 0 | tr -d '\\n'\"")];
                case 1:
                    stdout = (_a.sent()).stdout;
                    return [2 /*return*/, stdout];
            }
        });
    });
}
exports.getQueueState = getQueueState;
/**
 * Valida el agente esta conectado a alguna Queue.
 * @param {string} AGENT Nombre del agente a buscar.
 * @param {string} SSH Conexion SSH.
 * @returns 1 (true) ||  0 (false).
 */
function getAgentQueueState(AGENT, SSH) {
    return __awaiter(this, void 0, void 0, function () {
        var stdout;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, exec(SSH + " \"/usr/sbin/asterisk -rx 'queue show' | grep -w '" + AGENT + "' | grep -w dynamic -q && echo -n 1 || echo -n 0 | tr -d '\\n'")];
                case 1:
                    stdout = (_a.sent()).stdout;
                    return [2 /*return*/, stdout];
            }
        });
    });
}
exports.getAgentQueueState = getAgentQueueState;
/**
 * Se obtiene el nombre del agente apartir del número de extensión.
 * @param {string} EXT Extension.
 * @param {string} TYPE Tecnologia (SIP,IAX2,etc.).
 * @param {string} SSH Conexion SSH.
 * @returns {Promise<string>} Nombre del agente.
 */
function getAgentName(EXT, TYPE, SSH) {
    return __awaiter(this, void 0, void 0, function () {
        var stdout;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, exec(SSH + " \"/usr/sbin/asterisk -rx 'queue show' | grep dynamic | egrep '" + TYPE + "/" + EXT + "' | head -n1 | awk '{print $1}' | tr -d '\\n'\"")];
                case 1:
                    stdout = (_a.sent()).stdout;
                    return [2 /*return*/, stdout];
            }
        });
    });
}
exports.getAgentName = getAgentName;
/**
 * Valida si la extension esta conectada a alguna queue.
 * @param {string} EXT Extension.
 * @param {string} TYPE Tecnologia (SIP,IAX2,etc.).
 * @param {string} SSH Conexion SSH.
 * @returns 1 (true) ||  0 (false).
 */
function getExtenQueueState(EXT, TYPE, SSH) {
    return __awaiter(this, void 0, void 0, function () {
        var stdout;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, exec(SSH + " \"/usr/sbin/asterisk -rx 'queue show' | grep -w '" + TYPE + "/" + EXT + "' | grep -w dynamic -q && echo -n 1 || echo -n 0 | tr -d '\\n'\"")];
                case 1:
                    stdout = (_a.sent()).stdout;
                    return [2 /*return*/, stdout];
            }
        });
    });
}
exports.getExtenQueueState = getExtenQueueState;
/**
 * Valida si la extensión esta en pausa.
 * @param {string} EXT Extension.
 * @param {string} TYPE Tecnologia (SIP,IAX2,etc.).
 * @param {string} SSH Conexion SSH.
 * @returns 1 (true) ||  0 (false).
 */
function getExtenPauseState(EXT, TYPE, SSH) {
    return __awaiter(this, void 0, void 0, function () {
        var stdout;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, exec(SSH + " \"/usr/sbin/asterisk -rx 'queue show' | grep -w '" + TYPE + "/" + EXT + "' | grep -w 'paused' | grep -w dynamic -q && echo -n 1 || echo -n 0 | tr -d '\\n'\"")];
                case 1:
                    stdout = (_a.sent()).stdout;
                    return [2 /*return*/, stdout];
            }
        });
    });
}
exports.getExtenPauseState = getExtenPauseState;
/**
 * Se obtiene la extensión a partir del agente.
 * @param {string} AGENT Nombre del agente a buscar.
 * @param {string} SSH Conexion SSH.
 * @returns {Promise<string>} Numero de extension.
 */
function getExtenAgent(AGENT, SSH) {
    return __awaiter(this, void 0, void 0, function () {
        var stdout;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, exec(SSH + " \"/usr/sbin/asterisk -rx 'queue show' | egrep '" + AGENT + " \\(' | grep 'dynamic' | head -n1 | grep -o '[0-9].*' | awk '{print $1}' | head -n1 | sed -e 's/)//g' | tr -d '\\n'\"")];
                case 1:
                    stdout = (_a.sent()).stdout;
                    return [2 /*return*/, stdout];
            }
        });
    });
}
exports.getExtenAgent = getExtenAgent;
/**
 * Genera el archivo de llamada de Asterisk.
 * @param {CallFile} CF Del tipo CallFile.
 * @param {string} SSH Conexion SSH.
 */
function callFileCreate(CF, SSH) {
    var call = fs_1.createWriteStream(SSH + " \"/var/spool/asterisk/outgoing/" + CF.num + ".call\"");
    call.once('open', function (fd) {
        call.write("Channel: Local/" + CF.prefix + CF.num + "@from-internal\n");
        call.write("CallerID: " + CF.cid + "\n");
        call.write("MaxRetries: " + CF.retries + "\n");
        call.write('RetryTime: 30\n');
        call.write('WaitTime: 40\n');
        call.write('Context: seguritech-blacklist-callback\n');
        call.write('Extension: s\n');
        call.write('Priority: 1\n');
        call.write("Setvar: AUDIO_FILE=" + CF.audio + "\n");
        call.write("Setvar: REC_POLICY_MODE=" + CF.rec_mode + "\n");
        call.write('Account: BL-CallBack\n');
        call.end();
    });
}
exports.callFileCreate = callFileCreate;
/**
 * Se obtiene el canal de la llamada actual.
 * @param {string} AGENT Nombre del agente a buscar.
 * @param {string} SSH Conexion SSH.
 * @returns {Promise<string>} Canal.
 */
function getThisCall(EXT, NUM, SSH) {
    return __awaiter(this, void 0, void 0, function () {
        var stdout, values;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, exec(SSH + " \"/usr/sbin/asterisk -rx'core show channels concise' | grep " + EXT + " | grep " + NUM + " | grep -w Dial | tr -d '\\n'\"")];
                case 1:
                    stdout = (_a.sent()).stdout;
                    values = stdout.split('!');
                    return [2 /*return*/, values[0]];
            }
        });
    });
}
exports.getThisCall = getThisCall;
//# sourceMappingURL=index.js.map