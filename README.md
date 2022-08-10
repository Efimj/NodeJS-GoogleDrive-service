## NodeJS-GoogleDrive-service
---
These functions should help you to work with google drive api.
### For this to work, you need to install
1. **Install original google api**
```powershell
npm install googleapis --save
```
2. **Create key file**
>For this you need to go to Google Developer Console / Credentials / Create Credentials / Service account and make it

>Go to Credentials / Service Accounts, select an account and create a key.

>After we have received the file, rename it to GDkey.json and place it in the directory with GDriveService.js

### We did it, now the functions are available to you:
1.  createFile()
2.  updateFile()
3.  deleteFile()
4.  getFileLink()
5.  getFile()
