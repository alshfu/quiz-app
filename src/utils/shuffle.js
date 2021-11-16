const incorrect_answers_generator = (category, answer) => {
    const json_data = require("../constants/incorrect_answers.json")
    let answers = []
    let answers_to_return = []

    json_data.forEach(json_data => {
        if (category === json_data.category && answer !== json_data.string) {
            answers.push(json_data.string)
        }
    })

    for (let step = 0; step < 3; step++) {
        let random_int = Math.floor(Math.random() * answers.length)
        answers_to_return.push(answers[random_int])
        answers.splice(random_int, 1)
    }
    return answers_to_return
}

const shuffle = (array, category, category_id) => {

    if (category_id === 1) {//incorrect_answers_generator(category, array[1])
        let fel = incorrect_answers_generator(category, array[0])
        array = [...array, ...fel];

        for (let i = array.length - 1; i > 0; i--) {

            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    } else if (category_id === 2) {
        array = [...array];

        for (let i = array.length - 1; i > 0; i--) {

            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
};

export default shuffle;
