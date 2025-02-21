import type { ZodFileOptions } from './types';
import { z } from 'zod';

export function zodFile(options: ZodFileOptions = {}) {
	const { size, types } = options;

	let schema = z.instanceof(File);

	if (size) {
		schema = schema.refine((v) => v.size < size, `File size exceeds ${size} bytes`);
	}
	if (types) {
		schema = schema.refine((v) => types.includes(v.type), `File type not: ${types.join(', ')}`);
	}

	return schema;
}
