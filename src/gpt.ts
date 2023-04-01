
import { CreateChatCompletionRequest, CreateCompletionRequest } from 'openai';

import { Config } from './config/types';
import { minify } from './utils/minify';

export const GPT_DEBUG_COMMENT = (kind:string, id: string) => 
    `/**\n * DEBUG: Autogenerated placeholder for ${kind} "${id}" \n */`

/**
 * @param kind The kind of the component (class, method, function, const) 
 * @param source  The definition source code of the function as a string
 * @param [config] other options such as doc framework and language 
 * @returns 
 */
export const GPT_PROMPT = (config: Config, kind:string, source:string) => {  
    return `/* `+
    `Generate a ${config.framework} Doclet comment for the ${config.language} ${kind} below. `+
    `Descriptions must be accurate & clear. `+
    `Do not forget to add an @autogenerated tag at the begining of the comment. `+
    `${config.prompt} `+
    `*/${config.minify ? minify(source) : source}`;
}

/**
 * @param kind {string} The kind of the component (class, method, function, const) 
 * @param source {string} The definition source code of the function as a string
 * @returns The configuration for OpenAIApi
 */
export const GPT_COMPLETION_CONFIG = (config:Config, prompt:string): CreateCompletionRequest => ({
    model: config.openai.model || 'text-davinci-003',
    temperature: config.openai.temperature || 0.665,
    max_tokens: config.openai.max_tokens || 512,
    top_p: config.openai.top_p || 1,
    stop: ["*/"],
    prompt
});

/**
 * @param kind {string} The kind of the component (class, method, function, const) 
 * @param source {string} The definition source code of the function as a string
 * @returns The configuration for OpenAIApi
 */
export const GPT_CHAT_COMPLETION_CONFIG = (config:Config, prompt:string): CreateChatCompletionRequest => ({
    model: config.openai.model || 'gpt-3.5-turbo',
    temperature: config.openai.temperature || 0.665,
    max_tokens: config.openai.max_tokens || 512,
    top_p: config.openai.top_p || 1,
    stop: ["*/"],
    messages: [{
        role: 'user',
        content: prompt
    }]
});

/**
 * Create & Send a request to an OpenAI model
 * 
 * @param _config The project's configuration 
 * @param prompt The prompt to send to the OpenAI model 
 * @returns 
 */
export async function OpenAICompletion(_config: Config, prompt: string) {
    const apiKey: string = _config.apiKey || '';

    let config = {..._config};
    delete config.apiKey;

    const completionRequest: CreateCompletionRequest|CreateChatCompletionRequest = 
        _config.chat ? 
        GPT_CHAT_COMPLETION_CONFIG(config, prompt):
        GPT_COMPLETION_CONFIG(config, prompt);

    
    
    const res = await fetch(
        `https://api.openai.com/v1/${_config.chat ? 'chat/completions' : 'completions'}`, {
        headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(completionRequest)
    });

    return await res.json();
}

export interface PriceRange {
    prompt: number;
    response: number
}

interface ModelMeta {
    price: number | PriceRange;
    isChatModel: boolean;
}

/**
 * Lookup table for pricing
 */
export const Models: { [key:string]: ModelMeta } = {
    'text-ada-001': {
        price: 0.0004,
        isChatModel: false
    },
    'text-babbage-001': {
        price: 0.0005,
        isChatModel: false
    },
    'text-curie-001': {
        price: 0.002,
        isChatModel: false
    },
    'text-davinci-002': {
        price: 0.02,
        isChatModel: false
    },
    'text-davinci-003': {
        price: 0.02,
        isChatModel: false
    },
    'gpt-3.5-turbo': {
        price: 0.002,
        isChatModel: true
    },
    'gpt-4': {
        price: {
            prompt: 0.03,
            response: 0.06
        },
        isChatModel: true
    },
    'gpt-4-0314': {
        price: {
            prompt: 0.03,
            response: 0.06
        },
        isChatModel: true
    },
    'gpt-4-32k': {
        price: {
            prompt: 0.06,
            response: 0.12
        },
        isChatModel: true
    },
    'gpt-4-32k-0314': {
        price: {
            prompt: 0.06,
            response: 0.12
        },
        isChatModel: true
    }
}


if (Number(process.version.split('.')[0]) < 18) {
    // global.fetch = function fetch() {

    // } 
}

