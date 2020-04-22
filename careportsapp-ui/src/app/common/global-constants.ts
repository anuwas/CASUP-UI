export class GlobalConstants {
	public static apiURL: string = "http://localhost:8091/api";
	//public static apiURL: string = "http://10.114.44.205:8091/api";
	public static currentSprint: string = "Sprint-12";

	public static allSupUsers = [];
	public static allDevUsers = [];
	public static allApplicationNames = [];
	public static allDevSprintNames = [];
	public static allIncidentStatus = [];
	public static allPRStatus = [];
	public static allServiceStatus = [];

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
}
