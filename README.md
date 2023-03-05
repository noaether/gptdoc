# gptdoc

Generate JSDOC comments with the help of OpenAI's models

> Keep a Human in the loop, results might not be accurate

<br/>

## Preview

Functions labeled with `/** @gpt */` get an autogenerated doc comment

<table align="center">
<tr>
<td align="center"> Before </td> <td align="center"> After </td>
</tr>
<tr>
<td>

```ts
/** @gpt */
function Greet(name) {
    console.log(`Hello ${name}`);
}
```

</td>
<td>

```ts
/**
 * @autogenerated
 * @summary Generates a greeting to the passed in name
 * @param {string} name - The name to greet
 */
function Greet(name) {
    console.log(`Hello ${name}`);
}
```

</td>
</tr>
</table>
<br/>

## Install in project

Install `gptdoc` as a dev dependency

```sh
npm i --save-dev gptdoc 
```

Execute 

```sh
node node_modules/gptdoc [args]
```



<br/>

## Config

You can specify a configuration file:

```sh
node node_modules/gptdoc -c .myconfig
```

If none provided, the script will look for `.gptdoc`

### Sample Config file

```json
{
    "DEBUG": false,
    "framework": "JSDOC",
    "language": "JS",
    "files": {
        "src": "./src",
        "dest": "./gpt"
    },
    "openai": {
        "temperature": 0.7,
        "top_p": 1,
        "max_tokens": 256,
        "model": "text-davinci-003"
    }
}
```

Find more info about the config [here](./CONFIG.md)

<br/>

## API Key

Add a `.env` file in your root directory

```env
OPENAI_API_KEY="sk-XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
```

or set the `OPENAI_API_KEY` as a system environement variable.

find your API key [here](https://platform.openai.com/account/api-keys)

<br/><br/>




### Document this project!

Running `docself` in the cloned repo will document source files in `./src/`

```sh
npm run docself
```

Running `test` in the cloned repo will document `./example/example.js`

```sh
npm run test
```

<br/><br/>




---

License MIT