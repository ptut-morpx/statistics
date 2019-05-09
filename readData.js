const fs=require('fs').promises;
const util=require('util');
const parse=util.promisify(require('csv-parse'));

const readFile=async function readFile(filename) {
	return (await parse(await fs.readFile(filename, 'utf8')))
		.map((line, i) => {
			return {
				coef: line[0]=='random'?[0, 0, 0, 0]:JSON.parse(line[0]),
				score: +line[1],
				rank: i+1
			};
		});
};
const readFiles=async function readFiles(directory) {
	return await Promise.all((await fs.readdir(directory))
		.filter(a => !a.startsWith('.'))
		.map(filename => {
			return {
				filename,
				seq: +filename.match(/n(\d+)/)[1]
			};
		}).sort((a, b) => {
			return a.seq-b.seq;
		}).map(async a => {
			return await readFile(directory+'/'+a.filename);
		}));
};

return module.exports=exports=readFiles;
