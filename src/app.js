
import fs from 'fs';
import _ from 'lodash';
const diff = require('diff')
const parentFolder = './parentFolder/';
const copiedFolder = './copiedFolder/';
const parentFiles = fs.readdirSync(parentFolder);
const copiedFiles = fs.readdirSync(copiedFolder);


/**
 * To get the details of file added or deleted from copied folder compared to the original parent Folder
 */
const additionalOrDeletedFileList = () => {
    let deletedFiles = [], addedFiles = [];
    _.difference(parentFiles, copiedFiles).forEach(fileName => {
        deletedFiles.push(fileName)
    });

    _.difference(copiedFiles, parentFiles).forEach(fileName => {
        addedFiles.push(fileName)
    });
    return {
        "deletedFiles": deletedFiles,
        "addedFiles": addedFiles
    }
}


/**
 * To get the details of changes in files from copied folder compared to the original parent Folder
 */

const fileContentComparison = () => {
    fs.readdirSync(parentFolder).forEach(fileA => {
        fs.readdirSync(copiedFolder).forEach(fileB => {
            if (fileA === fileB) {
                let fileAContent = fs.readFileSync(parentFolder + fileA, 'utf-8');
                let fileBContent = fs.readFileSync(copiedFolder + fileB, 'utf-8');
                if (fileAContent === fileBContent) {
                    console.log(`There is no change in content between ${fileA} in ${parentFolder} and ${fileB} in ${copiedFolder}`)
                } else {
                    const difference = diff.diffChars(fileAContent, fileBContent);
                    let resultdiff = difference.map(diffs => {
                        return diffs.value
                    })
                    console.log(`There is change in content between ${fileA} in ${parentFolder} and ${fileB} in ${copiedFolder}`)
                    console.log("The Change is", resultdiff)
                }
            }
        });
    });
}


/**
 * UnComment this block to get the stats of both parent and Copied folder

const parentFolderStats = fs.stat(parentFolder, (err, stats) => {
    if (err) {
        console.log(err);
    } else {
        console.log("Stats of Parent Folder>>>>>>>>>>>>>", stats);
    }
});

const copiedFolderStats = fs.stat(copiedFolder, (err, stats) => {
    if (err) {
        console.log(err);
    } else {
        console.log("Stats of Copied Folder>>>>>>>>>>>>>", stats);
    }
});

*/



const addedorDeletedFileResponse = additionalOrDeletedFileList();
console.log("files deleted from copied folder", addedorDeletedFileResponse.deletedFiles)
console.log("files added in copied folder", addedorDeletedFileResponse.addedFiles)

fileContentComparison()
