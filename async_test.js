const axios = require('axios').default

const memeGenerator = async function* () {
    const memes = (await axios('http://memestore.herokuapp.com/memes')).data;
    yield* memes
};

(async () => {
    const memes = memeGenerator()
    for await (const meme of memes) {
        console.log(meme.nome)
    }
})()