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
