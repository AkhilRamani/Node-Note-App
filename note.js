console.log('\n');
const fs = require('fs');

var fetchNotes = ()=> {
    try{
        return JSON.parse(fs.readFileSync('notes-data.json'));
    }
    catch(e){ 
        return [];
      }
}

var saveNote = (notes) =>{
    fs.writeFileSync('notes-data.json',JSON.stringify(notes));
}


var addNote = (title,body) => {
    var notes = fetchNotes();
    var note = {
        title,
        body
    };

    var duplicateNote = notes.filter( (arr)=> arr.title===title);

    if (duplicateNote.length===0){
        notes.push(note);
        saveNote(notes);
        return note;
    }
}

var getAll = () => {
    return fetchNotes();  
}
var getNote = (title) => {
    var notes = fetchNotes();
    var filteredNote = notes.filter((arr) => arr.title===title);

    return filteredNote[0]; 
}
var removeNote = (title)=> {
    var notes=fetchNotes();
    var filteredNotes = notes.filter( (arr) => arr.title !== title);
    saveNote(filteredNotes);
    
    return notes.length !== filteredNotes.length;
}

var logNote = (note) => {
    console.log(' -----');
    console.log(`TITLE : ${note.title}`);
    console.log(`DESCRIPTION : ${note.body}`);
}
module.exports={
    addNote,
    getAll,
    getNote,
    removeNote,
    logNote
};
