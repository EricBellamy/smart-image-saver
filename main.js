const fs = require('fs-extra');
const path = require('path');
const http = require('http');
const https = require('https');
const sharp = require('sharp');

function getFolderPath(filepath) {
	const basename = path.basename(filepath);
	let dirPath = filepath.substring(0, filepath.lastIndexOf(basename)) + (path.extname(filepath).length === 0 ? path.basename(filepath) : "");
	return dirPath[dirPath.length - 1] === "/" ? dirPath : dirPath + "/";
}

async function convertAndSave(imageBuffer, folderPath, filename, filetype) {
	await new Promise(resolve => {
		// Ensure the dest directory
		fs.ensureDirSync(folderPath);

		// Save the file
		sharp(imageBuffer).toFormat(filetype).toFile(folderPath + filename + "." + filetype, (err, info) => {
			if (err) throw new Error(err);
			else resolve(true);
		});
	});
}

module.exports = async function (params) {
	if (typeof params.url != "string") throw new Error("DownloadImage 'url' is invalid: " + params.url);
	if (typeof params.path != "string") throw new Error("DownloadImage 'path' is invalid: " + params.path);
	if (params.type != undefined && typeof params.type != "string") throw new Error("DownloadImage 'type' is invalid: " + params.type);

	// Make sure the name is correct
	if (params.name === undefined) params.name = params.url; // Ensure we have an output name
	params.name = path.basename(params.name);
	const nameExt = path.extname(params.name);
	if (nameExt.length != 0) params.name = params.name.substring(0, params.name.indexOf(nameExt));

	// Make sure the type is correct
	if (params.type === undefined) params.type = path.extname(params.url); // Ensure we have an output file type
	if (params.type.indexOf(".") === 0) params.type = params.type.substring(1); // Remove the leading dot for sharping

	// Get the actual folder path from the specified output
	params.path = getFolderPath(params.path);

	console.log(params);

	// Download the image
	await new Promise(resolve => {
		const client = params.url.startsWith('https') ? https : http;
		client.get(params.url, (res) => {
			let imageData = [];

			res.on('data', (chunk) => {
				imageData.push(chunk);
			});

			res.on('end', async () => {
				const imageBuffer = Buffer.concat(imageData);
				await convertAndSave(imageBuffer, params.path, params.name, params.type);
				resolve(true);
			});
		}).on('error', (err) => {
			throw new Error(err)
		});
	});
}