// import * as toxicity from '@tensorflow-models/toxicity';

/* const threshold = 0.9;

// Which toxicity labels to return.
const labelsToInclude = ['identity_attack', 'insult', 'threat'];

toxicity.load(threshold, labelsToInclude).then(model => {
    // Now you can use the `model` object to label sentences. 
    model.classify(['you suck']).then(predictions => { console.log(predictions) });
}); */


export default async function Toxic(threshold = .9, labelsToInclude) {
    /* const model = await toxicity.load(threshold, labelsToInclude)

    return {
        model,
        check: async (text) => {
            return await model.classify([text]);
        }
    } */
    return false
}

/*  {
    model,
    init: async function (threshold = .9, labelsToInclude = ['toxicity']) {
        model = await toxicity.load(threshold, labelsToInclude)
        return this
    },
    check: async (text) => {
        return await model.classify(['you suck']);
    }

}
 */