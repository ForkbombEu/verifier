import { backendUri } from '$lib/backendUri';
import { Slangroom } from '@slangroom/core';
import getPbList from '$lib/slangroom/getPbList.zen?raw';
import getPbRecord from '$lib/slangroom/getPbRecord.zen?raw';
import { pocketbase, type ShowRecordParameters } from '@slangroom/pocketbase';
import { log } from '$lib/log';

export type VerificationFlow = {
	collectionId: string;
	collectionName: string;
	created: string;
	description: string;
	expand: Expand;
	id: string;
	name: string;
	organization: string;
	public: boolean;
	relying_party: string;
	template: string;
	updated: string;
};

export type Expand = {
	organization: Organization;
	relying_party: RelyingParty;
	template: Template;
};

export interface Template {
	allow_extra_attributes: boolean;
	collectionId: string;
	collectionName: string;
	created: string;
	description: string;
	id: string;
	is_preset: boolean;
	name: string;
	organization: string;
	public: boolean;
	schema: Schema;
	type: string;
	updated: string;
	zencode_data: string;
	zencode_script: string;
}

export interface Schema {
	type: string;
	properties: Record<string, { type: string; title: string }>;
	required: string[];
}

export type Organization = {
	avatar: string;
	collectionId: string;
	collectionName: string;
	created: string;
	description: string;
	id: string;
	name: string;
	updated: string;
};

export type RelyingParty = {
	collectionId: string;
	collectionName: string;
	created: string;
	endpoint: string;
	id: string;
	name: string;
	organization: string;
	updated: string;
};
export type PaginatedResult<T> = {
	page: number;
	perPage: number;
	totalItems: number;
	totalPages: number;
	items: T[];
};

export type Response<T> = {
	result: T;
	status: number;
};

const slangroom = new Slangroom(pocketbase);

export const getVerificationFlows = async (): Promise<VerificationFlow[]> => {
	try {
		const data = {
			pb_address: backendUri,
			list_parameters: {
				collection: 'verification_flows',
				expand: 'relying_party, organization',
				sort: '-updated',
				type: 'all',
				requestKey: Math.random().toString(36).substring(7)
			}
		};
		const res = await slangroom.execute(getPbList, { data });
		//@ts-expect-error output needs to be typed
		return res.result?.output?.records;
	} catch (e: unknown) {
		throw new Error(JSON.stringify(e));
	}
};

export const getVerificationFlow = async (id: string): Promise<VerificationFlow> => {
	try {
		const data: { pb_address: string; show_parameters: ShowRecordParameters } = {
			pb_address: backendUri,
			show_parameters: {
				collection: 'verification_flows',
				expand: 'relying_party, template, organization',
				id
			}
		};
		const res = await slangroom.execute(getPbRecord, { data });
		console.log(res.result?.output);
		//@ts-expect-error output needs to be typed
		return res.result?.output;
	} catch (e: unknown) {
		log(JSON.stringify(e));
		throw new Error(JSON.stringify(e));
	}
};
