const path = require("path");
const fs = require("fs").promises;
const { rimraf } = require('rimraf');


async function listFileFromDirectory(directoryPath, fileExtension) {
    try {
        const files = await fs.readdir(directoryPath);
        const targetFiles = files.filter(file => {
            const ext = path.extname(file).toLowerCase(); // Lấy phần mở rộng và chuyển về chữ thường
            return [fileExtension].includes(ext); // Kiểm tra phần mở rộng
        });
        return targetFiles.map(file => path.join(directoryPath, file)); // Trả về đường dẫn đầy đủ
    } catch (err) {
        if (err.code === "ENOENT") {
            console.error(`No such file or directory [${fileName}]`);
            return false;
        } else { throw new Error(err); };
    }
}

async function readJsonFile(filePath) {
    const fileName = path.basename(filePath);
    try {
        const data = await fs.readFile(filePath, "utf-8");
        return JSON.parse(data);
    } catch (err) {
        if (err.code === "ENOENT") {
            console.error(`No such file or directory [${fileName}]`);
            return {};
        } else { throw new Error(err); };
    };
}

async function writeJsonFile(filePath, data) {

    const fileName = path.basename(filePath);
    try {
        await fs.writeFile(filePath, JSON.stringify(data, "", 4));
        return true;
    } catch (err) {
        if (err.code === "ENOENT") {
            console.error(`No such file or directory [${fileName}]`);
            return false;
        } else { throw new Error(err); };
    };
}

async function getImagesFromDirectory(directoryPath) {
    try {
        const files = await fs.readdir(directoryPath);
        const imageFiles = files.filter(file => {
            const ext = path.extname(file).toLowerCase(); // Lấy phần mở rộng và chuyển về chữ thường
            return ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp'].includes(ext); // Kiểm tra phần mở rộng
        });
        return imageFiles.map(file => path.join(directoryPath, file)); // Trả về đường dẫn đầy đủ
    } catch (err) {
        if (err.code === "ENOENT") {
            console.error(`No such file or directory [${fileName}]`);
            return false;
        } else { throw new Error(err); };
    }
}

function deleteDir(directoryPath) {
    rimraf(directoryPath, { glob: false }, (err) => {
        if (err) {
            console.error("Error deleting directory: ", err);
        } else {
            console.log(`${directoryPath} Directory deleted successfully!`);
        };
    });
}

function deleteFile(filePath) {
    fs.unlink(filePath, (err) => {
        if (err) {
            console.error("Error deleting file: ", err);
        } else {
            console.log(`${filePath} deleted successfully!`);
        }
    });
}

module.exports = {
    readJsonFile,
    writeJsonFile,
    getImagesFromDirectory,
    listFileFromDirectory,
    deleteDir,
    deleteFile,
};