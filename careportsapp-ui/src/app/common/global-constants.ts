export class GlobalConstants {
	public static apiURL: string = "http://localhost:8091/api";
	//public static apiURL: string = "http://10.114.44.205:8091/api";

	public static allSupUsers = [];
	public static allDevUsers = [];
	public static allApplicationNames = [];
	public static allDevSprintNames = [];
	public static allIncidentStatus = [];
	public static allPRStatus = [];
	public static allServiceStatus = [];
	public static allSupItemType = [];

	public static getAllSupUsers(){
		return JSON.parse(localStorage.getItem('SUP_USER'));
	}

	public static getAllDevUsers(){
		return JSON.parse(localStorage.getItem('DEV_USER'));
	}

	public static getAllApplicationNames(){
		return JSON.parse(localStorage.getItem('APPLICATION_NAMES'));
	}

	public static getAllDevSprintNames(){
		return JSON.parse(localStorage.getItem('DEV_SPRINT_NAMES'));
	}

	public static getAllSupItemType(){
		var appConfigProg = JSON.parse(localStorage.getItem('APP_CONFIG_PROG'));
		return appConfigProg['SUP_ITEM_TYPE'];
	}

	public static getCurrentSprint(){
		var appConfigProg = JSON.parse(localStorage.getItem('APP_CONFIG_PROG'));
		return appConfigProg['CURRENT_SPRINT'];
	}
}
