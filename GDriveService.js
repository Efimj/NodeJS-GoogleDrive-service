import { google } from 'googleapis'

const keyFilePath = 'GDkey.json'
const Scopes = ['https://www.googleapis.com/auth/drive']

const auth = new google.auth.GoogleAuth({
    keyFile: keyFilePath,
    scopes: Scopes
})

const driveService = google.drive({ version: 'v3', auth });



export const createFile = async (directoryPath, fileName, file) => {
    
    const fileMetaData = {
        parents: [directoryPath],
        name: fileName
    }

    const media = {
        body: file
    }

    const res = await driveService.files.create({
        requestBody: fileMetaData,
        media: media,
    });

    return res
}

export const updateFile = async (fileId, file) => {

    const media = {
        body: file,
    }

    const res = await driveService.files.update({
        fileId: fileId,
        media: media,
    });
    
    return res
}

export const deleteFile = async (fileId) => {

    const res = await driveService.files.delete({
        fileId: fileId,
    });

    return res
}

export const getFileLink = async (fileId) => {

    await driveService.permissions.create({
        fileId: fileId,
        requestBody: { role: 'reader', type: 'anyone' }
    })

    const res = await driveService.files.get({
        fileId: fileId,
        fields: 'webViewLink, webContentLink, id'
    });

    return res
}

export const getFile = async (fileId) => {

    const res = await driveService.files.get({
        fileId: fileId,
        alt: 'media'
    });

    return res
}