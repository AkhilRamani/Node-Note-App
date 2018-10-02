const fs = require('fs');
//const _ = require('lodash');
const yargs=require('yargs');

const notes=require('./note.js');

const titleOptions = {
    describe:'Title of a Note.',
    demand:true,
    alias: 't'
};
var argv=yargs
    .command('add','Add a new Note.',{
        title: titleOptions,
        body: {
            describe:'Description (body) of a Note.',
            demand:true,
            alias:'b'
        }
    })
    .command('list','Listing all saved Notes.')
    .command('read','Read a perticular Note.',{
        title : titleOptions
    })
    .command('remove', 'Remove/Delete a Note.',{
        title : titleOptions
    })
    .help()
    .argv;
var command=argv._[0];
//console.log(argv);

if (command==='add'){
   var note = notes.addNote(argv.title, argv.body);
    if(note){
        console.log('-- NOTE CREATED --');
        notes.logNote(note);
    } else{
        console.log('-- NOTE TITLE ALREADY EXISTS --');
    }
}

else if (command==='list'){
   var allNotes = notes.getAll();
    console.log(`Listing ${allNotes.length} note(s).\n`);
   allNotes.forEach( (arr)=> notes.logNote(arr));
}

else if (command==='remove'){
    var removed = notes.removeNote(argv.title);
    console.log(removed ? '-- NOTE REMOVED --' : '-- NOTE NOT FOUND --');
}

else if (command==='read'){
    var note = notes.getNote(argv.title);
    if(note){
    notes.logNote(note);
    } else { console.log('NOTE NOT FOUND');
    }
}
else {
    console.log('Command not Recognized');
}