import config from '../config';
 
export function getUniqueFileName(fileName) {
    
    let newFileName = fileName;
    if(fileName)
    {
        var re = /(?:\.([^.]+))?$/;
        let timestamp = Math.floor(Date.now() / 1000);
        var ext = getFileExtension1(fileName);
        if(ext)
        {
            newFileName = slugify(fileName.replace('.'+ext,''));
            newFileName += "-"+timestamp;
            newFileName += "."+ext;
        }
    }
    return newFileName;
} 

export function getFileExtension1(filename) {
    return (/[.]/.exec(filename)) ? /[^.]+$/.exec(filename)[0] : undefined;
}

export function slugify(text)
{
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
}

export const  consoleLog = (arg1,arg2,arg3,arg4)=>
{
    if(!config.production)
    {
        console.log(arg1,arg2,arg3,arg4);
    }
    return true;
}

// export const consoleLog = store => next => action => {
//     if (action.type === 'START_TIMER') {
//       action.interval = setInterval(() => store.dispatch({ type: 'TICK', currentTime: Date.now() }), 1000);
//     } else if (action.type === 'STOP_TIMER') {
//       clearInterval(action.interval);
//     }
//     next(action);
//   };