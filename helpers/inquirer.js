const inquirer = import('inquirer');

const options = [
    { value: 1, name: `${'1 ::'.rainbow} ${' Buscar lugar                '.bgCyan}` },
    { value: 2, name: `${'2 ::'.rainbow} ${' Historial                    '.bgBlue}` },
    { value: 0, name: `${'0 ::'.rainbow} ${' Salir                        '.bgCyan}` },
]

const questions = {
    type: 'list',
    name: 'option',
    message: '¿Qué desea hacer?',
    choices: options
}

const pause = async () => {

    const prompt = (await inquirer).createPromptModule();

    const confirm = prompt({
        type: 'input',
        name: 'continue',
        message: `\nPresione ${'ENTER'.red} para continuar.\n`,
    })

    return confirm;
}

const readInput = async (message) => {

    const prompt = (await inquirer).createPromptModule();

    const { input } = await prompt({
        type: 'input',
        name: 'input',
        message,
        validate: (value) => {
            if (value.length === 0) return "Debe ingresar un texto válido."
            return true;
        }
    })

    return input;
}

const showMenu = async () => {

    console.log(`\n-------------------------------------`.rainbow);
    console.log(`     << Seleccione una opción >>     `.bgBlack);
    console.log(`-------------------------------------\n`.rainbow);

    const prompt = (await inquirer).createPromptModule();
    const option = await prompt(questions)

    return option;
};


const showChoiceMenu = async (choices = [], message = '') => {

    choices = choices.map((choice, i) => {
        const index = `${i + 1}`.yellow;
        return {
            value: choice.id,
            name: `[${index}] ${choice.name.blue}`
        }
    });
    choices.unshift({
        value: 0,
        name: `[${'0'.yellow}] Cancelar`

    })
    const prompt = (await inquirer).createPromptModule();
    const { option } = await prompt({
        type: 'list',
        name: 'option',
        message,
        choices: choices
    })

    return option;
};


module.exports = {
    pause,
    readInput,
    showMenu,
    showChoiceMenu,
};