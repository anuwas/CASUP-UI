import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
const EXCEL_TYPE = 'application/nd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable({
  providedIn: 'root'
})
export class ExcelService {

  constructor() { }

	 public exportAsExcelFile(json: any[], excelFileName: string): void {
		  const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
		  const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
		  const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
		  this.saveAsExcelFile(excelBuffer, excelFileName);
	}

	private saveAsExcelFile(buffer: any, fileName: string): void {
	   const data: Blob = new Blob([buffer], {type: EXCEL_TYPE});
	   FileSaver.saveAs(data, fileName + '_export_' + new  Date().getTime() + EXCEL_EXTENSION);
	}

	public excelFormatDatatoExport(dbdata: any,type: string):Observable<any>{
		let exportData : any = [];
		let incidentRecord : any;
		dbdata.forEach(function (value) {
		incidentRecord = {'Incident':value.itemNumber};
		exportData.push(incidentRecord);
		});
  		return exportData;
	}
}
