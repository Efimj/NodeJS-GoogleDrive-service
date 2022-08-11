import { google } from 'googleapis'

class Drive {
    constructor(keyFile, scopes) {
        const auth = new google.auth.GoogleAuth({
            keyFile: keyFile,
            scopes: scopes
        })
        this.driveService = google.drive({ version: 'v3', auth });
    }

    createFile = async (directoryPath, fileName, file) => {

        return await this.driveService.files.create({
            requestBody: {
                parents: [directoryPath],
                name: fileName
            },
            media: {
                body: file
            },
        });
    }

    updateFile = async (fileId, file) => {

        return await this.driveService.files.update({
            fileId: fileId,
            media: {
                body: file,
            },
        });
    }

    deleteFile = async (fileId) => {

        return await this.driveService.files.delete({
            fileId: fileId,
        });

    }

    getFileLink = async (fileId) => {

        await this.driveService.permissions.create({
            fileId: fileId,
            requestBody: { role: 'reader', type: 'anyone' }
        })

        return await this.driveService.files.get({
            fileId: fileId,
            fields: 'webViewLink, webContentLink, id'
        });
    }

    getFile = async (fileId) => {

        return await this.driveService.files.get({
            fileId: fileId,
            alt: 'media'
        });
    }
}


export const createGDrive = (keyPath = 'GDkey.json', scopes = 'https://www.googleapis.com/auth/drive') => {
    return new Drive(keyPath, scopes)
}
