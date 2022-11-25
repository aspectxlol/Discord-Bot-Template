import path from 'path';
import fs from 'fs';

/**
 * credit where credit goes
 * Credit to: Conaticus
 * on: https://github.com/conaticus/boolean
 */

const walk = (
	pathLike: fs.PathLike,
	options?:
		| {
				encoding: BufferEncoding | null;
		  }
		| BufferEncoding
		| null
		| undefined
): string[] => {
	let results: string[] = [];
	const fileList = fs.readdirSync(pathLike, options);
	for (const file of fileList) {
		const stat = fs.statSync(path.join(pathLike.toString(), file));
		results = [
			...results,
			...(stat && stat.isDirectory()
				? walk(path.join(pathLike.toString(), file))
				: [file]),
		];
	}
	return results.map((filename) => path.join(pathLike.toString(), filename));
};

export const commandFiles = walk(
	path.join(__dirname, '../commands')
).filter((file) => ['.ts', '.js'].some((ext) => file.endsWith(ext)));
