// =================================== Users
export type Geo = {
	lat: string;
	lng: string;
};

export type Address = {
	street: string;
	suite: string;
	city: string;
	zipcode: string;
	geo: Geo;
};

export type Company = {
	name: string;
	catchPhrase: string;
	bs: string;
};

export type User = {
	id: number;
	name: string;
	username: string;
	email: string;
	address: Address;
	phone: string;
	website: string;
	company: Company;
};

// =================================== Comments
export type Comment = {
	postId: number;
	id: number;
	name: string;
	email: string;
	body: string;
};

// =================================== Posts
export type Post = Omit<Comment, 'postId' | 'name' | 'email'> & {
	userId: number;
	title: string;
};

// =================================== Photos
export type Photo = {
	albumId: number;
	id: number;
	title: string;
	url: string;
	thumbnailUrl: string;
};

// =================================== for training
export type Recorded = Record<keyof Photo, boolean>;
