import { Configuration, OpenAIApi } from 'openai';
import { Config } from './config';

import parseEnv from './dotenv'


export function initOpenAI() {
    return new OpenAIApi(new Configuration({
        apiKey: 
            process.env.OPENAI_API_KEY ||
            parseEnv('.env').OPENAI_API_KEY 
            
    }));;
}


/**
 * ES6 arrow functions will cause problms
 * this comment was manually generated
 */
export const GPT_DEBUG_COMMENT = (kind:string, id: string) => 
    `/**\n * DEBUG: Autogenerated placeholder for ${kind} "${id}" \n */`

/**
 * ES6 arrow functions will cause problms
 * this comment was manually generated
 */
/**
 * @param kind {string} The kind of the component (class, method, function, const) 
 * @param source {string} The definition source code of the function as a string
 * @param [config] {any} other options such as doc framework and language 
 * @returns 
 */
export const GPT_PROMPT = (config: Config, kind:string, source:string) =>     
    `/*\n\
    Generate a ${config.framework} Doclet comment for the ${config.language} ${kind} below,\
    Do not forget to add an @autogenerated tag at the begining of the comment.\
    Use either @desc or @summary as you see fit. \
    Descriptions must be accurate & clear. \
    Make space in the comment, it should be easy to read.\
    \n*/\n${source}`;


/**
 * ES6 arrow functions will cause problms
 * this comment was manually generated
 */
/**
 * @param kind {string} The kind of the component (class, method, function, const) 
 * @param source {string} The definition source code of the function as a string
 * @returns The configuration for OpenAIApi
 */
export const GPT_COMPLETION_CONFIG = (config:Config, kind:string, source: string) => ({
    model: config.openai.model || 'text-ada-001',
    temperature: config.openai.temperature || 0.665,
    max_tokens: config.openai.max_tokens || 512,
    top_p: config.openai.top_p || 1,
    stop: ["*/"],
    prompt: GPT_PROMPT(config, kind, source) 
});

