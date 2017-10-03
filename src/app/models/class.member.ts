export class Member {
	name: string;
	password: string;
	ispasswordtemp: boolean;
	email: string;
	cellphone: string;
	gender: string;
	
	constructor(name: string,	password: string,	ispasswordtemp: boolean,	email: string,	cellphone: string, gender: string){
		this.name=name;
		this.password= password;
		this.ispasswordtemp= ispasswordtemp;
		this.email= email;
		this.cellphone=cellphone;
		this.gender=gender;
	}
}