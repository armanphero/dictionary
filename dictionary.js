// main js

const loadDictionary = (word) => {
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    fetch(url)
        .then(res => res.json())
        .then(data => showWord(data))
        .catch(error => console.log(error))
}

const showWord = (data) => {

    const dictionarySection = document.getElementById('dictionary-section');
    dictionarySection.classList.remove('d-none');
    const throwError = document.getElementById('throw-error');
    throwError.classList.add('d-none');
    if(data[0] === undefined){
        throwError.classList.remove('d-none');
        dictionarySection.classList.add('d-none');
        return '';
    }
    const { word, phonetic, meanings, sourceUrls, phonetics } = data[0];
    document.getElementById('main-word').innerText = word;
    document.getElementById('phonetic').innerText = phonetic;

    // audio
    const audioMp3 = phonetics[1]?.audio || phonetics[0]?.audio;
    setAudio(audioMp3);

    // noun
    const nounDefinitions = meanings[0].definitions;
    addDefinitioins(nounDefinitions, 'noun-meanings');
    const nounSynonyms = meanings[0].synonyms.slice(0, 3);
    addSynonyms(nounSynonyms, 'noun-synonyms');
    // verb
    const verbDefinitions = meanings[1]?.definitions.slice(0, 3);
    addDefinitioins(verbDefinitions, 'verb-definitions');
    const verbSynonyms = meanings[1]?.synonyms.slice(0, 3);
    addSynonyms(verbSynonyms, 'verb-synonyms');
    // source
    const source = document.getElementById('source');
    source.innerText = sourceUrls[0];
    source.setAttribute('href', sourceUrls[0]);

}

const setAudio = (audioMp3) => {

    const audioContainer = document.getElementById('audio-container');
    audioContainer.innerHTML = `
    <audio controls id="">
        <source id="audio" src="${audioMp3}"
        type="audio/mpeg">
    </audio>
    `
}

const addDefinitioins = (definitions, id) => {
    const ul = document.getElementById(id);
    ul.innerText = '';

    definitions?.slice(0, 3).forEach(detail => {
        const li = document.createElement('li');
        li.innerText = `${detail.definition}`
        ul.appendChild(li);
        // console.log(ul);
    });
}

const addSynonyms = (synonyms, id) => {
    const spanContainer = document.getElementById(id);
    spanContainer.innerText = '';
    // if(synonyms.length === 0){}
    synonyms?.forEach(synonym => {
        const span = document.createElement('span');
        span.innerText = `${synonym} ${synonyms.indexOf(synonym) !== synonyms.length - 1 ? ',' : ''}`;
        spanContainer.appendChild(span);
    });
}

const searchedWord = () => {
    const input = document.getElementById('search-input');
    const word = input.value;
    input.value = '';
    loadDictionary(word);
}
